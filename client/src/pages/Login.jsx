import React, { useState } from 'react'
import './Register.css'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const auth = useAuth()
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    setError(null)
    setLoading(true)
    try{
      await auth.login(email, password)
      setLoading(false)
      navigate('/')
    }catch(err){
      setLoading(false)
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className="register-page bg-animated">
      <div className="bg-layers">
        <div className="velvet" />
        <div className="mist" />
        <div className="glints" />
        <div className="particles" />
      </div>

      <main className="register-inner container">
        <motion.section className="glass-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2,0.8,0.2,1] }}
        >
          <header className="card-head">
            <h1 className="title">Welcome Back</h1>
            <p className="tagline">Enter your world of timeless fragrances.</p>
          </header>

          <form className="reg-form" onSubmit={submit}>
            {error && <div className="form-error">{error}</div>}

            <label className="field">
              <span className="label">Email</span>
              <div className="input-wrap">
                <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="hello@domain.com" required />
              </div>
            </label>

            <label className="field">
              <span className="label">Password <Link to="/forgot" className="forgot">Forgot?</Link></span>
              <div className="input-wrap">
                <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11V8a5 5 0 0110 0v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your password" required />
              </div>
            </label>

            <div className="actions">
              <button className="btn-cta" type="submit" disabled={loading} aria-busy={loading}>
                <span className="serif">{loading ? 'Signing in…' : 'Login'}</span>
                <span className="btn-shimmer" aria-hidden />
              </button>
            </div>

            <div className="below">
              <p className="muted">Don’t have an account? <Link to="/register" className="create-link">Create one</Link></p>
            </div>
          </form>
        </motion.section>
      </main>
    </div>
  )
}

