import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

const ActiveHelpRequests = ({ requests, onEdit, onDelete }) => {
    if (!requests || requests.length === 0) {
        return <p>No active requests.</p>;
    }

    return (
        <>
            {requests.map((request) => (
                <Card
                    key={request.id}
                    className="mb-4 p-3 shadow-sm bg-white border-0 rounded-3 w-100"
                >
                    <Row className="align-items-center">
                        <Col xs={12} md={8}>
                            <h5 className="fw-semibold">{request.itemName}</h5>
                            <p className="mb-1">Urgency: {request.urgency}</p>
                            <p className="mb-1">Location: {request.pickupLocation}</p>
                            <small className="text-muted">
                                {new Date(request.createdAt.seconds * 1000).toLocaleString()}
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
                                onClick={() => onEdit(request)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => onDelete(request.id)}
                            >
                                Delete
                            </Button>
                        </Col>
                    </Row>
                </Card>
            ))}
        </>
    );
};

export default ActiveHelpRequests;
