import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Check localStorage for auth token
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );

  useEffect(() => {
    // If there's a token in localStorage, consider the user authenticated
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    // Simulate a token
    localStorage.setItem("authToken", "my-secret-token");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Navbar - Visible on every page */}
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      {/* Routing */}
      <Routes>
        {/* Dashboard requires authentication */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          }
        />
        {/* Login Page */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
