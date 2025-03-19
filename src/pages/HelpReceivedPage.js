"use client"
import { Container, Row, Col, Card, Badge } from "react-bootstrap"
import LeftNavBar from "../components/LeftNavBar"
import TopBar from "../components/TopBar"

const mockHelpReceived = [
    {
        id: 1,
        foodType: "Canned Goods",
        quantity: "15 cans",
        date: "2023-06-18",
        donor: "Anonymous",
        status: "Received",
    },
    {
        id: 2,
        foodType: "Fresh Fruit",
        quantity: "3 kg",
        date: "2023-06-14",
        donor: "Local Grocery Store",
        status: "In Transit",
    },
    {
        id: 3,
        foodType: "Pasta",
        quantity: "5 kg",
        date: "2023-06-09",
        donor: "Community Kitchen",
        status: "Received",
    },
    {
        id: 4,
        foodType: "Baby Formula",
        quantity: "2 cans",
        date: "2023-06-07",
        donor: "Parent Support Group",
        status: "Received",
    },
]

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
    return (
        <Container fluid>
            <Row>
                <Col md={3} lg={2} className="sidebar">
                    <LeftNavBar />
                </Col>
                <Col md={9} lg={10} className="ms-sm-auto px-md-4">
                    <TopBar title="Help Received" />
                    <h2 className="mt-4 mb-4">Help You've Received</h2>
                    {mockHelpReceived.map((help) => (
                        <HelpReceivedCard key={help.id} help={help} />
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

export default HelpReceivedPage

