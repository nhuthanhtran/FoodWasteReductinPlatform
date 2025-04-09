"use client";

import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert, Button, Modal } from "react-bootstrap";
import { getUserDonations } from "../controllers/donationController";
import LeftNavBar from "../components/LeftNavBar"
import TopBar from "../components/TopBar"
import { auth } from "../firebase/auth";
import Badge from 'react-bootstrap/Badge';
import { getUserRequest } from "../controllers/requestController";
import { db } from "../firebase/auth";
import { doc, updateDoc} from "firebase/firestore";
import EditHelpRequestForm from "../components/EditHelpRequestForm";
import ActiveHelpRequests from "../components/ActiveHelpRequest";
import '../styles/ScrollStyles.css';


function HelpReceivedCard({ help }) {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{help.foodType}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Received on {help.date}</Card.Subtitle>
                <Card.Text>
                    Quantity: {help.quantity}
                    <br />
                    Donor: {help.donor}
                    <br />
                   Status: <Badge bg={help.status === "Received" ? "success" : "warning"}>{help.status}</Badge>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

function HelpReceivedPage() {
    const user = auth.currentUser;
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [editableRequest, setEditableRequest] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [toDeleteRequestId, setToDeleteRequestId] = useState(null);


    useEffect(() => {
        const fetchRequests = async () => {
            if (user) {
                const result = await getUserRequest(user.uid);
                if (result.success) {
                    setRequests(result.requests);
                } else {
                    setError(result.error);
                }
            }
        };

        fetchRequests();
    }, [user]);

    const handleDeleteRequest = async (requestId) => {
        try {
            const ref = doc(db, 'requests', requestId);
            await updateDoc(ref, { status: 'Deleted' });

            setRequests((prev) =>
                prev.map((r) =>
                    r.id === requestId ? { ...r, status: 'Deleted' } : r
                )
            );
        } catch (error) {
            console.error('Error deleting request:', error);
        }
        setShowConfirmModal(false);
        setToDeleteRequestId(null);
    };

    const handleRequestUpdated = (updatedRequest) => {
        setRequests((prev) =>
            prev.map((r) => (r.id === updatedRequest.id ? updatedRequest : r))
        );
    };

    const activeRequests = requests.filter((r) => r.status === "Pending");
    const historyRequests = requests.filter((r) => r.status !== "Pending");

    return (
        <div className="scrollableContainer">
        <Container fluid>
            <Row>
                <Col md={3} lg={2} className="sidebar">
                    <LeftNavBar />
                </Col>
                <Col md={9} lg={10} className="px-md-4">
                    <TopBar title="Help Request"/>
                    <h3 className="mt-4">Active Help Requests</h3>
                    <ActiveHelpRequests
                        requests={activeRequests}
                        onEdit={(r) => {
                            setEditableRequest(r);
                            setShowEditModal(true);
                        }}
                        onDelete={(requestId) => {
                            setToDeleteRequestId(requestId);
                            setShowConfirmModal(true);
                        }}
                    />

                    <h3 className="mt-5">Your Request History</h3>
                    {error && <Alert variant="danger">{error}</Alert>}

                    {requests.length === 0 ? (
                        <p>No Requests found.</p>
                    ) : (
                        requests.map((requests) => (
                            <Card key={requests.id} className="mb-3">
                                <Card.Body>
                                    <Card.Title>{requests.itemName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Created on {new Date(requests.createdAt.seconds * 1000).toLocaleDateString()}
                                    </Card.Subtitle>
                                    <Card.Text>

                                        Quantity: {requests.quantity}
                                        <br/>
                                        Urgency : {requests.urgency}
                                        <br/>
                                        Location: {requests.pickupLocation}
                                        <br/>
                                        Additional Details: {requests.additionalDetails}
                                        <br/>
                                        Contact Number: {requests.contactNumber}
                                        <br/>
                                        Status:{" "}
                                        <span
                                            className={requests.status === "Delivered" ? "text-success" : "text-warning"}>
                                            {requests.status}
                                        </span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    )}
                </Col>
            </Row>
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered dialogClassName="custom-edit-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this help request?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={() => handleDeleteRequest(toDeleteRequestId)}>Yes, Delete</Button>
                </Modal.Footer>
            </Modal>

            <EditHelpRequestForm
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                request={editableRequest}
                onSave={handleRequestUpdated}
            />
        </Container>
        </div>
    );
}

export default HelpReceivedPage

