import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebase/auth";

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    return <Button variant="danger" onClick={handleLogout}>Logout</Button>;
}

export default LogoutButton;
