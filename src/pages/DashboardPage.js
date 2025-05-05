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
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";
import FilterDropdown from "../components/FilterDropdown";

import '../styles/ScrollStyles.css';
import '../styles/Map.css';

mapboxgl.accessToken = "pk.eyJ1IjoibXJhaG1hbjEyIiwiYSI6ImNtYTAyMWoyNDF2eDAyanBzNno1eXFhc2UifQ.3kq8ESoBC2jg-u0LxoohZA";

function DashboardPage() {
    const [donations, setDonations] = useState([]);
    const [donationLocations, setDonationLocations] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [requestSearchTerm, setRequestSearchTerm] = useState("");

    const [sortOption, setSortOption] = useState("");
    const [selectedFoodTypes, setSelectedFoodTypes] = useState([]);

    let filteredDonations = donations.filter((donation) =>
        [donation.foodType, donation.location]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    if (selectedFoodTypes.length > 0) {
        filteredDonations = filteredDonations.filter((donation) =>
            selectedFoodTypes.includes(donation.foodType)
        );
    }

    if (sortOption === "expirationAsc") {
        filteredDonations.sort(
            (a, b) => new Date(a.expirationDate) - new Date(b.expirationDate)
        );
    } else if (sortOption === "expirationDesc") {
        filteredDonations.sort(
            (a, b) => new Date(b.expirationDate) - new Date(a.expirationDate)
        );
    }

    const [selectedUrgencies, setSelectedUrgencies] = useState([]);

    let filteredRequests = requests.filter((request) =>
        [request.itemName, request.pickupLocation]
            .join(" ")
            .toLowerCase()
            .includes(requestSearchTerm.toLowerCase())
    );

    if (selectedUrgencies.length > 0) {
        filteredRequests = filteredRequests.filter((r) =>
            selectedUrgencies.includes(r.urgency?.toLowerCase())
        );
    }

    const navigate = useNavigate();

    const handleClaimDonation = async (donationId) => {
        const user = auth.currentUser
        if (!user) {
            alert("You must be logged in to claim a donation.")
            return
        }
    
        const confirmed = window.confirm("Are you sure you want to claim this donation?")
        if (!confirmed) return
    
        const result = await claimDonation(donationId, user.uid, user.displayName || "Anonymous")
    
        if (result.success) {
            setDonations(prev => prev.filter(d => d.id !== donationId))
            setDonationLocations((prev) => prev.filter(location => location.id !== donationId))
            alert("Donation claimed successfully!")
        } else {
            alert("Failed to claim donation: " + result.error)
        }
    }

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
                    <div className="map-wrapper">
                    <DonationMap donationLocations={donationLocations} handleClaimDonation={handleClaimDonation}/> {}
                    </div>
                    <h2 className="dashboard-title">Available Donations</h2>
                    <div className="d-flex gap-3 flex-wrap mb-3">
                        <div style={{flex: 4, minWidth: "220px"}}>
                            <SearchBar
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                placeholder="Search by item or location..."
                            />
                        </div>
                        <div style={{flex: 1, minWidth: "200px"}}>
                            <SortDropdown
                                sortOption={sortOption}
                                setSortOption={setSortOption}
                                options={[
                                    {value: "expirationAsc", label: "Soonest"},
                                    {value: "expirationDesc", label: "Latest"}
                                ]}
                            />
                        </div>
                        <div style={{flex: 1, minWidth: "200px"}}>
                            <FilterDropdown
                                label="Food Type"
                                options={[...new Set(donations.map((d) => d.foodType))]}
                                selected={selectedFoodTypes}
                                setSelected={setSelectedFoodTypes}
                            />
                        </div>
                    </div>
                    {donations.length === 0 ? (
                        <p>No donations available.</p>
                    ) : filteredDonations.length === 0 ? (
                        <p>No matching donations found.</p>
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
                            {donations
                                .filter((donation) =>
                                    [donation.foodType, donation.location]
                                        .join(" ")
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )
                                .map((donation) => (
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
                    <div className="d-flex flex-wrap gap-2 mb-3">
                        <div style={{flex: 5, minWidth: "220px"}}>
                            <SearchBar
                                searchTerm={requestSearchTerm}
                                setSearchTerm={setRequestSearchTerm}
                                placeholder="Search requests by item or location..."
                            />
                        </div>
                        <div style={{flex: 1, minWidth: "200px"}}>
                            <FilterDropdown
                                label="Urgency"
                                options={["low", "medium", "high"]}
                                selected={selectedUrgencies}
                                setSelected={setSelectedUrgencies}
                            />
                        </div>
                    </div>
                    {requests.length === 0 ? (
                        <p>No donation requests available.</p>
                    ) : filteredRequests.length === 0 ? (
                        <p>No matching requests found.</p>
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
                            {requests
                                .filter((request) =>
                                    [request.itemName, request.pickupLocation]
                                        .join(" ")
                                        .toLowerCase()
                                        .includes(requestSearchTerm.toLowerCase())
                                )
                                .map((request) => (
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
