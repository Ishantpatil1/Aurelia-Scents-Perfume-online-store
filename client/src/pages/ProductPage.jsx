import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import './ProductPage.css'

export default function ProductPage(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ author: '', rating: 5, comment: '' })
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState('')
  const [qty, setQty] = useState(1)
  const [wish, setWish] = useState(false)
  const [active, setActive] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const heroRef = useRef(null)

  // parallax mouse move on hero
  useEffect(()=>{
    const el = heroRef.current
    if(!el) return
    const onMove = (e)=>{
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transform = `perspective(900px) rotateY(${x*4}deg) rotateX(${y*-4}deg)`
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', ()=> el.style.transform = 'none')
    return ()=> el.removeEventListener('mousemove', onMove)
  },[])

  useEffect(()=>{
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err))
      .finally(()=>setLoading(false))
  },[id])

  function submitReview(e){
    e.preventDefault()
    fetch(`http://localhost:5000/api/products/${id}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(r => {
        setProduct(prev => ({ ...prev, reviews: [...(prev.reviews||[]), r] }))
        setForm({ author: '', rating: 5, comment: '' })
      })
      .catch(err => console.error(err))
  }

  if (loading) return <div className="product-page loading">Loading...</div>
  if (!product) return <div className="product-page">Product not found</div>

  const mainImage = (product.images && product.images.length) ? product.images[active] : product.image || '/backgrounds/product-placeholder.jpg'
  const variantLabels = (product.variants && product.variants.length) ? product.variants.map(v=>v.name) : (product.variantNames || (product.images||[]).map((_,i)=> `Variant ${i+1}`))

  return (
    <div className="product-page">
      <div className="product-bg" aria-hidden />

      <div className="hero-grid">
        <div className="gallery-col">
          <div className="main-hero" ref={heroRef}>
            <motion.img src={mainImage} alt={product.name} className="hero-img" initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} transition={{duration:0.7}} />
            <div className="hero-reflection" />
            <div className="hero-mist" />
          </div>

          {/* Variant selection (large cards) when multiple images/variants exist */}
          { (product.images || []).length > 1 && (
            <div className="variants-block">
              <div className="variants-label">Other products available</div>
              <div className="variants-row">
                {(product.images||[]).map((src,i)=> (
                  <button key={i} className={`variant-card ${i===selectedVariant ? 'selected':''}`} onClick={()=>{ setSelectedVariant(i); setActive(i); }} aria-pressed={i===selectedVariant}>
                    <div className="variant-media"><img src={src} alt={`${product.name} option ${i+1}`} /></div>
                    <div className="variant-label">{variantLabels[i] || `Option ${i+1}`}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* <div className="thumbs">
            {(product.images||[]).map((src,i)=> (
              <button key={i} className={`thumb ${i===active ? 'active':''}`} onClick={()=>{ setActive(i); setSelectedVariant(i); }} aria-label={`Image ${i+1}`}>
                <img src={src} alt={`${product.name} thumbnail ${i+1}`} />
              </button>
            ))}
          </div> */}
        </div>

        <div className="details-col">
          <motion.h1 className="product-name" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>{product.name}</motion.h1>
          <motion.p className="tagline" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>{product.tagline || 'A couture fragrance of rare, noble ingredients.'}</motion.p>
          <motion.div className="price-row" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
            <div className="price">${product.price.toFixed(2)}</div>
            <button className={`wish ${wish? 'active':''}`} onClick={()=>setWish(!wish)} aria-pressed={wish} title="Add to wishlist">♡</button>
          </motion.div>

          <div className="sizes">
            {(product.sizes||['30ml','50ml','100ml']).map(s=> (
              <button key={s} className={`size-btn ${selectedSize===s?'sel':''}`} onClick={()=>setSelectedSize(s)} aria-pressed={selectedSize===s}>{s}</button>
            ))}
          </div>

          <div className="buy-row">
            <div className="qty-select">
              <button onClick={()=> setQty(Math.max(1, qty-1))}>−</button>
              <span>{qty}</span>
              <button onClick={()=> setQty(qty+1)}>+</button>
            </div>
            <button className="add-btn" onClick={()=>{
              if (!selectedSize) return alert('Please select a size')
              addItem({ product: product._id, name: product.name, size: selectedSize, qty, price: product.price, image: product.images && product.images[0] })
              alert('Added to cart')
            }}>Add to Cart</button>
            
          </div>

          <div className="meta-block">
            <h4>Notes</h4>
            <div className="notes">
              <span>Top: {product.notes?.top || 'Bergamot, Pink Pepper'}</span>
              <span>Heart: {product.notes?.heart || 'Rose, Jasmine'}</span>
              <span>Base: {product.notes?.base || 'Oud, Amber, Vanilla'}</span>
            </div>
          </div>
        </div>
      </div>

      <section className="description">
        <motion.h2 initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>The Story</motion.h2>
        <motion.p initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="story">{product.description}</motion.p>

        <div className="notes-cards">
          <div className="note-card"><strong>Longevity</strong><p>{product.longevity || 'Long-lasting (8+ hours)'}</p></div>
          <div className="note-card"><strong>Sillage</strong><p>{product.sillage || 'Moderate-Strong'}</p></div>
          <div className="note-card"><strong>Craft</strong><p>{product.craft || 'Small-batch, couture finishing'}</p></div>
        </div>
      </section>

      <section className="reviews">
        <h3>Reviews</h3>
        {(product.reviews && product.reviews.length) ? (
          <div className="reviews-grid">
            {product.reviews.map((r,i)=> (
              <div className="review-card" key={i}>
                <div className="avatar">{r.author ? r.author[0] : 'U'}</div>
                <div className="review-body">
                  <div className="review-head"><strong>{r.author}</strong> <span className="muted">{new Date(r.createdAt).toLocaleDateString()}</span></div>
                  <div className="rating">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
                  <p>{r.comment}</p>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="muted">No reviews yet.</p>}

        <form onSubmit={submitReview} className="review-form">
          <h4>Write a Review</h4>
          <input placeholder="Your name" value={form.author} onChange={e=>setForm({...form, author: e.target.value})} required />
          <select value={form.rating} onChange={e=>setForm({...form, rating: Number(e.target.value)})}>
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
          <textarea placeholder="Comment" value={form.comment} onChange={e=>setForm({...form, comment: e.target.value})} />
          <button type="submit" className="submit-review">Submit Review</button>
        </form>
      </section>
    </div>
  )
}
