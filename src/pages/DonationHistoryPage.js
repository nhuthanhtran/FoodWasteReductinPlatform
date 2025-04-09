"use client";

import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { getUserDonations } from "../controllers/donationController";
import LeftNavBar from "../components/LeftNavBar"
import TopBar from "../components/TopBar"
import { auth } from "../firebase/auth";
import UnclaimedDonations from "../components/UnclaimedDonation";

function DonationHistoryPage() {
    const user = auth.currentUser;
    const [donations, setDonations] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDonations = async () => {
            if (user) {
                const result = await getUserDonations(user.uid);
                if (result.success) {
                    setDonations(result.donations);
                } else {
                    setError(result.error);
                }
            }
        };

        fetchDonations();
    }, [user]);

    const handleDonationDeleted = (deletedDonationId) => {
        setDonations(prev => prev.filter(d => d.id !== deletedDonationId));
    };

    return (
        <Container fluid>
            <Row>
                <Col md={3} lg={2} className="sidebar">
                    <LeftNavBar />
                </Col>
                <Col md={9} lg={10} className="px-md-4">
                    <TopBar title="Request Donation"/>

                    <h2 className="mt-4 mb-4">Active Donations</h2>
                    {user && <UnclaimedDonations userId={user.uid}
                                                 onDonationDeleted={handleDonationDeleted}/>}

                    <h2 className="mt-4 mb-4">Your Donation History</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    {donations.length === 0 ? (
                        <p>No donations found.</p>
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
                                        Location: {donation.location}
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
                </Col>
            </Row>
        </Container>
    );
}

export default DonationHistoryPage;
