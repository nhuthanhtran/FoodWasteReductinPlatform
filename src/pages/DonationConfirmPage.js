import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import LeftNavBar from "../components/LeftNavBar";
import TopBar from "../components/TopBar";

function DonationConfirmPage() {
    const location = useLocation();
    const formData = location.state;

    return (
        <Container fluid className="confirmation-container">
            <Row>
                <Col md={3} lg={2} className="sidebar">
                    <LeftNavBar />
                </Col>
                <Col md={9} lg={10} className="ms-sm-auto px-md-4">
                    <TopBar title="Donation Confirmation" />
                    <div className="confirmation-content p-4">
                        <h4>Your donation request has been confirmed</h4>
                        <div className="donation-details mt-4">
                            <h5>Donation Details</h5>
                            <p><strong>Food Type:</strong> {formData.foodType}</p>
                            <p><strong>Quantity:</strong> {formData.quantity}</p>
                            <p><strong>Expiration Date:</strong> {formData.expirationDate}</p>
                            <h5>Pickup Details</h5>
                            <p><strong>Pickup Time:</strong> {formData.pickupTime}</p>
                            {formData.pickupTime === 'schedule' && (
                                <p><strong>Custom Pickup Time:</strong> {formData.customPickupTime}</p>
                            )}
                            <h5>Address Details</h5>
                            <p>{formData.location.street}, {formData.location.city}
                                , {formData.location.state} {formData.location.zip}</p>
                            {formData.isRecurring && (
                                <div>
                                    <h5>Recurring Donation</h5>
                                    <p><strong>Recurring Frequency:</strong> {formData.recurringFrequency}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default DonationConfirmPage;
