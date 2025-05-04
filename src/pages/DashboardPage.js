"use client";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Alert } from "react-bootstrap";
import LeftNavBar from "../components/LeftNavBar";
import TopBar from "../components/TopBar";
import "../styles/Dashboard.css";
import { getAvailableDonations, claimDonation } from "../controllers/donationController";
import { getOpenRequests } from "../controllers/requestController";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/auth";
import DonationMap from "../components/DonationMap";
import mapboxgl from "mapbox-gl";

import '../styles/ScrollStyles.css';
import '../styles/Map.css';

mapboxgl.accessToken = "pk.eyJ1IjoibXJhaG1hbjEyIiwiYSI6ImNtYTAyMWoyNDF2eDAyanBzNno1eXFhc2UifQ.3kq8ESoBC2jg-u0LxoohZA";

function DashboardPage() {
    const [donations, setDonations] = useState([]);
    const [donationLocations, setDonationLocations] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleClaimDonation = async (donationId) => {
        const user = auth.currentUser;
        if (!user) {
            alert("You must be logged in to claim a donation.");
            return;
        }

        const result = await claimDonation(donationId, user.uid, user.displayName || "Anonymous");

        if (result.success) {
            setDonations(prev => prev.filter(d => d.id !== donationId));
            setDonationLocations((prev) => prev.filter(location => location.id !== donationId));
            alert("Donation claimed successfully!");
        } else {
            alert("Failed to claim donation: " + result.error);
        }
    };

    const handleDonateItem = (request) => {
        navigate("/make-donation", { state: request });
    };

    const convertAddressToCoords = async (locationString) => {
        if (!locationString) return null;
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationString)}.json?access_token=${mapboxgl.accessToken}&autocomplete=false&limit=5`
            );

            if (!response.ok) throw new Error("Failed to fetch coordinates");

            const data = await response.json();
            if (data.features.length > 0) {
                const [longitude, latitude] = data.features[0].center;
                return {
                    longitude: parseFloat(longitude.toFixed(6)),
                    latitude: parseFloat(latitude.toFixed(6)),
                };
            }
        } catch (err) {
            console.error("Geocoding error for location:", locationString, err);
        }
        return null;
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const donationResult = await getAvailableDonations();
                if (donationResult.success) {
                    setDonations(donationResult.donations);

                    const locations = await Promise.all(
                        donationResult.donations.map(async (donation) => {
                            if (donation.location) {
                                const coords = await convertAddressToCoords(donation.location);
                                return coords ? { id: donation.id, address: donation.location, foodType: donation.foodType, quantity: donation.quantity, ...coords } : null;
                            }
                            return null;
                        })
                    );

                    setDonationLocations(locations.filter(loc => loc));
                } else {
                    setError(donationResult.error);
                }

                const requestResult = await getOpenRequests();
                if (requestResult.success) {
                    setRequests(requestResult.requests);
                } else {
                    setError(requestResult.error);
                }
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading dashboard data...</div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div className="scrollableContainer dashboard-container">
            <div className="sidebar">
                <LeftNavBar />
            </div>
            <div className="main-content">
                <TopBar title="Dashboard" />

                <div className="dashboard-content">
                    <h2 className="dashboard-title">Donation Locations</h2>
                    <DonationMap donationLocations={donationLocations} handleClaimDonation={handleClaimDonation}/> {}

                    <h2 className="dashboard-title">Available Donations</h2>
                    {donations.length === 0 ? (
                        <p>No donations available.</p>
                    ) : (
                        <Table striped bordered hover className="dashboard-table">
                            <thead>
                            <tr>
                                <th>Food Type</th>
                                <th>Quantity</th>
                                <th>Expiration Date</th>
                                <th>Location</th>
                                <th>Pickup Time</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {donations.map((donation) => (
                                <tr key={donation.id}>
                                    <td>{donation.foodType}</td>
                                    <td>{donation.quantity}</td>
                                    <td>{donation.expirationDate}</td>
                                    <td>{donation.location}</td>
                                    <td>{donation.pickupTime}</td>
                                    <td>
                                        <Button
                                            variant="success"
                                            size="sm"
                                            onClick={() => handleClaimDonation(donation.id)}
                                        >
                                            Claim Donation
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}

                    <h2 className="dashboard-title">Open Requests</h2>
                    {requests.length === 0 ? (
                        <p>No donation requests available.</p>
                    ) : (
                        <Table striped bordered hover className="dashboard-table">
                            <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Urgency</th>
                                <th>Pickup Location</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {requests.map((request) => (
                                <tr key={request.id}>
                                    <td>{request.itemName}</td>
                                    <td>{request.quantity}</td>
                                    <td>{request.urgency}</td>
                                    <td>{request.pickupLocation}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => handleDonateItem(request)}
                                        >
                                            Donate Item
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
