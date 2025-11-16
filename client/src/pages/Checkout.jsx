import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Checkout.css'

export default function Checkout(){
  const { items, subtotal, checkout } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [billing, setBilling] = useState({name:'',email:'',phone:'',address:'',city:'',state:'',pincode:'',country:''})
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [payment, setPayment] = useState({cardName:'',cardNumber:'',expiry:'',cvv:'',method:'card'})
  const [placing, setPlacing] = useState(false)
  const [placed, setPlaced] = useState(false)

  const fadeUp = { hidden:{opacity:0,y:12}, show:{opacity:1,y:0} }

  const placeOrder = async (e)=>{
    e?.preventDefault()
    if (!user){ navigate('/login'); return }
    setPlacing(true)
    try{
      // use cart checkout which contacts backend; it may clear cart on success
      const res = await checkout()
      setPlaced(true)
      // navigate to a confirmation page if available
      setTimeout(()=> navigate('/'), 1800)
    }catch(err){
      console.error(err)
      alert('Unable to complete order. Please try again.')
    }finally{ setPlacing(false) }
  }

  const shippingCost = subtotal() > 100 ? 0 : 9.99
  const tax = subtotal() * 0.05
  const total = subtotal() + tax + shippingCost

  return (
    <div className="checkout-page">
      <div className="checkout-bg" aria-hidden />
      <div className="checkout-particles" aria-hidden>
        <span></span><span></span><span></span>
      </div>

      <motion.header className="checkout-hero" initial="hidden" animate="show" variants={{ show:{transition:{staggerChildren:0.08}} }}>
        <motion.h1 className="checkout-title" variants={fadeUp}>Secure Checkout</motion.h1>
        <motion.p className="checkout-lead" variants={fadeUp}>Elegant, secure and couture — complete your order with confidence.</motion.p>
      </motion.header>

      <main className="checkout-main">
        <form className="checkout-grid" onSubmit={placeOrder}>
          <section className="panel billing" aria-labelledby="billing">
            <motion.h2 id="billing" className="panel-title" initial="hidden" animate="show" variants={fadeUp}>Billing Details</motion.h2>
            <motion.div className="panel-body" initial="hidden" animate="show" variants={fadeUp}>
              <div className="field-row">
                <label className="field"><span>Full Name</span><input value={billing.name} onChange={e=>setBilling({...billing,name:e.target.value})} required /></label>
                <label className="field"><span>Email</span><input type="email" value={billing.email} onChange={e=>setBilling({...billing,email:e.target.value})} required /></label>
              </div>
              <div className="field-row">
                <label className="field"><span>Phone</span><input value={billing.phone} onChange={e=>setBilling({...billing,phone:e.target.value})} /></label>
                <label className="field"><span>Country</span><input value={billing.country} onChange={e=>setBilling({...billing,country:e.target.value})} /></label>
              </div>
              <label className="field"><span>Address</span><input value={billing.address} onChange={e=>setBilling({...billing,address:e.target.value})} required /></label>
              <div className="field-row">
                <label className="field"><span>City</span><input value={billing.city} onChange={e=>setBilling({...billing,city:e.target.value})} /></label>
                <label className="field"><span>State</span><input value={billing.state} onChange={e=>setBilling({...billing,state:e.target.value})} /></label>
                <label className="field"><span>Pincode</span><input value={billing.pincode} onChange={e=>setBilling({...billing,pincode:e.target.value})} /></label>
              </div>
            </motion.div>
          </section>

          <section className="panel shipping" aria-labelledby="shipping">
            <motion.h2 id="shipping" className="panel-title" initial="hidden" animate="show" variants={fadeUp}>Shipping Method</motion.h2>
            <motion.div className="panel-body shipping-cards" initial="hidden" animate="show" variants={fadeUp}>
              <label className={`ship-card ${shippingMethod==='standard'?'selected':''}`}>
                <input type="radio" name="ship" value="standard" checked={shippingMethod==='standard'} onChange={()=>setShippingMethod('standard')} />
                <div className="ship-body"><strong>Standard Shipping</strong><small>3–7 business days</small></div>
                <div className="ship-cost">${subtotal()>100?0:4.99}</div>
              </label>

              <label className={`ship-card ${shippingMethod==='express'?'selected':''}`}>
                <input type="radio" name="ship" value="express" checked={shippingMethod==='express'} onChange={()=>setShippingMethod('express')} />
                <div className="ship-body"><strong>Express Delivery</strong><small>1–2 business days</small></div>
                <div className="ship-cost">$14.99</div>
              </label>

              <label className={`ship-card ${shippingMethod==='sameday'?'selected':''}`}>
                <input type="radio" name="ship" value="sameday" checked={shippingMethod==='sameday'} onChange={()=>setShippingMethod('sameday')} />
                <div className="ship-body"><strong>Same-Day Delivery</strong><small>Order within city</small></div>
                <div className="ship-cost">$29.99</div>
              </label>
            </motion.div>
            
            <motion.h2 className="panel-title" initial="hidden" animate="show" variants={fadeUp}>Payment</motion.h2>
            <motion.div className="panel-body" initial="hidden" animate="show" variants={fadeUp}>
              <div className="pay-methods">
                <label className={`pay-radio ${payment.method==='card'?'active':''}`}><input type="radio" name="pay" checked={payment.method==='card'} onChange={()=>setPayment({...payment,method:'card'})} />Card</label>
                <label className={`pay-radio ${payment.method==='upi'?'active':''}`}><input type="radio" name="pay" checked={payment.method==='upi'} onChange={()=>setPayment({...payment,method:'upi'})} />UPI / Wallet</label>
              </div>

              {payment.method === 'card' ? (
                <div className="card-fields">
                  <label className="field"><span>Cardholder Name</span><input value={payment.cardName} onChange={e=>setPayment({...payment,cardName:e.target.value})} required /></label>
                  <label className="field"><span>Card Number</span><input value={payment.cardNumber} onChange={e=>setPayment({...payment,cardNumber:e.target.value})} required placeholder="1234 5678 9012 3456" /></label>
                  <div className="field-row">
                    <label className="field"><span>Expiry</span><input value={payment.expiry} onChange={e=>setPayment({...payment,expiry:e.target.value})} placeholder="MM/YY" /></label>
                    <label className="field"><span>CVV</span><input value={payment.cvv} onChange={e=>setPayment({...payment,cvv:e.target.value})} placeholder="•••" /></label>
                  </div>
                </div>
              ) : (
                <div className="upi-instructions">Pay securely via your preferred UPI app at checkout.</div>
              )}
            </motion.div>
          </section>

          <aside className="panel summary" aria-labelledby="order-summary">
            <motion.h2 id="order-summary" className="panel-title" initial="hidden" animate="show" variants={fadeUp}>Order Summary</motion.h2>
            <motion.div className="panel-body summary-body" initial="hidden" animate="show" variants={fadeUp}>
              <div className="summary-items">
                {items.map(it=> (
                  <div className="summary-item" key={`${it.product}-${it.size}`}>
                    <img src={it.image || '/backgrounds/product-placeholder.jpg'} alt={it.name} />
                    <div className="meta"><div className="n">{it.name}</div><div className="q">x{it.qty}</div></div>
                    <div className="p">${(it.price * (it.qty||1)).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="summary-row"><span>Subtotal</span><span>${subtotal().toFixed(2)}</span></div>
              <div className="summary-row"><span>Tax (GST)</span><span>${tax.toFixed(2)}</span></div>
              <div className="summary-row"><span>Shipping</span><span>${shippingCost.toFixed(2)}</span></div>
              <div className="summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>

              <button className="place-btn" type="submit" disabled={placing}>{placing ? 'Placing…' : 'Place Order'}</button>
              {placed && <div className="placed">Order received — thank you.</div>}
            </motion.div>
          </aside>
        </form>
      </main>
    </div>
  )
}

