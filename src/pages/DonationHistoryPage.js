"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { getUserDonations } from "../controllers/donationController";
import LeftNavBar from "../components/LeftNavBar";
import TopBar from "../components/TopBar";
import { auth } from "../firebase/auth";
import { getUserDonationHistory } from "../controllers/donationHistoryController";
import UnclaimedDonations from "../components/UnclaimedDonation";
import '../styles/ScrollStyles.css';


function DonationHistoryPage() {
    const user = auth.currentUser;
    const [donations, setDonations] = useState([]);
    const [claimedDonations, setClaimedDonations] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDonations = async () => {
            if (user) {
                const [result1, result2] = await Promise.all([
                    getUserDonations(user.uid),
                    getUserDonationHistory(user.uid),
                ]);

                if (result1.success) setDonations(result1.donations);
                if (result2.success) setClaimedDonations(result2.history);

                if (!result1.success || !result2.success) {
                    setError(result1.error || result2.error);
                }
            }
        };

        fetchDonations().then(r => {});
    }, [user]);

    const handleDonationDeleted = (deletedDonation) => {
        setDonations(prev => prev.map((d) => (d.id === deletedDonation.id ? deletedDonation : d)));
    };

    const handleDonationUpdated = (updated) => {
        setDonations(prev =>
            prev.map(d => (d.id === updated.id ? updated : d))
        );
    };

    return (
        <Container fluid>
            <Row>
                <Col md={3} lg={2} className="sidebar">
                    <LeftNavBar />
                </Col>
                <Col md={9} lg={10} className="px-md-4">
                <div className="scrollableContainer">
                    <TopBar title="Request Donation"/>

                    <h2 className="mt-4 mb-4">Active Donations</h2>
                    {user && <UnclaimedDonations userId={user.uid}
                                                 onDonationDeleted={handleDonationDeleted}
                                                 onDonationUpdated={handleDonationUpdated}/>}

                    {/*<h2 className="mt-4 mb-4">Your Donation History</h2>*/}

                    <h4>Submitted Donations</h4>
                    {donations.length === 0 ? (
                        <p>No submitted donations found.</p>
                    ) : (
                        donations.map((donation) => (
                            <Card key={donation.id} className="mb-3">
                                <Card.Body>
                                    <Card.Title>{donation.foodType}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Donated on {new Date(donation.createdAt.seconds * 1000).toLocaleDateString()}
                                    </Card.Subtitle>
                                    <Card.Text>
                                        Quantity: {donation.quantity}
                                        <br />
                                        {donation.location}
                                        {/*Location: {donation.location.street}<br/>*/}
                                        {/*{donation.location.city}, {donation.location.state} {donation.location.zip}*/}
                                        <br />
                                        Status:{" "}
                                        <span className={donation.status === "Delivered" ? "text-success" : "text-warning"}>
                                            {donation.status}
                                        </span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    )}


                    <h4 className="mt-4">Claimed Donations</h4>
                    {claimedDonations.length === 0 ? (
                        <p>No claimed donations found.</p>
                    ) : (
                        claimedDonations.map((donation) => (
                            <Card key={donation.id} className="mb-3">
                                <Card.Body>
                                    <Card.Title>Recipient Name: {donation.recipientName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Claimed on {new Date(donation.date.seconds * 1000).toLocaleDateString()}
                                    </Card.Subtitle>
                                    <Card.Text>
                                        Food: {donation.foodType}
                                        <br />
                                        Quantity: {donation.quantity}
                                        <br />
                                        Status:{" "}
                                        <span className={donation.status === "Delivered" ? "text-success" : "text-warning"}>
                                            {donation.status}
                                        </span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    )}

                    {error && <Alert variant="danger">{error}</Alert>}

                    </div>
                </Col>
            </Row>
        </Container>
    );
}


export default DonationHistoryPage;
