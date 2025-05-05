import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleReset = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError("Failed to send reset email. Try again.");
      setMessage("");
    }
  };

  return (
    <Container className="pt-5" style={{ maxWidth: "500px" }}>
      <h2>Forgot Password</h2>
  
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
  
      <Form onSubmit={handleReset}>
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your registered email"
          />
        </Form.Group>
  
        <Button variant="primary" type="submit">
          Send Reset Email
        </Button>
      </Form>
    </Container>
  );
}
export default ForgotPasswordPage;
