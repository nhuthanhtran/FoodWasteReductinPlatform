"use client";

import { useState } from "react";
import { Container, Row, Col, Form, Button, Image, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../firebase/auth";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard"); // Redirect user to dashboard after successful login
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6} className="d-flex justify-content-center align-items-center">
                    <Image src="/logo.webp" alt="Logo" fluid style={{ maxWidth: "80%", height: "auto" }} />
                </Col>
                <Col md={6}>
                    <h2 className="text-center mb-4">Login to FoodShare</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                        <div className="text-center mt-2">
                         <Link to="/forgot-password">Forgot your password?</Link>
                        </div>
                    </Form>
                    <div className="text-center mt-3">
                        <Link to="/register">Don't have an account? Register here</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;