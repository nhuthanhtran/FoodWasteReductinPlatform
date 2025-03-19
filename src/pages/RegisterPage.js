"use client";

import { useState } from "react";
import { Container, Row, Col, Form, Button, Image, Alert } from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import { auth, db, createUserWithEmailAndPassword} from "../firebase/auth";
import {setDoc, doc} from "firebase/firestore";


function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        // Check password match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                userId: user.uid,
                name: formData.name,
                email: formData.email,
                createdAt: new Date(),
                notifyEmail: true,
                notifySMS: false,
                notifyPush: true,
            });

            setSuccess(true);
            setFormData({ name: "", email: "", password: "", confirmPassword: "" });

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6} className="d-flex justify-content-center align-items-center">
                    <Image src="/logo.webp" alt="Logo" fluid style={{ maxWidth: "80%", height: "auto" }} />
                </Col>
                <Col md={6}>
                    <h2 className="text-center mb-4">Register for FoodShare</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">Registration successful! You can now login.</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your full name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
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
    );
}

export default RegisterPage;