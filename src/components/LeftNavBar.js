"use client"
import { Nav } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"

function LeftNavBar() {
    const location = useLocation()

    return (
        <Nav className="flex-column">
            <Nav.Link as={Link} to="/dashboard" active={location.pathname === "/dashboard"}>
                Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/donation-history" active={location.pathname === "/donation-history"}>
                Donation History
            </Nav.Link>
            <Nav.Link as={Link} to="/help-received" active={location.pathname === "/help-received"}>
                Help Received
            </Nav.Link>
            <Nav.Link as={Link} to="/account-settings" active={location.pathname === "/account-settings"}>
                Account Settings
            </Nav.Link>
        </Nav>
    )
}

export default LeftNavBar