"use client"
import { Container, Row, Col, Card } from "react-bootstrap"
import LeftNavBar from "../components/LeftNavBar"
import TopBar from "../components/TopBar"

const mockDonations = [
    {
        id: 1,
        foodType: "Canned Soup",
        quantity: "10 cans",
        date: "2023-06-15",
        recipient: "Local Food Bank",
        status: "Delivered",
    },
    {
        id: 2,
        foodType: "Fresh Vegetables",
        quantity: "5 kg",
        date: "2023-06-10",
        recipient: "Community Center",
        status: "In Transit",
    },
    {
        id: 3,
        foodType: "Bread",
        quantity: "20 loaves",
        date: "2023-06-05",
        recipient: "Homeless Shelter",
        status: "Delivered",
    },
    {
        id: 4,
        foodType: "Milk",
        quantity: "10 liters",
        date: "2023-06-01",
        recipient: "Children's Home",
        status: "Delivered",
    },
]

function DonationCard({ donation }) {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{donation.foodType}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Donated on {donation.date}</Card.Subtitle>
                <Card.Text>
                    Quantity: {donation.quantity}
                    <br />
                    Recipient: {donation.recipient}
                    <br />
                    Status:{" "}
                    <span className={`font-weight-bold ${donation.status === "Delivered" ? "text-success" : "text-warning"}`}>
            {donation.status}
          </span>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

function DonationHistoryPage() {
    return (
        <Container fluid>
            <Row>
                <Col md={3} lg={2} className="bg-light sidebar">
                    <LeftNavBar />
                </Col>
                <Col md={9} lg={10} className="ms-sm-auto px-md-4">
                    <TopBar title="Donation History" />
                    <h2 className="mt-4 mb-4">Your Donation History</h2>
                    {mockDonations.map((donation) => (
                        <DonationCard key={donation.id} donation={donation} />
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

export default DonationHistoryPage

