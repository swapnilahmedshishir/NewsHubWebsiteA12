import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../Component/Auth/FirebaseAuth";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  // api url
  // const apiUrl = "http://localhost:5001";
  const apiUrl = "https://crowdcube-application-server.vercel.app";

  // user State
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Handle Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // singup or Register user
  const RegisterUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // sinIn or login user
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout User
  const logoutUser = () => {
    return signOut(auth);
  };
  // any change user Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const loggedInUser = {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        };
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  const contextApiValue = {
    apiUrl,
    user,
    theme,
    toggleTheme,
    setUser,
    RegisterUser,
    loginUser,
    loginWithGoogle,
    logoutUser,
  };

  return (
    <AppContext.Provider value={contextApiValue}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
