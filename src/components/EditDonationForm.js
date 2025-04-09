import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/auth';
import '../styles/DonationModal.css';

const EditDonationForm = ({ show, onClose, donation, onSave }) => {
    const [formData, setFormData] = useState({
        foodType: '',
        quantity: '',
        location: '',
        expirationDate: '',
        pickupTime: '',
    });

    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (donation) {
            setFormData({
                foodType: donation.foodType || '',
                quantity: donation.quantity || '',
                location: donation.location || '',
                expirationDate: donation.expirationDate || '',
                pickupTime: donation.pickupTime || '',
                customPickupTime: donation.customPickupTime || '',
            });
        }
    }, [donation]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async () => {
        if (!donation?.id) return;

        const quantityNum = Number(formData.quantity);
        if (isNaN(quantityNum) || quantityNum <= 0) {
            setErrorMessage('Quantity must be a number greater than 0.');
            return;
        }

        try {
            const ref = doc(db, 'donations', donation.id);
            await updateDoc(ref, {
                ...formData,
                quantity: Number(formData.quantity),
            });

            const updated = { ...donation, ...formData, quantity: Number(formData.quantity) };
            onSave(updated);
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
                onClose();
            }, 2000);
        } catch (error) {
            console.error('Error updating donation:', error);
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered dialogClassName="custom-edit-modal">
            <Modal.Header closeButton>
                <Modal.Title>Edit Donation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showAlert && (
                    <div className="alert alert-success" role="alert">
                        Donation updated successfully!
                    </div>
                )}

                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Food Type</Form.Label>
                        <Form.Control
                            type="text"
                            name="foodType"
                            value={formData.foodType}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Expiration Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="expirationDate"
                            value={formData.expirationDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Pickup Time</Form.Label>
                        <Form.Select
                            name="pickupTime"
                            value={formData.pickupTime}
                            onChange={handleChange}
                        >
                            <option value="Ready Now">Ready Now</option>
                            <option value="schedule">Schedule</option>
                        </Form.Select>
                    </Form.Group>

                    {formData.pickupTime === 'schedule' && (
                        <Form.Group className="mb-3">
                            <Form.Label>Select Pickup Time</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="customPickupTime"
                                value={formData.customPickupTime || ''}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        customPickupTime: e.target.value,
                                    }))
                                }
                            />
                        </Form.Group>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditDonationForm;
