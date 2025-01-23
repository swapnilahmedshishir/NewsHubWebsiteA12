import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../Component/Auth/FirebaseAuth";
import { useAxiospublic } from "../Hook/useAxiospublic";
import { toast } from "react-toastify";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  // axios public import
  const axiosPublic = useAxiospublic();
  // api url
  const apiUrl = "http://localhost:5001";
  // const apiUrl = "https://crowdcube-application-server.vercel.app";

  // user State
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

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
  // updateUser
  const updateUser = (updatedInfo) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedInfo,
    }));
  };

  const updateProfileData = async (updatedInfo) => {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: updatedInfo.name,
          photoURL: updatedInfo.photoURL,
        });

        // Send updated info to backend
        const response = await axiosPublic.put(
          "/api/update-profile",
          updatedInfo
        );

        if (response.data.status === 200) {
          const updatedUser = await response.json();
          setUser((prev) => ({
            ...prev,
            displayName: updatedUser.name,
            photoURL: updatedUser.photoURL,
            email: updatedUser.email,
          }));
          toast.success("Profile updated successfully!");
          return updateUser;
        } else {
          const error = await response.json();
          toast.error(error.message || "Failed to update profile.");
        }
      } catch (error) {
        console.error("Profile update error:", error);
        toast.error("Failed to update profile.");
      }
    }
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
        axiosPublic.post("/api/jwt", loggedInUser).then((res) => {
          if (res.data.success) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
      } else {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("access-token");
      }
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  const contextApiValue = {
    apiUrl,
    user,
    setUser,
    RegisterUser,
    loginUser,
    loginWithGoogle,
    logoutUser,
    updateUser,
    updateProfileData,
  };

  return (
    <AppContext.Provider value={contextApiValue}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
