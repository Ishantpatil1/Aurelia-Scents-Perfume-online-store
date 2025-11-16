import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './Footer.css'

export default function Footer(){
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const submit = async (e)=>{
    e.preventDefault()
    if (!email) return
    setSending(true)
    // simulate subscription
    await new Promise(r=>setTimeout(r,900))
    setSubscribed(true)
    setEmail('')
    setSending(false)
  }

  return (
    <footer className="lux-footer">
      <div className="footer-bg" aria-hidden />
      <div className="footer-particles" aria-hidden>
        <span></span><span></span><span></span><span></span>
      </div>

      <motion.div className="footer-inner" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:0.8}}>
        <div className="footer-grid">
          <div className="col brand">
            <h2 className="brand-title">Aurelia Scents</h2>
            <div className="brand-underline" />
            <p className="tag">Crafting Timeless Fragrance Experiences.</p>
            <div className="socials">
              <a aria-label="Instagram" className="icon" href="#"><svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" stroke="currentColor" strokeWidth="0.9"/></svg></a>
              <a aria-label="Facebook" className="icon" href="#"><svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M15 3h3v4h-3v10h-4V7H9V3h3V1.8C12 0.8 12.6 0 14 0h1v3z" stroke="currentColor" strokeWidth="0.9"/></svg></a>
              <a aria-label="X" className="icon" href="#"><svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M3 3l18 18M21 3L3 21" stroke="currentColor" strokeWidth="0.9"/></svg></a>
            </div>
          </div>

          <div className="col links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/collections">Shop</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="col support">
            <h4>Customer Support</h4>
            <ul>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Track Order</a></li>
            </ul>
          </div>

          <div className="col contact">
            <h4>Contact</h4>
            <p className="contact-line">Email: <a href="mailto:support@aureliascents.com">support@aureliascents.com</a></p>
            <p className="contact-line">Phone: <a href="tel:+911234567890">+91 1234-567-890</a></p>
            <p className="contact-line">Address: Luxury HQ — Mumbai / Paris / Dubai</p>
          </div>

          <div className="col newsletter">
            <h4>Join Our Luxury Circle</h4>
            <p className="sub">Exclusive releases, offers & fragrance stories.</p>
            <form className="subscribe" onSubmit={submit}>
              <div className="glass-input">
                <input placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} aria-label="email" />
                <button className="sub-btn" type="submit" disabled={sending}>{sending ? '…' : 'Subscribe'}</button>
              </div>
              {subscribed && <div className="sub-success">Thank you — check your inbox.</div>}
            </form>
          </div>
        </div>
      </motion.div>

      <div className="copyright-bar">
        <div className="inner">© 2025 Aurelia Scents. All Rights Reserved.</div>
      </div>
    </footer>
  )
}
