import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import type { AccountType } from '../types.d'

export default function Login(): JSX.Element {
  const { login } = useAuth()
  const nav = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({
    email: '',
    password: '',
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
    setLoading(true)
    try {
      await login(form)
      nav('/dashboard')
    } catch (e: any) {
      setErr(e?.message ?? 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="card">
        <h2>Sign in as a {form.accountType === 'buyer' ? 'Buyer' : 'Seller'}</h2>

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
          {err && <div className="error">{err}</div>}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <div className="muted">
          New here? <Link to="/signup" state={{ accountType: form.accountType }}>Create an account</Link>
        </div>
      </div>
    </div>
  )
}
