import React, { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import type { AccountType } from '../types.d'

export default function ProfileEdit(): JSX.Element {
  const { user, updateProfile } = useAuth()
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    accountType: user?.accountType ?? 'buyer' as AccountType
  })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    try {
      await updateProfile(form)
      setMsg('Profile updated')
    } catch (err: any) {
      setMsg(err?.message ?? 'Failed to update')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h3>Edit profile</h3>
      <form className="form" onSubmit={onSubmit} style={{ maxWidth: 420 }}>
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
        <input required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />

        <div className="account-type-selection">
          <p>Account Type:</p>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="accountType"
                value="buyer"
                checked={form.accountType === 'buyer'}
                onChange={() => setForm({ ...form, accountType: 'buyer' })}
              />
              Buyer - I want to purchase items
            </label>
            <label>
              <input
                type="radio"
                name="accountType"
                value="seller"
                checked={form.accountType === 'seller'}
                onChange={() => setForm({ ...form, accountType: 'seller' })}
              />
              Seller - I want to sell items
            </label>
          </div>
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
        {msg && <div className="muted" style={{ marginTop: 8 }}>{msg}</div>}
      </form>
    </div>
  )
}
