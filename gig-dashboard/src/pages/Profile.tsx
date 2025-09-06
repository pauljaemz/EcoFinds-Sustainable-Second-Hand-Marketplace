import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");

  if (!user) return <div className="container">Please log in.</div>;

  const handleUpdate = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: any) => u.id === user.id ? { ...u, name } : u);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify({ ...user, name }));
    alert("Profile updated!");
  };

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: 24, background: "white", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <h2 style={{ color: "#16a085", marginBottom: 16 }}>Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ width: "100%", padding: 8, marginTop: 8, marginBottom: 16, borderRadius: 6, border: "1px solid #ccc" }}
      />

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={handleUpdate} style={btnPrimary}>Update Name</button>
        <button onClick={logout} style={{ ...btnPrimary, background: "#e74c3c" }}>Logout</button>
      </div>
    </div>
  );
}

const btnPrimary = {
  padding: "8px 16px",
  borderRadius: 6,
  border: "none",
  background: "#1abc9c",
  color: "white",
  cursor: "pointer",
  transition: "0.3s",
};
