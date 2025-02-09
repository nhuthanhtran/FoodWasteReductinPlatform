"use client"

import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import SpinningLogo from "../components/SpinningLogo"
import "../styles/LandingPage.css" // New CSS file for styling

export default function LandingPage() {
    return (
        <Container fluid className="landing-page">
            {/* Header Section */}
            <header className="landing-header">
                <div className="logo-container">
                    <SpinningLogo />
                </div>
            </header>

            {/* Main Content */}
            <Row className="justify-content-center text-center">
                <Col md={8}>
                    <h1 className="landing-title">Welcome to FoodShare</h1>
                    <p className="landing-description">
                        Share your abundant food with others in your community. Reduce waste and help those in need!
                    </p>
                    <Row className="mt-4">
                        <Col>
                            <Link to="/login">
                                <Button className="btn-primary-lg">Login</Button>
                            </Link>
                        </Col>
                        <Col>
                            <Link to="/register">
                                <Button className="btn-secondary-lg">Register</Button>
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}