import React, { useState } from 'react'
import './Register.css'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register(){
  const [form, setForm] = useState({name:'', email:'', phone:'', password:'', confirm:'', address:''})
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const auth = useAuth()
  const [error, setError] = useState(null)

  function handleChange(e){
    setForm(f=>({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e){
    e.preventDefault()
    setError(null)
    if (!form.name || !form.email || !form.password) {
      setError('Please complete required fields')
      return
    }
    if (form.password !== form.confirm){
      setError('Passwords do not match')
      return
    }
    setSubmitting(true)
    // call real auth register from context
    auth.register(form.name, form.email, form.password)
      .then(()=>{
        setSubmitting(false)
        navigate('/login')
      })
      .catch(err=>{
        setSubmitting(false)
        setError(err.message || 'Registration failed')
      })
  }

  const particles = new Array(12).fill(0)

  return (
    <div className="register-page bg-animated">

      <div className="bg-layers">
        <div className="velvet" />
        <div className="mist" />
        <div className="glints" />
        <div className="particles">
          {particles.map((_,i)=> <span className={`particle p${i+1}`} key={i} />)}
        </div>
      </div>

      <main className="register-inner container">
        <motion.section className="glass-card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2,0.8,0.2,1] }}
        >
          <header className="card-head">
            <h1 className="title">Create Your Account</h1>
            <p className="tagline">Step into a world of timeless fragrances and refined elegance.</p>
          </header>

          <form className="reg-form" onSubmit={handleSubmit}>
            <div className="row two">
              <label className="field">
                <span className="label">Full Name</span>
                <div className="input-wrap">
                  <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Olivia Laurent" required />
                </div>
              </label>

              <label className="field">
                <span className="label">Email</span>
                <div className="input-wrap">
                  <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="hello@domain.com" required />
                </div>
              </label>
            </div>

            <div className="row two">
              <label className="field">
                <span className="label">Phone</span>
                <div className="input-wrap">
                  <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 16.92V21a1 1 0 01-1.11 1 19 19 0 01-8.63-3.07 19 19 0 01-6-6A19 19 0 012 3.11 1 1 0 013 2h4.09a1 1 0 01.98.82c.12.9.37 1.77.73 2.59a1 1 0 01-.24 1.05L7.7 8.7a15 15 0 006 6l1.24-1.24a1 1 0 011.05-.24c.82.36 1.69.61 2.59.73a1 1 0 01.82.98V22z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="Optional" />
                </div>
              </label>

              <label className="field">
                <span className="label">Address (optional)</span>
                <div className="input-wrap">
                  <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <input name="address" value={form.address} onChange={handleChange} placeholder="e.g. 12 Rue de Rivoli" />
                </div>
              </label>
            </div>

            <div className="row two">
              <label className="field">
                <span className="label">Password</span>
                <div className="input-wrap">
                  <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11V8a5 5 0 0110 0v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Choose a strong password" required />
                </div>
              </label>

              <label className="field">
                <span className="label">Confirm Password</span>
                <div className="input-wrap">
                  <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <input name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="Repeat password" required />
                </div>
              </label>
            </div>

            <div className="actions">
              <button className="btn-cta" type="submit" disabled={submitting}>
                <span className="serif">Create Account</span>
              </button>
            </div>
            <div className="below">
              <p className="muted">Already have an account? <Link to="/login" className="create-link">Login</Link></p>
            </div>
          </form>
        </motion.section>
      </main>
    </div>
  )
}

