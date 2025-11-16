import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../shared/ProductCard'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

const container = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, when: 'beforeChildren' } }
}
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2,0.9,0.2,1] } }
}

export default function Home(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetch(`${API}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data || []))
      .catch(err => console.error(err))
      .finally(()=>setLoading(false))
  },[])

  return (
    <div className="container">
      <motion.section className="hero-cinematic" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.9}}>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-eyebrow">Haute Parfumerie • Limited Editions</div>
          <motion.h1 className="hero-title" initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.9,delay:0.08}}>Aurelia Scents — The Art of Memory</motion.h1>
          <motion.p className="hero-sub" initial={{y:18,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.9,delay:0.12}}>An atelier collection of couture fragrances crafted from the rarest essences — opulent, refined, unforgettable.</motion.p>
          <motion.div className="hero-cta" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.18}}>
            <a className="btn-primary cta-shimmer" href="#collections">Explore Collections</a>
            <a className="btn-ghost" href="/about">Our Maison</a>
          </motion.div>
        </div>

        <motion.div className="hero-visual" initial={{y:8,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:1,delay:0.24}}>
          <div className="bottle-glow" />
          <motion.img src="/backgrounds/heros.png" alt="Perfume bottle" className="bottle" animate={{y:[-6,4,-3], rotate:[-1,0,1]}} transition={{duration:6,repeat:Infinity,repeatType:'reverse',ease:'easeInOut'}}/>
        </motion.div>
      </motion.section>

      <section id="collections" style={{marginTop:28}}>
        <motion.h2 style={{fontFamily:"'Playfair Display', serif, 'Cormorant Garamond'",fontSize:36,margin:'8px 0 18px 0',color:'#ffffffff'}} initial={{y:8,opacity:0}} whileInView={{y:0,opacity:1}} transition={{duration:0.8}}>Featured Perfumes</motion.h2>

        {loading ? <p style={{color:'#ccc'}}>Loading...</p> : (
          <motion.div className="grid-lux" variants={container} initial="hidden" animate="show">
            {products.map((p, idx) => (
              <motion.div key={p._id} variants={item} whileHover={{ scale: 1.02, translateY:-6 }} transition={{type:'spring',stiffness:220,damping:18}}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  )
}
