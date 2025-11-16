import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../shared/ProductCard'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

const container = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, when: 'beforeChildren' } }
}
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2,0.9,0.2,1] } }
}

export default function Collections(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetch(`${API}/api/products`)
      .then(res => res.json())
      .then(data => { console.log('Collections fetched', Array.isArray(data) ? data.length : typeof data, data); setProducts(data || []) })
      .catch(err => console.error('Collections fetch error', err))
      .finally(()=>setLoading(false))
  },[])

  return (
    <div className="container" style={{paddingTop:28}}>
      <motion.h1 style={{fontFamily:"'Playfair Display', serif",fontSize:40,color:'#ffffffff',marginBottom:8}} initial={{y:10,opacity:0}} animate={{y:0,opacity:1}}>Collections</motion.h1>
      <motion.p style={{color:'rgba(255, 255, 255, 0.8)',maxWidth:780}} initial={{y:8,opacity:0}} animate={{y:0,opacity:1}}>Explore our full range of couture fragrances, grouped by olfactory families and limited editions.</motion.p>

      {loading ? <p style={{color:'#ffffffff'}}>Loading collections...</p> : (
        <motion.div className="grid-lux" variants={container} initial="hidden" animate="show" style={{marginTop:22}}>
          {products.map(p => (
            <motion.div key={p._id} variants={item} whileHover={{ scale: 1.02, translateY:-6 }} transition={{type:'spring',stiffness:220,damping:18}}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
