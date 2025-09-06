import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export type Listing = {
  id: number;
  title: string;
  description: string;
  ownerId: number;
};

export default function Listings() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const storedListings = JSON.parse(localStorage.getItem("listings") || "[]");
    setListings(storedListings);
  }, []);

  return (
    <div className="container">
      <h2>Listings</h2>
      {listings.length === 0 && <p>No listings available.</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {listings.map(l => (
          <div key={l.id} style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
            <h3>{l.title}</h3>
            <p>{l.description}</p>
            {l.ownerId === user?.id && <small>(Your listing)</small>}
          </div>
        ))}
      </div>
    </div>
  );
}
