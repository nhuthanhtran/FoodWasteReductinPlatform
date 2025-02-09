"use client"
import { Container, Row, Col } from "react-bootstrap"
import LeftNavBar from "../components/LeftNavBar"
import TopBar from "../components/TopBar"

function HelpReceivedPage() {
    return (
        <Container fluid>
            <Row>
                <Col md={3} lg={2} className="bg-light sidebar">
                    <LeftNavBar />
                </Col>
                <Col md={9} lg={10} className="ms-sm-auto px-md-4">
                    <TopBar title="Help Received" />
                    <h2>Help Received</h2>
                    {/* Add help received content here */}
                </Col>
            </Row>
        </Container>
    )
}

export default HelpReceivedPage

