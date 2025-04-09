import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebase/auth";


function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/dashboard");
            alert("You have been logged out successfully.");
        } catch (error) {
            console.error("Error during logout:", error);
            alert("Failed to log out. Please try again.");
        }
    };

    return <Button className="custom-logout-btn" onClick={handleLogout}>Logout</Button>;
}

export default LogoutButton;
