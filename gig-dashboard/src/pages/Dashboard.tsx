import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  if (!user) return <div className="container">Please log in.</div>;

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1 style={{ fontSize: 36, color: "#16a085" }}>Welcome to EcoFinds, {user.name}!</h1>
      <p style={{ color: "#555", marginTop: 12 }}>
        Discover sustainable and eco-friendly products from local sellers.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginTop: 24 }}>
        <Link to="/profile">
          <button style={cardBtn}>Profile</button>
        </Link>
        <Link to="/my-listings">
          <button style={cardBtn}>Browse Products</button>
        </Link>
        <button onClick={logout} style={{ ...cardBtn, background: "#e74c3c" }}>Logout</button>
      </div>
    </div>
  );
}

const cardBtn = {
  padding: "12px 24px",
  borderRadius: 8,
  border: "none",
  background: "#1abc9c",
  color: "white",
  fontSize: 16,
  cursor: "pointer",
  transition: "0.3s",
};
