import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function MyListings() {
  const { user } = useAuth();

  // Product & view states
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"feed" | "cart" | "purchases">("feed");

  // Search & filter
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // New listing form states
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch data from localStorage
  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("listings") || "[]"));
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    setPurchases(JSON.parse(localStorage.getItem("purchases") || "[]"));
  }, []);

  // Sync localStorage on changes
  useEffect(() => {
    localStorage.setItem("listings", JSON.stringify(products));
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("purchases", JSON.stringify(purchases));
  }, [products, cart, purchases]);

  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setProducts(products.filter(p => p.id !== id));
  };

  const addToCart = (product: any) => {
    if (cart.find(p => p.id === product.id)) return alert("Already in cart!");
    setCart([...cart, product]);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(p => p.id !== id));
  };

  const checkout = () => {
    if (cart.length === 0) return;
    setPurchases([...purchases, ...cart]);
    setCart([]);
    alert("Checkout successful!");
  };

  const filteredProducts = products.filter(p =>
    (p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())) &&
    (categoryFilter ? p.category === categoryFilter : true)
  );

  const categories = Array.from(new Set(products.map(p => p.category)));

  // Styles
  const productCardStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    borderRadius: 12,
    padding: 16,
    width: 260,
    background: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  const btnPrimary = { padding: "8px 16px", borderRadius: 6, border: "none", background: "#1abc9c", color: "white", cursor: "pointer", transition: "0.3s" };
  const btnDanger = { ...btnPrimary, background: "#e74c3c" };
  const btnInfo = { ...btnPrimary, background: "#3498db" };
  const btnWarning = { ...btnPrimary, background: "#f39c12" };
  const inputStyle: React.CSSProperties = { padding: 8, borderRadius: 6, border: "1px solid #ccc", width: "100%", boxSizing: "border-box" };

  return (
    <div style={{ padding: 24 }}>
      {/* Mode Switch */}
      <div style={{ marginBottom: 16, display: "flex", gap: 12 }}>
        <button style={btnPrimary} onClick={() => setViewMode("feed")}>Product Feed</button>
        <button style={btnInfo} onClick={() => setViewMode("cart")}>Cart ({cart.length})</button>
        <button style={btnWarning} onClick={() => setViewMode("purchases")}>My Purchases</button>
      </div>

      {/* Feed View */}
      {viewMode === "feed" && (
        <>
          {/* Add New Listing Form */}
          {user && (
            <div style={{ marginBottom: 24, padding: 16, background: "white", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
              <h3 style={{ color: "#16a085", marginBottom: 12 }}>Add New Listing</h3>
              {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <input type="text" placeholder="Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} style={inputStyle} />
                <textarea placeholder="Description" value={newDescription} onChange={e => setNewDescription(e.target.value)} style={{ ...inputStyle, height: 80 }} />
                <input type="text" placeholder="Category" value={newCategory} onChange={e => setNewCategory(e.target.value)} style={inputStyle} />
                <input type="number" placeholder="Price" value={newPrice} onChange={e => setNewPrice(e.target.value)} style={inputStyle} min={0} />
                <input type="text" placeholder="Image URL (optional)" value={newImage} onChange={e => setNewImage(e.target.value)} style={inputStyle} />
                {newImage && <img src={newImage} alt="Preview" style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 6 }} />}
                <button style={btnPrimary} onClick={() => {
                  if (!newTitle || !newDescription) return alert("Title and description required");
                  const newProduct = { id: Date.now(), title: newTitle, description: newDescription, category: newCategory || "General", price: Number(newPrice) || 0, image: newImage || "https://via.placeholder.com/260x150?text=No+Image", ownerId: user.id };
                  setProducts([newProduct, ...products]);
                  setNewTitle(""); setNewDescription(""); setNewCategory(""); setNewPrice(""); setNewImage("");
                  setSuccessMsg("Product added successfully!");
                  setTimeout(() => setSuccessMsg(""), 3000);
                }}>Add Listing</button>
              </div>
            </div>
          )}

          {/* Search & Filter */}
          <div style={{ marginBottom: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: 8, flex: 1, borderRadius: 6, border: "1px solid #ccc" }} />
            {categories.map(c => (<button key={c} style={btnInfo} onClick={() => setCategoryFilter(c)}>{c}</button>))}
            {categoryFilter && <button style={btnPrimary} onClick={() => setCategoryFilter("")}>Clear Filter</button>}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {filteredProducts.length === 0 ? <p>No products match your search/filter.</p> : (
              filteredProducts.map(p => (
                <div key={p.id} style={productCardStyle} onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")} onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0px)")}>
                  {p.image && <img src={p.image} alt={p.title} style={{ width: "100%", borderRadius: 6, marginBottom: 8 }} />}
                  <h3>{p.title}</h3>
                  <p>{p.description.substring(0, 80)}...</p>
                  <p><strong>Category:</strong> {p.category}</p>
                  <p><strong>Price:</strong> ${p.price}</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                    {user?.id === p.ownerId && (
                      <button style={btnDanger} onClick={() => handleDelete(p.id)}>Delete</button>
                    )}
                    <button style={btnWarning} onClick={() => addToCart(p)}>Add to Cart</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Cart View */}
      {viewMode === "cart" && (
        <div>
          <h3 style={{ marginBottom: 16, color: "#16a085" }}>Cart</h3>
          {cart.length === 0 ? <p>Cart is empty.</p> : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              {cart.map(p => (
                <div key={p.id} style={productCardStyle}>
                  {p.image && <img src={p.image} alt={p.title} style={{ width: "100%", borderRadius: 6, marginBottom: 8 }} />}
                  <h4>{p.title}</h4>
                  <p>${p.price}</p>
                  <button style={btnDanger} onClick={() => removeFromCart(p.id)}>Remove</button>
                </div>
              ))}
            </div>
          )}
          {cart.length > 0 && <button style={{ ...btnPrimary, marginTop: 16 }} onClick={checkout}>Checkout</button>}
        </div>
      )}

      {/* My Purchases */}
      {viewMode === "purchases" && (
        <div>
          <h3 style={{ marginBottom: 16, color: "#16a085" }}>My Purchases</h3>
          {purchases.length === 0 ? <p>No purchases yet.</p> : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              {purchases.map(p => (
                <div key={p.id} style={productCardStyle}>
                  {p.image && <img src={p.image} alt={p.title} style={{ width: "100%", borderRadius: 6, marginBottom: 8 }} />}
                  <h4>{p.title}</h4>
                  <p>${p.price}</p>
                  <p><strong>Category:</strong> {p.category}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

