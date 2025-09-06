import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return <div className="container">Please log in.</div>;

  return (
    <div className="container center">
      <h2>Welcome, {user.name}!</h2>
      <div className="dashboard-links">
        <Link to="/profile"><button style={{ background: "#0070f3", color: "white" }}>Profile</button></Link>
        {user.role === "seller" && <Link to="/my-listings"><button style={{ background: "#1abc9c", color: "white" }}>My Listings</button></Link>}
        {user.role === "buyer" && <Link to="/my-listings"><button style={{ background: "#3498db", color: "white" }}>Browse Listings</button></Link>}
      </div>
    </div>
  );
}
