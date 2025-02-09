"use client"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

function LandingPage() {
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={8} className="text-center">
                    <h1>Welcome to FoodShare</h1>
                    <p className="lead">
                        Share your abundant food with others in your community. Reduce waste and help those in need!
                    </p>
                    <Row className="mt-4">
                        <Col>
                            <Link to="/login">
                                <Button variant="primary" size="lg">
                                    Login
                                </Button>
                            </Link>
                        </Col>
                        <Col>
                            <Link to="/register">
                                <Button variant="success" size="lg">
                                    Register
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default LandingPage