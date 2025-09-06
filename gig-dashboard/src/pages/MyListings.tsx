import React, { useState, useMemo } from "react";
import { useProducts, ProductForm } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import ProductDetail from "./ProductDetail";

export default function MyListings() {
  const { user } = useAuth();
  const { products, addProduct, deleteProduct } = useProducts();

  const myProducts = user?.role === "seller"
    ? products.filter(p => p.sellerId === user.id)
    : products;

  const [selected, setSelected] = useState<number | null>(null);
  const [form, setForm] = useState<ProductForm>({ title: "", description: "", category: "", price: 0, image: "" });
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
    return ["All", ...cats];
  }, [products]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "price" ? Number(value) : value }));
  };

  const handleAdd = () => {
    try {
      addProduct(form);
      setForm({ title: "", description: "", category: "", price: 0, image: "" });
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Filter products dynamically
  const displayedProducts = useMemo(() => {
    return myProducts.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (filterCategory === "All" || p.category === filterCategory)
    );
  }, [myProducts, search, filterCategory]);

  return (
    <div className="container">
      {/* Seller: Add Product Form */}
      {user?.role === "seller" && (
        <div className="card">
          <h3>Add New Product</h3>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />
          <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <button style={{ background: "#1abc9c", color: "white" }} onClick={handleAdd}>Add Product</button>
        </div>
      )}

      {/* Buyer: Search + Filter */}
      {user?.role === "buyer" && (
        <div className="card center">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
            {categories.map(cat => (
              <button
                key={cat}
                style={{
                  background: filterCategory === cat ? "#0070f3" : "#ccc",
                  color: filterCategory === cat ? "white" : "#333"
                }}
                onClick={() => setFilterCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="products-grid">
        {displayedProducts.map(p => (
          <div key={p.id} className="card product-card">
            {p.image && <img src={p.image} alt={p.title} />}
            <h4>{p.title}</h4>
            <p>{p.category}</p>
            <p>${p.price}</p>
            <p>{p.description}</p>
            <div style={{ display: "flex", gap: "6px" }}>
              {user?.role === "seller" && <button style={{ background: "#e74c3c", color: "white" }} onClick={() => deleteProduct(p.id)}>Delete</button>}
              <button style={{ background: "#3498db", color: "white" }} onClick={() => setSelected(p.id)}>View</button>
            </div>
          </div>
        ))}
      </div>

      {selected && <ProductDetail product={products.find(p => p.id === selected)!} onClose={() => setSelected(null)} />}
    </div>
  );
}
