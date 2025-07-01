// AuthProvider.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  console.log(user)

  // Set user from localStorage (on refresh)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  },[]);

  // Register
  const createNewUser = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post("https://event-hub-server-self.vercel.app/register", formData);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
    } finally {
      setLoading(false);
    }
  };

  // Login
  const userLogin = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post("https://event-hub-server-self.vercel.app/login", formData);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const authInfo = {
    user,
    loading,
    setUser,
    createNewUser,
    userLogin,
    logOut,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
