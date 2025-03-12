import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate checking credentials
    if (username && password) {
      toast.success("Login successful!");
      onLogin();
    } else {
      toast.error("Please enter username and password.");
    }
    
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
