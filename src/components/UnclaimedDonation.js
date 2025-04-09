import React, { useEffect, useState } from 'react';
import { db } from '../firebase/auth';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import {Row, Col, Card, Button, Spinner, Modal, Container} from 'react-bootstrap';

const UnclaimedDonations = ({ userId, onDonationDeleted }) => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [toDeleteId, setToDeleteId] = useState(null);

    const fetchDonations = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(db, 'donations'),
                where('userId', '==', userId),
                where('status', '==', 'Pending')
            );
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setDonations(data);
        } catch (error) {
            console.error('Error fetching donations:', error);
        }
        setLoading(false);
    };

    const confirmDelete = (id) => {
        setToDeleteId(id);
        setShowModal(true);
    };

    const handleDelete = async () => {
        try {
            const ref = doc(db, 'donations', toDeleteId);
            await updateDoc(ref, { status: 'Deleted' });
            setDonations((prev) => prev.filter((d) => d.id !== toDeleteId));
            if (onDonationDeleted) {
                onDonationDeleted(toDeleteId);
            }
        } catch (error) {
            console.error('Error deleting donation:', error);
        }
        setShowModal(false);
        setToDeleteId(null);
    };

    useEffect(() => {
        if (userId) fetchDonations();
    }, [userId]);

    if (loading) {
        return (
            <div className="text-center my-4">
                <Spinner animation="border" />
            </div>
        );
    }

    if (donations.length === 0) {
        return <p className="text-muted text-center mt-4">No pending donations found.</p>;
    }

    return (
        <Container fluid>
            <Row xs={1} md={2} lg={3} className="g-4">
                {donations.map((donation) => (
                    <Col key={donation.id}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body>
                                <Card.Title>{donation.foodType}</Card.Title>
                                <Card.Text>
                                    Quantity: {donation.quantity}
                                    <br />
                                    Location: {donation.location}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-between align-items-center">
                                <small className="text-muted">
                                    {donation.createdAt?.seconds
                                        ? new Date(donation.createdAt.seconds * 1000).toLocaleString()
                                        : 'Date unknown'}
                                </small>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => confirmDelete(donation.id)}
                                >
                                    Delete
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title className="text-danger fw-bold">
                        <i className="bi bi-exclamation-triangle me-2" /> Confirm Deletion
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-black text-center">
                    <p className="fs-5">Are you sure you want to remove this donation?</p>
                    <p className="text-muted small">This action cannot be undone.</p>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center border-0">
                    <Button variant="secondary" onClick={() => setShowModal(false)} className="px-4">
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete} className="px-4">
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default UnclaimedDonations;