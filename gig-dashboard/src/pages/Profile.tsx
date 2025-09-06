import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, updateProfile } = useAuth();
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
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Full Name"
        style={{ marginBottom: "10px", display: "block", padding: "6px" }}
      />
      <button
        style={{ background: "#0070f3", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px" }}
        onClick={handleUpdate}
      >
        Update Name
      </button>
    </div>
  );
}
