"use client"

import { useState } from "react"
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap"
import LeftNavBar from "../components/LeftNavBar"
import TopBar from "../components/TopBar"

const scrollableContentStyle = {
    height: "calc(100vh - 56px)", // Adjust this value based on your TopBar height
    overflowY: "auto",
    paddingTop: "20px",
    paddingBottom: "20px",
}

const initialSettings = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA",
    notifyEmail: true,
    notifySMS: false,
    notifyPush: true,
    language: "en",
    timezone: "UTC-5",
}

function AccountSettingsPage() {
    const [settings, setSettings] = useState(initialSettings)
    const [showAlert, setShowAlert] = useState(false)

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the updated settings to your backend
        console.log("Updated settings:", settings)
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 3000)
    }

    return (
        <Container fluid className="vh-100">
            <Row className="h-100">
                <Col md={3} lg={2} className="sidebar">
                    <LeftNavBar />
                </Col>
                <Col md={9} lg={10} className="ms-sm-auto px-md-4">
                    <TopBar title="Account Settings" />
                    <div style={scrollableContentStyle}>
                        <h2 className="mt-4 mb-4">Account Settings</h2>
                        {showAlert && (
                            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                                Your settings have been successfully updated!
                            </Alert>
                        )}
                        <Form onSubmit={handleSubmit}>
                            <Card className="mb-4">
                                <Card.Header>Personal Information</Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="firstName"
                                                    value={settings.firstName}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="lastName"
                                                    value={settings.lastName}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" value={settings.email} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="tel" name="phone" value={settings.phone} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" name="address" value={settings.address} onChange={handleInputChange} />
                                    </Form.Group>
                                </Card.Body>
                            </Card>

                            <Card className="mb-4">
                                <Card.Header>Notification Preferences</Card.Header>
                                <Card.Body>
                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Receive email notifications"
                                            name="notifyEmail"
                                            checked={settings.notifyEmail}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Receive SMS notifications"
                                            name="notifySMS"
                                            checked={settings.notifySMS}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Receive push notifications"
                                            name="notifyPush"
                                            checked={settings.notifyPush}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Card.Body>
                            </Card>

                            <Card className="mb-4">
                                <Card.Header>Account Preferences</Card.Header>
                                <Card.Body>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Language</Form.Label>
                                        <Form.Select name="language" value={settings.language} onChange={handleInputChange}>
                                            <option value="en">English</option>
                                            <option value="es">Español</option>
                                            <option value="fr">Français</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Timezone</Form.Label>
                                        <Form.Select name="timezone" value={settings.timezone} onChange={handleInputChange}>
                                            <option value="UTC-8">Pacific Time (PT)</option>
                                            <option value="UTC-7">Mountain Time (MT)</option>
                                            <option value="UTC-6">Central Time (CT)</option>
                                            <option value="UTC-5">Eastern Time (ET)</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Card.Body>
                            </Card>

                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default AccountSettingsPage

