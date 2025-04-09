"use client";

import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db, auth, collection, addDoc, serverTimestamp } from "../firebase/auth";// Import Firebase
import LeftNavBar from "../components/LeftNavBar";
import TopBar from "../components/TopBar";
import '../styles/ScrollStyles.css';

function RequestDonationPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        itemName: "",
        quantity: "",
        urgency: "medium",
        additionalDetails: "",
        pickupLocation: "",
        contactNumber: "",
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const user = auth.currentUser;
            if (!user) {
                alert("You must be logged in to request a donation.");
                return;
            }

            // Save request to Firestore
            await addDoc(collection(db, "requests"), {
                userId: user.uid,
                itemName: formData.itemName,
                quantity: parseInt(formData.quantity),
                urgency: formData.urgency,
                additionalDetails: formData.additionalDetails,
                pickupLocation: formData.pickupLocation,
                contactNumber: formData.contactNumber,
                status: "Pending",
                createdAt: serverTimestamp(),
            });

            setSuccessMessage("Donation request submitted successfully!");
            setTimeout(() => navigate("/dashboard"), 2000);

        } catch (error) {
            console.error("Error submitting request:", error);
            alert("Failed to submit request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="scrollableContainer">
        <Container fluid>
            <Row>
                <Col md={3} lg={2} className="sidebar">
                    <LeftNavBar />
                </Col>
                <Col md={9} lg={10} className="px-md-4">
                    <TopBar title="Request Donation" />
                    <h2>Request</h2>

                    {successMessage && <Alert variant="success">{successMessage}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Row className="justify-content-center align-items-center vh-90">
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Item Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="itemName"
                                        value={formData.itemName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Urgency</Form.Label>
                                    <Form.Select name="urgency" value={formData.urgency} onChange={handleInputChange}>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Additional Details</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="additionalDetails"
                                        value={formData.additionalDetails}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Pickup Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="pickupLocation"
                                        value={formData.pickupLocation}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" disabled={loading}>
                                    {loading ? "Submitting..." : "Submit Request"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default RequestDonationPage;
