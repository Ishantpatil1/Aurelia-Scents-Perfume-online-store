import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar(){
  const { user, logout } = useAuth()
  const { items } = useCart()
  const [open, setOpen] = useState(false)
  const [sticky, setSticky] = useState(false)

  useEffect(()=>{
    function onScroll(){
      setSticky(window.scrollY > 30)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])

  const location = useLocation()
  useEffect(()=>{
    // close mobile nav when route changes
    setOpen(false)
  },[location.pathname])

  // prevent body scroll when mobile nav is open
  useEffect(()=>{
    if(open){
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return ()=> { document.body.style.overflow = '' }
  },[open])

  return (
    <header className={`lux-header ${sticky ? 'is-sticky' : ''}`}>
      <div className="lux-inner container">
        <div className="lux-left">
          <Link to="/" className="lux-logo" aria-label="Aurelia Scents">Aurelia<span className="lux-logo-accent">Scents</span></Link>
          <div className="lux-sub">Haute Parfumerie • Bespoke Editions</div>
        </div>

        <nav className={`lux-nav ${open ? 'open' : ''}`} aria-label="Primary navigation">
          <Link to="/" className="lux-link" onClick={()=>setOpen(false)}>Home</Link>
          <Link to="/collections" className="lux-link" onClick={()=>setOpen(false)}>Collections</Link>
          <Link to="/best-sellers" className="lux-link" onClick={()=>setOpen(false)}>Best Sellers</Link>
          <Link to="/exclusive" className="lux-link" onClick={()=>setOpen(false)}>Exclusive</Link>
          <Link to="/about" className="lux-link" onClick={()=>setOpen(false)}>About</Link>
          <Link to="/contact" className="lux-link" onClick={()=>setOpen(false)}>Contact</Link>
          
        </nav>

        <div className="lux-tools">
          {/* <button className="icon-btn" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.4"/></svg>
          </button>
          <button className="icon-btn" aria-label="Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button> */}

          <Link to="/cart" className="icon-btn cart" aria-label="Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6h15l-1.5 9h-12L6 6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
            <span className="mini-badge">{items.length}</span>
          </Link>

          {user ? (
            <div className="user-wrap">
              <span className="user-name">{user.name || (user.email ? user.email.split('@')[0] : 'User')}</span>
              <button className="btn ghost" onClick={logout}>Logout</button>
            </div>
          ) : (
            <div className="auth-wrap">
              <Link to="/login" className="btn ghost">Login</Link>
              <Link to="/register" className="btn">Register</Link>
            </div>
          )}

          <button className={`hamburger ${open ? 'active' : ''}`} onClick={()=>setOpen(s=>!s)} aria-label="Menu" aria-expanded={open}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile bottom menu bar (glassy) */}
      <div className="mobile-bar" role="navigation" aria-label="Mobile menu">
        <Link to="/" className="mb-link" onClick={()=>setOpen(false)} aria-label="Home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>Home</span>
        </Link>

        <Link to="/collections" className="mb-link" onClick={()=>setOpen(false)} aria-label="Collections">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/></svg>
          <span>Collections</span>
        </Link>

        <Link to="/cart" className="mb-link mb-cart" onClick={()=>setOpen(false)} aria-label="Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 6h15l-1.5 9h-12L6 6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
          <span>Cart</span>
          <span className="mb-badge">{items.length}</span>
        </Link>

        { user ? (
          <Link to="/profile" className="mb-link" onClick={()=>setOpen(false)} aria-label="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Account</span>
          </Link>
        ) : (
          <Link to="/login" className="mb-link" onClick={()=>setOpen(false)} aria-label="Login">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 17l5-5-5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Sign In</span>
          </Link>
        ) }
      </div>
    </header>
  )
}
