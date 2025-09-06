import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function NewListing() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const listings = JSON.parse(localStorage.getItem("listings") || "[]");
    const newListing = { id: Date.now(), title, description, ownerId: user.id };
    listings.push(newListing);
    localStorage.setItem("listings", JSON.stringify(listings));

    setTitle("");
    setDescription("");
    alert("Listing added!");
  };

  return (
    <div className="container">
      <h2>New Listing</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <button type="submit" style={{ background: "#1abc9c", color: "white" }}>Add Listing</button>
      </form>
    </div>
  );
}
