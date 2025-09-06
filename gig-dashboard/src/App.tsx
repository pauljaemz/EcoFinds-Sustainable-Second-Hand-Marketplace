import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Listings from "./pages/MyListings";
import NewListing from "./pages/Newlistings";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, logout } = useAuth();

  return (
    <div>
      {/* Navigation */}
      <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", borderBottom: "1px solid #ccc" }}>
        <div>
          <Link to="/" style={{ textDecoration: "none", fontWeight: "bold" }}>Gig App</Link>
        </div>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: 10 }}>Hello, {user.name}</span>
              <button onClick={logout} style={{ background: "#e74c3c", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px" }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"><button style={{ marginRight: 8 }}>Login</button></Link>
              <Link to="/signup"><button>Signup</button></Link>
            </>
          )}
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="register/user" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/listings" element={user ? <Listings /> : <Navigate to="/login" />} />
        <Route path="/new-listing" element={user ? <NewListing /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
