import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token"); // Periksa token di localStorage

    return token ? children : <Navigate to="/" replace />; // Redirect ke Landing Page jika belum login
};

export default ProtectedRoute;
