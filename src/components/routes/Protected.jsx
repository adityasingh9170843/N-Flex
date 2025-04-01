import { Children } from "react";
import { useAuth } from "../../context/authProvider"
import { Navigate } from "react-router-dom";

function Protected({Children}) {
    const { user, isLoading } = useAuth();
    if(isLoading) return null
  return (
    <>
        {user ? Children : <Navigate to="/"/>}
    </>
    
  )
}

export default Protected