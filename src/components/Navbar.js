import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Frontend Task
        </Link>
        <div className="d-flex">
          {isAuthenticated ? (
            <button className="btn btn-outline-light" onClick={onLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-outline-light">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
