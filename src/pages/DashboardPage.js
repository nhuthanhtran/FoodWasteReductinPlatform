"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/auth";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import LeftNavBar from "../components/LeftNavBar";
import TopBar from "../components/TopBar";
import "../styles/Dashboard.css";

function DashboardPage() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, "donations"));
                const querySnapshot = await getDocs(q);
                const items = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    type: "Donation",
                    item: doc.data().foodtype,
                    quantity: doc.data().quantity,
                    action: "Take",
                    ...doc.data(),
                }));
                setData(items);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const filteredData = data.filter(
        (item) =>
            item.item &&
            typeof item.item === "string" &&
            item.type &&
            typeof item.type === "string" &&
            filter &&
            typeof filter === "string" &&
            (item.item.toLowerCase().includes(filter.toLowerCase()) ||
                item.type.toLowerCase().includes(filter.toLowerCase()))
    );


    const handleAction = (item) => {
        if (item.type === "Donation") {
            console.log("Taking donation:", item);
            // Add "Take" functionality here
        } else {
            console.log("Fulfilling request:", item);
            // Add "Donate" functionality here
        }
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <LeftNavBar />
            </div>
            <div className="main-content">
                <TopBar title="Dashboard" />
                <div className="dashboard-content">
                    <h2 className="dashboard-title">Available Donations and Help Requests</h2>
                    <div className="filter-container">
                        <input
                            type="text"
                            placeholder="Filter by item or type..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="filter-input"
                        />
                    </div>
                    <Table striped bordered hover className="dashboard-table">
                        <thead>
                        <tr>
                            <th>Type</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.id}>
                                <td className={item.type === "Donation" ? "donation-type" : "request-type"}>{item.type}</td>
                                <td>{item.item}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <Button
                                        onClick={() => handleAction(item)}
                                        variant={item.type === "Donation" ? "success" : "primary"}
                                        size="sm"
                                        className="action-button"
                                    >
                                        {item.type === "Donation" ? "Take" : "Donate"}
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