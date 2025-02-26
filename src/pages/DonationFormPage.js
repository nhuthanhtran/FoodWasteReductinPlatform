"use client"

import { useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import LeftNavBar from "../components/LeftNavBar"
import TopBar from "../components/TopBar"
import * as state from "react-bootstrap/ElementChildren";

function DonationFormPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        foodType: "",
        quantity: "",
        expirationDate: "",
        location: {
            street: '',
            city: '',
            state: '',
            zip: ''
        },
        pickupTime: "ready_now",
        customPickupTime: "",
        isRecurring: false,
        recurringFrequency: "weekly",
    })


    const states = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
        "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const [parent, child] = name.split('.');

        if (child) {
            setFormData((prevState) => ({
                ...prevState,
                [parent]: {
                    ...prevState[parent],
                    [child]: type === 'checkbox' ? checked : value,
                },
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the form data to your backend
        console.log("Form submitted:", formData)
        // Navigate back to confirmation page after submission
        navigate("/donationconfirmation", {state: formData})
    }

    return (
        <Container fluid>
            <Row>
                <Col md={3} lg={2} className="bg-light sidebar">
                    <LeftNavBar />
                </Col>
                <Col md={9} lg={10} className="ms-sm-auto px-md-4">
                    <TopBar title="Make a Donation" />
                    <h2>Donate Food</h2>
                    <Form onSubmit={handleSubmit}>
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
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                                type="text"
                                name="location.street"
                                value={formData.location.street}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="location.city"
                                    value={formData.location.city}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>State</Form.Label>
                                <Form.Select
                                    type="text"
                                    name="location.state"
                                    value={formData.location.state}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select a State</option>
                                    {states.map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="location.zip"
                                    value={formData.location.zip}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

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

                        <Button variant="primary" type="submit">
                            Submit Donation
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default DonationFormPage
