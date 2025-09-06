import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavLink from '../components/NavLink'
import { useAuth } from '../auth/AuthContext'
import ProfileEdit from './ProfileEdit'

function Overview() {
  return (
    <div>
      <h3>Overview</h3>
      <p>Welcome to your gig dashboard — quick stats would appear here.</p>
    </div>
  )
}

function Gigs() {
  return (
    <div>
      <h3>Gigs</h3>
      <p>List of gigs (placeholder)</p>
    </div>
  )
}

function Settings() {
  return (
    <div>
      <h3>Settings</h3>
      <p>Account settings (placeholder)</p>
    </div>
  )
}

export default function Dashboard(): JSX.Element {
  const { user, logout } = useAuth()
  const nav = useNavigate()

  function handleLogout() {
    logout()
    nav('/login')
  }

  // Simple path-driven content (no nested router inside dashboard for simplicity).
  const pathname = window.location.pathname

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <div className="profile-mini">
          <div className="avatar">{(user?.name || 'U')[0]}</div>
          <div>
            <div className="name">{user?.name}</div>
            <div className="email">{user?.email}</div>
          </div>
        </div>

        <nav className="side-nav">
          <NavLink to="/dashboard">Overview</NavLink>
          <NavLink to="/dashboard/profile">Profile</NavLink>
          <NavLink to="/dashboard/gigs">Gigs</NavLink>
          <NavLink to="/dashboard/settings">Settings</NavLink>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <button className="btn-outline" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="main-area">
        {pathname === '/dashboard' && <Overview />}
        {pathname.startsWith('/dashboard/gigs') && <Gigs />}
        {pathname.startsWith('/dashboard/settings') && <Settings />}
        {pathname.startsWith('/dashboard/profile') && <ProfileEdit />}
        {/* Outlet reserved if you later embed nested routes */}
        <Outlet />
      </main>
    </div>
  )
}
