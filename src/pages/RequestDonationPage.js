"use client"

import { useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import LeftNavBar from "../components/LeftNavBar"
import TopBar from "../components/TopBar"

function RequestDonationPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        itemName: "",
        quantity: "",
        urgency: "medium",
        additionalDetails: "",
        pickupLocation: "",
        contactNumber: "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the form data to your backend
        console.log("Request submitted:", formData)
        // Navigate back to dashboard after submission
        navigate("/dashboard")
    }

    return (
        <Container fluid>
            <Row>
                <Col md={3} lg={2} className="bg-light sidebar">
                    <LeftNavBar />
                </Col>
                <Col md={9} lg={10} className="ms-sm-auto px-md-4">
                    <TopBar title="Request Donation" />
                    <h2>Request Items</h2>
                    <Form onSubmit={handleSubmit}>
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

                        <Button variant="primary" type="submit">
                            Submit Request
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default RequestDonationPage

