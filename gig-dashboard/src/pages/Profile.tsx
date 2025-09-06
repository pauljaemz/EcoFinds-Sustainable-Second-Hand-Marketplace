import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");

  if (!user) return <div className="container">Please log in.</div>;

  const handleUpdate = () => {
    // For simplicity just update locally
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: any) => u.id === user.id ? { ...u, name } : u);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify({ ...user, name }));
    alert("Profile updated!");
  };

  return (
    <div className="container">
      <h2>Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button style={{ background: "#0070f3", color: "white" }} onClick={handleUpdate}>Update Name</button>
    </div>
  );
}
