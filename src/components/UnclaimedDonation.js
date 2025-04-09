import React, { useEffect, useState } from 'react';
import { db } from '../firebase/auth';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import {Row, Col, Card, Button, Spinner, Modal, Container} from 'react-bootstrap';
import EditDonationForm from './EditDonationForm';

const UnclaimedDonations = ({ userId, onDonationDeleted, onDonationUpdated }) => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [toDeleteId, setToDeleteId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editableDonation, setEditableDonation] = useState(null);

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

            const deletedItem = donations.find((d) => d.id === toDeleteId);
            if (onDonationDeleted && deletedItem) {
                onDonationDeleted({ ...deletedItem, status: 'Deleted' });
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
                    <Card
                        key={donation.id}
                        className="mb-4 p-3 shadow-sm bg-white border-0 rounded-3 w-100"
                    >
                        <Row className="align-items-center">
                            <Col xs={12} md={8}>
                                <h5 className="fw-semibold">{donation.foodType}</h5>
                                <p className="mb-1">Quantity: {donation.quantity}</p>
                                <p className="mb-1">Location: {donation.location}</p>
                                <small className="text-muted">
                                    {donation.createdAt?.seconds
                                        ? new Date(donation.createdAt.seconds * 1000).toLocaleString()
                                        : 'Date unknown'}
                                </small>
                            </Col>

                            <Col
                                xs={12}
                                md={4}
                                className="d-flex justify-content-md-end justify-content-start mt-3 mt-md-0"
                            >
                                <Button
                                    variant="outline-primary"
                                    className="me-2"
                                    onClick={() => {
                                        setEditableDonation(donation);
                                        setShowEditModal(true);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => confirmDelete(donation.id)}
                                >
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                ))}
            </Row>

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName="custom-edit-modal">
                <Modal.Header closeButton className="border-0">
                    <Modal.Title className="text-danger fw-bold">
                        <i className="bi bi-exclamation-triangle me-2" /> Confirm Deletion
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p className="fs-5">Are you sure you want to remove this donation?</p>
                    <p className="text-muted medium">This action cannot be undone.</p>
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
            <EditDonationForm
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                donation={editableDonation}
                onSave={(updated) => {
                    setDonations((prev) =>
                        prev.map((d) => (d.id === updated.id ? updated : d))
                    );
                    if (onDonationUpdated) {
                        onDonationUpdated(updated);
                    }
                }}
            />

        </Container>
    );
};

export default UnclaimedDonations;