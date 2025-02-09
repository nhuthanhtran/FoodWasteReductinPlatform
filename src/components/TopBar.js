"use client"
import { Navbar, Nav, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function TopBar({ title }) {
    const navigate = useNavigate()

    const handleMakeDonation = () => {
        navigate("/make-donation")
    }

    const handleRequestHelp = () => {
        navigate("/request-donation")
    }

    return (
        <Navbar className="bg-light justify-content-between mb-3">
            <Navbar.Brand>{title}</Navbar.Brand>
            <Nav>
                <Button variant="primary" className="me-2" onClick={handleMakeDonation}>
                    Make Donation
                </Button>
                <Button variant="secondary" onClick={handleRequestHelp}>
                    Request Help
                </Button>
            </Nav>
        </Navbar>
    )
}

export default TopBar

