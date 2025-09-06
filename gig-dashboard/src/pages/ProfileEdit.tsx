import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProfileEdit(): JSX.Element {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: user?.name ?? "", email: user?.email ?? "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      updateProfile({ name: form.name });
      setMsg("Profile updated");
    } catch (err: any) {
      setMsg(err?.message ?? "Failed to update");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3>Edit profile</h3>
      <form className="form" onSubmit={onSubmit} style={{ maxWidth: 420 }}>
        <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
        <input required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
        <button className="btn" type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
        {msg && <div className="muted" style={{ marginTop: 8 }}>{msg}</div>}
      </form>
    </div>
  );
}
