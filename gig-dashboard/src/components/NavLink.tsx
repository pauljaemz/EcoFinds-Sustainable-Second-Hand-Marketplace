import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const loc = useLocation()
  const active = loc.pathname === to || loc.pathname.startsWith(to + '/')
  return (
    <Link to={to} className={`navlink ${active ? 'active' : ''}`}>
      {children}
    </Link>
  )
}
