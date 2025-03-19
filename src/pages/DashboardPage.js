"use client";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import LeftNavBar from "../components/LeftNavBar";
import TopBar from "../components/TopBar";
import "../styles/Dashboard.css";
import { auth } from "../firebase/auth"; // Import Firebase auth
import { getUserDonations } from "../controllers/donationController"; // Import your controller

function DashboardPage() {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDonations = async () => {
            setLoading(true);
            try {
                // Get the current user's ID
                const user = auth.currentUser;
                if (!user) {
                    throw new Error("User is not authenticated.");
                }

                // Fetch donations using the controller
                const response = await getUserDonations(user.uid);

                if (response.success) {
                    setDonations(response.donations); // Update state with fetched donations
                } else {
                    setError(response.error); // Handle error from the controller
                }
            } catch (err) {
                console.error("Error fetching donations:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    if (loading) {
        return <div>Loading donations...</div>; // Show loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message
    }

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <LeftNavBar />
            </div>
            <div className="main-content">
                <TopBar title="Dashboard" />
                <div className="dashboard-content">
                    <h2 className="dashboard-title">Available Donations</h2>
                    <Table striped bordered hover className="dashboard-table">
                        <thead>
                        <tr>
                            <th>Food Type</th>
                            <th>Quantity</th>
                            <th>Expiration Date</th>
                            <th>Location</th>
                            <th>Pickup Time</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {donations.map((donation) => (
                            <tr key={donation.id}>
                                <td>{donation.foodType}</td>
                                <td>{donation.quantity}</td>
                                <td>{donation.expirationDate}</td>
                                <td>{donation.location}</td>
                                <td>{donation.pickupTime}</td>
                                <td>
                                    <Button
                                        variant="success"
                                        size="sm"
                                        onClick={() => console.log("Taking donation:", donation)}
                                    >
                                        Take
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;


// function DashboardPage() {
//     const mockData = [
//         { id: 1, type: "Donation", item: "Canned Soup", quantity: 10, action: "Take" },
//         { id: 2, type: "Request", item: "Fresh Vegetables", quantity: 5, action: "Donate" },
//         { id: 3, type: "Donation", item: "Bread", quantity: 3, action: "Take" },
//         { id: 4, type: "Request", item: "Milk", quantity: 2, action: "Donate" },
//     ]
//
//     return (
//         <div className="dashboard-container">
//             <div className="sidebar">
//                 <LeftNavBar />
//             </div>
//             <div className="main-content">
//                 <TopBar title="Dashboard" />
//
//                 <div className="dashboard-content">
//                     <h2 className="dashboard-title">Available Donations and Help Requests</h2>
//                     <Table striped bordered hover className="dashboard-table">
//                         <thead>
//                         <tr>
//                             <th>Type</th>
//                             <th>Item</th>
//                             <th>Quantity</th>
//                             <th>Action</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {mockData.map((item) => (
//                             <tr key={item.id}>
//                                 <td className={item.type === "Donation" ? "donation-type" : "request-type"}>
//                                     {item.type}
//                                 </td>
//                                 <td>{item.item}</td>
//                                 <td>{item.quantity}</td>
//                                 <td>
//                                     <Button
//                                         variant={item.type === "Donation" ? "success" : "primary"}
//                                         size="sm"
//                                         className="action-button"
//                                     >
//                                         {item.action}
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </Table>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default DashboardPage

// "use client"
// import { Container, Row, Col, Table, Button } from "react-bootstrap"
// import LeftNavBar from "../components/LeftNavBar"
// import TopBar from "../components/TopBar"
//
// function DashboardPage() {
//     // Mock data for the table
//     const mockData = [
//         { id: 1, type: "Donation", item: "Canned Soup", quantity: 10, action: "Take" },
//         { id: 2, type: "Request", item: "Fresh Vegetables", quantity: 5, action: "Donate" },
//         { id: 3, type: "Donation", item: "Bread", quantity: 3, action: "Take" },
//         { id: 4, type: "Request", item: "Milk", quantity: 2, action: "Donate" },
//     ]
//
//     return (
//         <Container fluid>
//             <Row>
//                 {/* Left Navigation Bar */}
//                 <Col md={3} lg={2} className="bg-light sidebar">
//                     <LeftNavBar />
//                 </Col>
//
//                 {/* Main Content Area */}
//                 <Col md={9} lg={10} className="ms-sm-auto px-md-4">
//                     {/* Top Horizontal Bar */}
//                     <TopBar title="Dashboard" />
//
//                     {/* Main Dashboard Content */}
//                     <h2>Available Donations and Help Requests</h2>
//                     <Table striped bordered hover>
//                         <thead>
//                         <tr>
//                             <th>Type</th>
//                             <th>Item</th>
//                             <th>Quantity</th>
//                             <th>Action</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {mockData.map((item) => (
//                             <tr key={item.id}>
//                                 <td>{item.type}</td>
//                                 <td>{item.item}</td>
//                                 <td>{item.quantity}</td>
//                                 <td>
//                                     <Button variant={item.type === "Donation" ? "success" : "primary"} size="sm">
//                                         {item.action}
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </Table>
//                 </Col>
//             </Row>
//         </Container>
//     )
// }
//
// export default DashboardPage