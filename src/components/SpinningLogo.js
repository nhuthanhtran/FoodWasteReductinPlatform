"use client"

import "../styles/SpinningLogo.css";

export default function SpinningLogo() {
    return (
        <div className="logo-container">
            <img src="/logo512.png" alt="Logo" className="spinning-logo" />
        </div>
    )
}