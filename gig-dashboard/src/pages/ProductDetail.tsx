import React, { useState } from "react";
import { Product, useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";

export default function ProductDetail({ product, onClose }: { product: Product; onClose: () => void }) {
  const { user } = useAuth();
  const { updateProduct } = useProducts();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...product });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "price" ? Number(value) : value }));
  };

  const handleSave = () => {
    updateProduct(product.id, form);
    setEditing(false);
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "white", borderRadius: 6, padding: 20, width: "90%", maxWidth: 400 }}>
        <button onClick={onClose} style={{ float: "right", background: "transparent", border: "none", fontSize: 18 }}>✕</button>
        {editing ? (
          <>
            <input name="title" value={form.title} onChange={handleChange} />
            <input name="category" value={form.category} onChange={handleChange} />
            <input name="price" type="number" value={form.price} onChange={handleChange} />
            <input name="image" value={form.image} onChange={handleChange} />
            <textarea name="description" value={form.description} onChange={handleChange} />
            <button style={{ background: "#1abc9c", color: "white" }} onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <h3>{product.title}</h3>
            <p>{product.category}</p>
            <p>${product.price}</p>
            {product.image && <img src={product.image} alt={product.title} style={{ width: "100%", borderRadius: 4, marginBottom: 8 }} />}
            <p>{product.description}</p>
            {user?.role === "seller" && user.id === product.sellerId && <button style={{ background: "#3498db", color: "white" }} onClick={() => setEditing(true)}>Edit</button>}
          </>
        )}
      </div>
    </div>
  );
}
