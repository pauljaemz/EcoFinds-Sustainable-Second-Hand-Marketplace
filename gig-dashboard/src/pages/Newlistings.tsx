import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function NewListing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const listings = JSON.parse(localStorage.getItem("listings") || "[]");
    const newProduct = {
      id: Date.now(),
      title,
      description,
      category,
      price: Number(price),
      image,
      ownerId: user.id,
    };
    listings.push(newProduct);
    localStorage.setItem("listings", JSON.stringify(listings));

    setTitle(""); setDescription(""); setCategory(""); setPrice(""); setImage("");
    alert("Product added!");
    navigate("/my-listings");
  };

  return (
    <div className="container" style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Post New Product</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <input type="text" placeholder="Image URL (optional)" value={image} onChange={e => setImage(e.target.value)} />
        <button type="submit" style={{ background: "#1abc9c", color: "white", padding: "10px 0", border: "none", borderRadius: 6 }}>
          Add Product
        </button>
        <Link to="/my-listings" style={{ textAlign: "center", marginTop: 8 }}>Back to Listings</Link>
      </form>
    </div>
  );
}

