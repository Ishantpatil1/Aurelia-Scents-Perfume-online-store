import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './ProductCard.css'

export default function ProductCard({ product }){
  const navigate = useNavigate()
  const ref = useRef(null)
  const [isHover, setIsHover] = useState(false)

  const imgSrc = product?.images && product.images.length ? product.images[0] : (product?.image || '/backgrounds/product-placeholder.jpg')
  const priceNum = typeof product?.price === 'number' ? product.price : 0
  const shortDesc = product?.shortDescription || product?.tagline || ''

  function handleMove(e){
    const el = ref.current
    if(!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    const rx = (y * 6).toFixed(2)
    const ry = (x * -6).toFixed(2)
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
    el.style.setProperty('--shine-x', `${(x+0.5)*100}%`)
    el.style.setProperty('--shine-y', `${(y+0.5)*100}%`)
  }

  function handleLeave(){
    const el = ref.current
    if(!el) return
    el.style.transform = 'none'
    setIsHover(false)
  }

  return (
    <motion.article className="lux-card" ref={ref}
      initial={{opacity:0,y:10}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.6}}
      onMouseMove={(e)=>{ setIsHover(true); handleMove(e) }}
      onMouseLeave={handleLeave}
      onClick={() => navigate(`/product/${product?._id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e)=>{ if(e.key==='Enter') navigate(`/product/${product?._id}`) }}
    >
      <div className="lux-panel">
        <div className="bg-bokeh" aria-hidden />
        <div className={`image-wrap ${isHover? 'hover':''}`}>
          <img src={imgSrc} alt={product?.name || 'Perfume'} className="prod-img" loading="lazy" decoding="async" />
          <div className="img-reflection" />
          <div className="rim-light" />
        </div>

        <div className="info-wrap">
          <h3 className="lux-title">{product?.name || 'Untitled'}</h3>
          { shortDesc ? <p className="lux-desc">{shortDesc}</p> : null }

          <div className="price-row">
            <div className="price">${priceNum.toFixed(2)}</div>
            <button className="lux-cta" aria-label={`View ${product?.name}`}>View Details</button>
          </div>
        </div>

        <div className="gold-shimmer" aria-hidden />
      </div>
    </motion.article>
  )
}
