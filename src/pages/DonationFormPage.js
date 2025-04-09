"use client";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import {auth, db} from "../firebase/auth";
import LeftNavBar from "../components/LeftNavBar";
import TopBar from "../components/TopBar";
import { createDonation } from "../controllers/donationController";
import {doc, updateDoc} from "firebase/firestore";


function DonationFormPage() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setFormData(prev => ({
                ...prev,
                foodType: location.state.itemName || "",
                quantity: location.state.quantity?.toString() || "",
                location: location.state.pickupLocation || "",
            }));
        }
    }, [location]);
    const [formData, setFormData] = useState({
        foodType: "",
        quantity: "",
        expirationDate: "",
        location: "",
        pickupTime: "ready_now",
        customPickupTime: "",
        isRecurring: false,
        recurringFrequency: "weekly",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.state) {
            setFormData(prev => ({
                ...prev,
                foodType: location.state.itemName || "",
                quantity: location.state.quantity?.toString() || "",
            }));
        }
    }, [location]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const requestId = location.state?.id || null; // ← pull from state if available
            const result = await createDonation(formData);

            if (result.success) {
                if (requestId) {
                    const requestRef = doc(db, "requests", requestId);
                    await updateDoc(requestRef, {
                        status: "Accepted", // or "Fulfilled" if you prefer
                    });
                }
              //  alert("Donation submitted successfully!");
                navigate("/donationconfirmation", {state: formData});
            } else {
                alert("Error submitting donation: " + result.error);
            }
        } catch (error) {
            console.error("Submit error:", error);
            alert("Submission failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col md={3} lg={2} className="sidebar">
                    <LeftNavBar />
                </Col>

                <Col md={9} lg={10} className="px-md-4">
                    <TopBar title="Make a Donation" />
                    <h2>Donate Food</h2>
                    <Form onSubmit={handleSubmit}>
                        <Row className="justify-content-center align-items-center vh-75">
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Food Type</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="foodType"
                                        value={formData.foodType}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Expiration Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="expirationDate"
                                        value={formData.expirationDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Pickup Time</Form.Label>
                                    <Form.Select name="pickupTime" value={formData.pickupTime} onChange={handleInputChange}>
                                        <option value="ready_now">Ready Now</option>
                                        <option value="schedule">Schedule Pickup</option>
                                    </Form.Select>
                                </Form.Group>

                                {formData.pickupTime === "schedule" && (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Custom Pickup Time</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            name="customPickupTime"
                                            value={formData.customPickupTime}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                )}

                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="This is a recurring donation"
                                        name="isRecurring"
                                        checked={formData.isRecurring}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>

                                {formData.isRecurring && (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Recurring Frequency</Form.Label>
                                        <Form.Select name="recurringFrequency" value={formData.recurringFrequency} onChange={handleInputChange}>
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </Form.Select>
                                    </Form.Group>
                                )}

                                <Button variant="primary" type="submit" disabled={loading}>
                                    {loading ? "Submitting..." : "Submit Donation"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default DonationFormPage;
