"use client"

import { useState } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { Container } from "react-bootstrap"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import DonationHistoryPage from "./pages/DonationHistoryPage"
import HelpReceivedPage from "./pages/HelpReceivedPage"
import AccountSettingsPage from "./pages/AccountSettingsPage"
import DonationFormPage from "./pages/DonationFormPage";
import RequestDonationPage from "./pages/RequestDonationPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DonationConfirmPage from "./pages/DonationConfirmPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(true) //set true for demo

    const handleLogin = () => {
        setIsAuthenticated(true)
    }

    return (
        <Router>
            <Container fluid className="p-0">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/donationconfirmation" element={<DonationConfirmPage />} />
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
                    <Route
                        path="/donation-history"
                        element={isAuthenticated ? <DonationHistoryPage /> : <Navigate to="/login" />}
                    />
                    <Route path="/help-received" element={isAuthenticated ? <HelpReceivedPage /> : <Navigate to="/login" />} />
                    <Route
                        path="/account-settings"
                        element={isAuthenticated ? <AccountSettingsPage /> : <Navigate to="/login" />}
                    />
                    <Route path="/make-donation" element={isAuthenticated ? <DonationFormPage /> : <Navigate to="/donationconfirmation" />} />
                    <Route
                        path="/request-donation"
                        element={isAuthenticated ? <RequestDonationPage /> : <Navigate to="/login" />}
                    />
                </Routes>
            </Container>
        </Router>
    )
}

export default App

