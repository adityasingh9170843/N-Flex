import { useAuth } from "../../context/authProvider";
import { Navigate } from "react-router-dom";

function Protected({ children }) { 
    const { user, isLoading } = useAuth();
    if (isLoading) return null;

    return user ? children : <Navigate to="/" />;
}

export default Protected;
