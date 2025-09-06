import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return <div className="container">Please log in.</div>;

  return (
    <div className="container center" style={{ textAlign: "center", marginTop: 40 }}>
      <h2>Welcome, {user.name}!</h2>
      <div className="dashboard-links" style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 20 }}>
        <Link to="/profile">
          <button style={{ background: "#0070f3", color: "white", padding: "10px 20px", border: "none", borderRadius: 6 }}>
            Profile
          </button>
        </Link>
        <Link to="/new-listing">
          <button style={{ background: "#1abc9c", color: "white", padding: "10px 20px", border: "none", borderRadius: 6 }}>
            Post Product
          </button>
        </Link>
        <Link to="/my-listings">
          <button style={{ background: "#3498db", color: "white", padding: "10px 20px", border: "none", borderRadius: 6 }}>
            View Listings
          </button>
        </Link>
      </div>
    </div>
  );
}
