import { createContext,useEffect,useState } from "react";
import { auth } from "../services/Firebase";

export const AuthContext = createContext();
export const AuthProvider =({chilren})=>{
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
    }, []);
}