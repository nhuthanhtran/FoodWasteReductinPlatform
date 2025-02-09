"use client"
import { Container, Row, Col, Table, Button } from "react-bootstrap"
import LeftNavBar from "../components/LeftNavBar"
import TopBar from "../components/TopBar"

function DashboardPage() {
    // Mock data for the table
    const mockData = [
        { id: 1, type: "Donation", item: "Canned Soup", quantity: 10, action: "Take" },
        { id: 2, type: "Request", item: "Fresh Vegetables", quantity: 5, action: "Donate" },
        { id: 3, type: "Donation", item: "Bread", quantity: 3, action: "Take" },
        { id: 4, type: "Request", item: "Milk", quantity: 2, action: "Donate" },
    ]

    return (
        <Container fluid>
            <Row>
                {/* Left Navigation Bar */}
                <Col md={3} lg={2} className="bg-light sidebar">
                    <LeftNavBar />
                </Col>

                {/* Main Content Area */}
                <Col md={9} lg={10} className="ms-sm-auto px-md-4">
                    {/* Top Horizontal Bar */}
                    <TopBar title="Dashboard" />

                    {/* Main Dashboard Content */}
                    <h2>Available Donations and Help Requests</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Type</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mockData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.type}</td>
                                <td>{item.item}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <Button variant={item.type === "Donation" ? "success" : "primary"} size="sm">
                                        {item.action}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default DashboardPage