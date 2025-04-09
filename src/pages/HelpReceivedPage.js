"use client";

import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { getUserDonations } from "../controllers/donationController";
import LeftNavBar from "../components/LeftNavBar"
import TopBar from "../components/TopBar"
import { auth } from "../firebase/auth";
import Badge from 'react-bootstrap/Badge';
import { getUserRequest } from "../controllers/requestController";
import '../styles/ScrollStyles.css';



function HelpReceivedCard({ help }) {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{help.foodType}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Received on {help.date}</Card.Subtitle>
                <Card.Text>
                    Quantity: {help.quantity}
                    <br />
                    Donor: {help.donor}
                    <br />
                   Status: <Badge bg={help.status === "Received" ? "success" : "warning"}>{help.status}</Badge>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

function HelpReceivedPage() {
    const user = auth.currentUser;
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRequests = async () => {
            if (user) {
                const result = await getUserRequest(user.uid);
                if (result.success) {
                    setRequests(result.requests);
                } else {
                    setError(result.error);
                }
            }
        };

        fetchRequests();
    }, [user]);

    return (
        <div className="scrollableContainer">
        <Container fluid>
            <Row>
                <Col md={3} lg={2} className="sidebar">
                    <LeftNavBar />
                </Col>
                <Col md={9} lg={10} className="px-md-4">
                    <TopBar title="Request Donation"/>
                    <h2 className="mt-4 mb-4">Your Request History</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    {requests.length === 0 ? (
                        <p>No Requests found.</p>
                    ) : (
                        requests.map((requests) => (
                            <Card key={requests.id} className="mb-3">
                                <Card.Body>
                                    <Card.Title>{requests.itemName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Donated on {new Date(requests.createdAt.seconds * 1000).toLocaleDateString()}
                                    </Card.Subtitle>
                                    <Card.Text>
                        
                                        Quantity: {requests.quantity}
                                        <br />
                                        Urgency : {requests.urgency}
                                        <br />
                                        Location: {requests.pickupLocation}
                                        <br />
                                        Additional Details: {requests.additionalDetails}
                                        <br />
                                        Contact Number: {requests.contactNumber}
                                        <br />
                                        Status:{" "}
                                        <span className={requests.status === "Delivered" ? "text-success" : "text-warning"}>
                                            {requests.status}
                                        </span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    )}
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default HelpReceivedPage

