"use client"
import { Nav } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"

function LeftNavBar() {
    const location = useLocation()

    return (
        <Nav className="sidebar-nav flex-column">
            <Nav.Link as={Link} to="/dashboard" className={location.pathname === "/dashboard" ? "active-link" : ""}>
                Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/donation-history" className={location.pathname === "/donation-history" ? "active-link" : ""}>
                Donation History
            </Nav.Link>
            <Nav.Link as={Link} to="/help-received" className={location.pathname === "/help-received" ? "active-link" : ""}>
                Help Received
            </Nav.Link>
            <Nav.Link as={Link} to="/account-settings" className={location.pathname === "/account-settings" ? "active-link" : ""}>
                Account Settings
            </Nav.Link>
        </Nav>
    )
}

export default LeftNavBar