import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <div className="container">Please log in.</div>;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container center">
      <h2>Welcome, {user.name}!</h2>
      <div className="dashboard-links" style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap" }}>
        <Link to="/profile">
          <button style={{ background: "#0070f3", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px" }}>Profile</button>
        </Link>
        <Link to="/listings">
          <button style={{ background: "#1abc9c", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px" }}>Listings</button>
        </Link>
        <Link to="/new-listing">
          <button style={{ background: "#f39c12", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px" }}>New Listing</button>
        </Link>
        <button onClick={handleLogout} style={{ background: "#e74c3c", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px" }}>Logout</button>
      </div>
    </div>
  );
}
