import { createContext, useEffect, useState,useContext } from "react";
import { auth } from "../services/Firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  
} from "firebase/auth";


export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function SignInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth,provider);
  }

  function SignOut() {
    return signOut(auth);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("current user", currentUser);
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        SignInWithGoogle,
        SignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
    
};

export const useAuth = () => useContext(AuthContext);