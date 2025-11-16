import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

export default function Contact(){
  const [form, setForm] = useState({name:'',email:'',phone:'',subject:'',message:''})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const onChange = (e)=> setForm({...form,[e.target.name]: e.target.value})

  const onSubmit = async (e)=>{
    e.preventDefault()
    setSending(true)
    // simulate send; replace with real API call to backend /api/contact if available
    try{
      await new Promise(r=>setTimeout(r,900))
      setSent(true)
      setForm({name:'',email:'',phone:'',subject:'',message:''})
    }catch(err){
      console.error(err)
      alert('Unable to send message — please try again later.')
    }finally{setSending(false)}
  }

  const fade = { hidden:{opacity:0,y:12}, show:{opacity:1,y:0} }

  return (
    <div className="contact-page">
      <div className="contact-bg" aria-hidden />
      <div className="contact-particles" aria-hidden>
        <span></span><span></span><span></span>
      </div>

      <header className="contact-hero">
        <motion.h1 initial="hidden" animate="show" variants={fade} className="contact-hero-title">Get In Touch</motion.h1>
        <motion.p initial="hidden" animate="show" variants={fade} className="contact-hero-sub">For bespoke enquiries, private consultations, or atelier appointments — our team is here to assist.</motion.p>
      </header>

      <main className="contact-main">
        <motion.form className="contact-form" onSubmit={onSubmit} initial="hidden" animate="show" variants={{show:{transition:{staggerChildren:0.08}}}}>
          <motion.div className="form-grid" variants={fade}>
            <label className="input-wrap">
              <span className="label">Full Name</span>
              <div className="input-with-icon">
                <svg className="icon" viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.418 0-8 1.79-8 4v1h16v-1c0-2.21-3.582-4-8-4z" stroke="currentColor" strokeWidth="0.9"/></svg>
                <input name="name" value={form.name} onChange={onChange} required placeholder="" />
              </div>
            </label>

            <label className="input-wrap">
              <span className="label">Email</span>
              <div className="input-with-icon">
                <svg className="icon" viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M3 6.5v11A2.5 2.5 0 005.5 20h13a2.5 2.5 0 002.5-2.5v-11" stroke="currentColor" strokeWidth="0.9"/></svg>
                <input name="email" value={form.email} onChange={onChange} type="email" required placeholder="" />
              </div>
            </label>

            <label className="input-wrap">
              <span className="label">Phone</span>
              <div className="input-with-icon">
                <svg className="icon" viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 01.08 4.18 2 2 0 012 2h3a2 2 0 012 1.72c.12.83.36 1.64.7 2.4a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006 6l1.68-1.68a2 2 0 012.11-.45c.76.34 1.57.58 2.4.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="0.9"/></svg>
                <input name="phone" value={form.phone} onChange={onChange} placeholder="" />
              </div>
            </label>

            <label className="input-wrap">
              <span className="label">Subject</span>
              <div className="input-with-icon">
                <svg className="icon" viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="0.9"/></svg>
                <input name="subject" value={form.subject} onChange={onChange} placeholder="" />
              </div>
            </label>
          </motion.div>

          <motion.label className="input-wrap message" variants={fade}>
            <span className="label">Message</span>
            <div className="textarea-with-icon">
              <textarea name="message" value={form.message} onChange={onChange} rows={6} required placeholder="Tell us about your enquiry..." />
            </div>
          </motion.label>

          <motion.div className="form-actions" variants={fade}>
            <button className="send-btn" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send Message'}</button>
            <div className="contact-mini">
              <div className="info-card">
                <h4>Contact</h4>
                <p className="muted">Email: <a href="mailto:support@aureliascents.com">support@aureliascents.com</a></p>
                <p className="muted">Phone: +91 XXX-XXX-XXXX</p>
                <p className="muted">Address: Luxury HQ — Mumbai / Paris / Dubai</p>
              </div>
            </div>
          </motion.div>

          {sent && <div className="sent-banner">Thank you — your message has been received. We will reply shortly.</div>}
        </motion.form>

      </main>
    </div>
  )
}
