import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import type { AccountType } from '../types.d'

export default function Signup(): JSX.Element {
  const { signup } = useAuth()
  const nav = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: (location.state?.accountType as AccountType) || 'buyer'
  })
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  // Single reusable function to handle form input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  // Function to handle account type selection
  function handleAccountTypeChange(accountType: AccountType) {
    setForm({ ...form, accountType })
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')

    // Validate password confirmation
    if (form.password !== form.confirmPassword) {
      setErr('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
        accountType: form.accountType
      })
      nav('/dashboard')
    } catch (e: any) {
      setErr(e?.message ?? 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="card">
        <h2>
          {form.accountType === 'buyer' ? 'Create a Buyer Account' : 'Create a Seller Account'}
        </h2>

        {/* Account Type Toggle Buttons */}
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <button
            type="button"
            className={form.accountType === 'buyer' ? 'btn' : 'btn-outline'}
            onClick={() => handleAccountTypeChange('buyer')}
            style={{ marginRight: '10px' }}
          >
            Buyer
          </button>
          <button
            type="button"
            className={form.accountType === 'seller' ? 'btn' : 'btn-outline'}
            onClick={() => handleAccountTypeChange('seller')}
          >
            Seller
          </button>
        </div>

        <form onSubmit={onSubmit} className="form">
          <input
            required
            name="name"
            placeholder="Display name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            required
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            required
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <input
            required
            name="confirmPassword"
            placeholder="Confirm password"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          {err && <div className="error">{err}</div>}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Creating…' : 'Sign up'}
          </button>
        </form>
        <div className="muted">
          Already have an account? <Link to="/login" state={{ accountType: form.accountType }}>Login</Link>
        </div>
      </div>
    </div>
  )
}
