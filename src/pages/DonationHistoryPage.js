"use client";

import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { db, auth } from "../firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import LeftNavBar from "../components/LeftNavBar";
import TopBar from "../components/TopBar";

function DonationCard({ donation }) {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{donation.foodType}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Donated on {donation.createdAt ? new Date(donation.createdAt.toDate()).toLocaleDateString() : "Unknown"}
                </Card.Subtitle>
                <Card.Text>
                    Quantity: {donation.quantity}
                    <br />
                    Location: {donation.location}
                    <br />
                    Status:{" "}
                    <span className={`font-weight-bold ${donation.status === "Delivered" ? "text-success" : "text-warning"}`}>
                        {donation.status}
                    </span>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

function DonationHistoryPage() {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => { // ✅ IIFE to handle async call properly
            try {
                const user = auth.currentUser;
                if (!user) {
                    console.error("User not authenticated.");
                    setLoading(false);
                    return;
                }

                const donationsRef = collection(db, "donations");
                const q = query(donationsRef, where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);

                const donationList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setDonations(donationList);
            } catch (error) {
                console.error("Error fetching donations:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);



    return (
        <Container fluid>
            <Row>
                <Col md={3} lg={2} className="bg-light sidebar">
                    <LeftNavBar />
                </Col>
                <Col md={9} lg={10} className="ms-sm-auto px-md-4">
                    <TopBar title="Donation History" />
                    <h2 className="mt-4 mb-4">Your Donation History</h2>

                    {loading ? (
                        <Spinner animation="border" />
                    ) : (
                        donations.length > 0 ? (
                            donations.map((donation) => <DonationCard key={donation.id} donation={donation} />)
                        ) : (
                            <p>No donations found.</p>
                        )
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default DonationHistoryPage;
