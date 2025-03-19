"use client"
import { Navbar, Nav, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import LogoutButton from "./LogoutButton";

function TopBar({ title }) {
    const navigate = useNavigate()

    return (
        <Navbar className="topbar">
            <Navbar.Brand className="topbar-title">{title}</Navbar.Brand>
            <Nav>
                <Button
                    className="topbar-btn donate-btn me-3"
                    onClick={() => navigate("/make-donation")}
                >
                    Make Donation
                </Button>
                <Button
                    className="topbar-btn request-btn"
                    onClick={() => navigate("/request-donation")}
                >
                    Request Items
                </Button>
                <LogoutButton />
            </Nav>
        </Navbar>
    )
}

export default TopBar
