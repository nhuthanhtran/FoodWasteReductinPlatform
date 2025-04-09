import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/auth';

const EditHelpRequestForm = ({ show, onClose, request, onSave }) => {
    const [formData, setFormData] = useState({
        itemName: '',
        quantity: '',
        urgency: 'Medium',
        additionalDetails: '',
        pickupLocation: '',
        contactNumber: '',
    });

    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (request) {
            setFormData({
                itemName: request.itemName || '',
                quantity: request.quantity || '',
                urgency: request.urgency || 'Medium',
                additionalDetails: request.additionalDetails || '',
                pickupLocation: request.pickupLocation || '',
                contactNumber: request.contactNumber || '',
            });
        }
    }, [request]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        const quantityNum = Number(formData.quantity);
        if (isNaN(quantityNum) || quantityNum <= 0) {
            setErrorMessage('Quantity must be a number greater than 0.');
            return;
        }

        try {
            const ref = doc(db, 'requests', request.id);
            await updateDoc(ref, {
                ...formData,
                quantity: quantityNum,
            });

            const updated = { ...request, ...formData, quantity: quantityNum };
            onSave(updated);
            setErrorMessage('');
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
                onClose();
            }, 2000);
        } catch (error) {
            console.error('Error updating request:', error);
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered dialogClassName="custom-edit-modal">
            <Modal.Header closeButton>
                <Modal.Title>Edit Help Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showAlert && (
                    <div className="alert alert-success" role="alert">
                        Request updated successfully!
                    </div>
                )}

                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="itemName"
                            value={formData.itemName}
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
                        <Form.Label>Urgency</Form.Label>
                        <Form.Select
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Additional Details</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="additionalDetails"
                            value={formData.additionalDetails}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Pickup Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="pickupLocation"
                            value={formData.pickupLocation}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>
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

export default EditHelpRequestForm;
