"use client"

import { useState } from "react"
import {Container, Row, Col, Form, Button, Image} from "react-bootstrap"
import { Link } from "react-router-dom"

function RegisterPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle registration logic here
        console.log("Registration submitted", { name, email, password, confirmPassword })
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6} className="d-flex justify-content-center align-items-center">
                    <Image src="/logo.webp" alt="Logo" fluid style={{ maxWidth: "80%", height: "auto" }} />
                </Col>
                <Col md={6} style={{textAlign: "center", width: "40%"}}>
                    <h2 className="text-center mb-4">Register for FoodShare</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

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

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Register
                        </Button>
                    </Form>
                    <div className="text-center mt-3">
                        <Link to="/login">Already have an account? Login here</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterPage