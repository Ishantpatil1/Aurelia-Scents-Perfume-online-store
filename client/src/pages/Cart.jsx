import React from 'react'
import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import './Cart.css'

export default function Cart(){
  const { items, removeItem, subtotal, updateQuantity, clearCart } = useCart()
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleCheckout = ()=>{
    if(!user) return navigate('/login')
    navigate('/checkout')
  }

  return (
    <div className="cart-page">
      <div className="cart-bg" aria-hidden />
      <div className="cart-particles" aria-hidden>
        <span></span><span></span><span></span><span></span>
      </div>

      <div className="cart-container">
        <motion.header className="cart-header" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}>
          <h1 className="cart-title">Your Cart</h1>
          <p className="cart-sub">A curated selection — ready for a signature finish.</p>
        </motion.header>

        {items.length === 0 ? (
          <motion.div className="empty-state" initial={{opacity:0}} animate={{opacity:1}}>
            <h2>Your Cart is Empty</h2>
            <div className="empty-underline" />
            <p className="empty-text">Discover our collection and find a scent that becomes your signature.</p>
            <Link to="/collections" className="btn-outline">Continue Shopping</Link>
          </motion.div>
        ) : (
          <div className="cart-grid">
            <div className="items-col">
              <AnimatePresence initial={false}>
                {items.map((it, idx)=> (
                  <motion.article key={`${it.product}-${it.size}`} className="cart-card" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}} layout>
                    <div className="card-media">
                      <img src={it.image || '/backgrounds/product-placeholder.jpg'} alt={it.name} />
                    </div>
                    <div className="card-body">
                      <h3 className="prod-name">{it.name}</h3>
                      <p className="prod-desc">{it.description || 'Handcrafted perfume with couture notes.'}</p>
                      <div className="card-meta">
                        <div className="price">${(it.price).toFixed(2)}</div>
                        <div className="qty">
                          <button className="qty-btn" onClick={()=> updateQuantity(it.product, it.size, Math.max(1, it.qty-1))}>−</button>
                          <span className="qty-num">{it.qty}</span>
                          <button className="qty-btn" onClick={()=> updateQuantity(it.product, it.size, it.qty+1)}>+</button>
                        </div>
                      </div>
                    </div>
                    <button className="remove-btn" onClick={()=> removeItem(it.product, it.size)} aria-label="Remove item">✕</button>
                  </motion.article>
                ))}
              </AnimatePresence>
              <div className="cart-actions">
                <button className="btn-clear" onClick={()=> clearCart()}>Clear Cart</button>
                <Link to="/collections" className="btn-continue">Continue Shopping</Link>
              </div>
            </div>

            <aside className="summary-col">
              <motion.div className="summary-box" initial={{opacity:0,x:18}} animate={{opacity:1,x:0}}>
                <h4 className="summary-title">Order Summary</h4>

                <div className="summary-items">
                  {items.map(it=> (
                    <div className="summary-item" key={`${it.product}-${it.size}`}>
                      <img src={it.image || '/backgrounds/product-placeholder.jpg'} alt={it.name} />
                      <div className="summary-item-meta">
                        <div className="name">{it.name}</div>
                        <div className="qty-small">x{it.qty}</div>
                      </div>
                      <div className="summary-item-price">${(it.price * (it.qty||1)).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="summary-row"><span>Subtotal</span><span>${subtotal().toFixed(2)}</span></div>
                <div className="summary-row"><span>Tax (GST)</span><span>${(subtotal()*0.05).toFixed(2)}</span></div>
                <div className="summary-row"><span>Shipping</span><span>${(subtotal()>100?0:9.99).toFixed(2)}</span></div>
                <div className="summary-row discount"><span>Discount</span><span>—</span></div>
                <div className="summary-total"><span>Total</span><span>${(subtotal()*1.05 + (subtotal()>100?0:9.99)).toFixed(2)}</span></div>
                <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
              </motion.div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
