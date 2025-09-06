import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");

  if (!user) return <div className="container">Please log in.</div>;

  const handleUpdate = () => {
    updateProfile({ name });
    alert("Profile updated!");
  };

  return (
    <div className="container">
      <h2>Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <input value={name} onChange={e => setName(e.target.value)} />
      <div style={{ marginTop: 8 }}>
        <button onClick={handleUpdate} style={{ background: "#0070f3", color: "white", marginRight: 8 }}>Update Name</button>
        <button onClick={logout} style={{ background: "#e74c3c", color: "white" }}>Logout</button>
      </div>
    </div>
  );
}
