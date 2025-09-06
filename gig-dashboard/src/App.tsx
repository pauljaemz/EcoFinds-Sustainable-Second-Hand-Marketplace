import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import MyListings from "./pages/MyListings";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav>
        <div>
          <Link to="/">Gig App</Link>
        </div>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: 10 }}>Hello, {user.name}</span>
              <button onClick={logout} style={{ background: "#e74c3c", color: "white" }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login"><button>Login</button></Link>
              <Link to="/signup"><button>Signup</button></Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/my-listings" element={user ? <MyListings /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
