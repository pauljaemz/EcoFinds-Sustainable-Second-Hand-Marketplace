import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MyListings() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", category: "", price: "", image: "" });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("listings") || "[]");
    setProducts(stored);
    setFilteredProducts(stored);
  }, []);

  useEffect(() => {
    // Filter by search and category dynamically
    let temp = [...products];
    if (search) {
      temp = temp.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (categoryFilter) {
      temp = temp.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase());
    }
    setFilteredProducts(temp);
  }, [search, categoryFilter, products]);

  const handleDelete = (productId: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const updated = products.filter(p => p.id !== productId);
    localStorage.setItem("listings", JSON.stringify(updated));
    setProducts(updated);
  };

  const startEditing = (product: any) => {
    setEditingProductId(product.id);
    setEditForm({
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price.toString(),
      image: product.image || "",
    });
  };

  const saveEdit = () => {
    if (editingProductId === null) return;
    const updatedProducts = products.map(p =>
      p.id === editingProductId ? { ...p, ...editForm, price: Number(editForm.price) } : p
    );
    localStorage.setItem("listings", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setEditingProductId(null);
    alert("Product updated!");
  };

  // Detail view
  if (id) {
    const product = products.find(p => p.id === Number(id));
    if (!product) return <div className="container">Product not found.</div>;

    if (editingProductId === product.id) {
      return (
        <div className="container">
          <h2>Edit Product</h2>
          <input value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} placeholder="Title" />
          <input value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })} placeholder="Category" />
          <input type="number" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} placeholder="Price" />
          <textarea value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} placeholder="Description" />
          <input value={editForm.image} onChange={e => setEditForm({ ...editForm, image: e.target.value })} placeholder="Image URL" />
          <div style={{ marginTop: 8 }}>
            <button onClick={saveEdit} style={{ background: "#1abc9c", color: "white", marginRight: 8 }}>Save</button>
            <button onClick={() => setEditingProductId(null)} style={{ background: "#ccc", color: "black" }}>Cancel</button>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <Link to="/my-listings">&larr; Back to listings</Link>
        <h2>{product.title}</h2>
        {product.image && <img src={product.image} alt={product.title} style={{ width: 300, borderRadius: 8 }} />}
        <p>{product.description}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        {user?.id === product.ownerId && (
          <div style={{ marginTop: 8 }}>
            <button onClick={() => startEditing(product)} style={{ background: "#0070f3", color: "white", marginRight: 8 }}>Edit</button>
            <button onClick={() => handleDelete(product.id)} style={{ background: "#e74c3c", color: "white" }}>Delete</button>
          </div>
        )}
      </div>
    );
  }

  // Feed view
  return (
    <div className="container">
      <h2>Product Listings</h2>

      {/* Search & Category Filter */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
        />
        {/* Unique category buttons */}
        {Array.from(new Set(products.map(p => p.category))).map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(categoryFilter === cat ? "" : cat)}
            style={{
              padding: "6px 12px",
              borderRadius: 4,
              border: categoryFilter === cat ? "2px solid #0070f3" : "1px solid #ccc",
              background: categoryFilter === cat ? "#0070f3" : "white",
              color: categoryFilter === cat ? "white" : "black",
              cursor: "pointer"
            }}
          >
            {cat}
          </button>
        ))}
        {categoryFilter && <button onClick={() => setCategoryFilter("")} style={{ padding: "6px 12px", borderRadius: 4, border: "1px solid #ccc" }}>Clear Filter</button>}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {filteredProducts.length === 0 ? (
          <p>No products match your search/filter.</p>
        ) : (
          filteredProducts.map(p => (
            <div key={p.id} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px", width: 250 }}>
              {p.image && <img src={p.image} alt={p.title} style={{ width: "100%", borderRadius: "4px" }} />}
              <h3>{p.title}</h3>
              <p>{p.description.substring(0, 80)}...</p>
              <p><strong>Category:</strong> {p.category}</p>
              <p><strong>Price:</strong> ${p.price}</p>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <Link to={`/my-listings/${p.id}`}>
                  <button style={{ background: "#0070f3", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px" }}>View</button>
                </Link>
                {user?.id === p.ownerId && (
                  <>
                    <button onClick={() => startEditing(p)} style={{ background: "#1abc9c", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px" }}>Edit</button>
                    <button onClick={() => handleDelete(p.id)} style={{ background: "#e74c3c", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px" }}>Delete</button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
