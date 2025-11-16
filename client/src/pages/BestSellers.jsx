import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../shared/ProductCard'

const container = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, when: 'beforeChildren' } }
}
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function BestSellers(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetch('http://localhost:5000/api/products')
      .then(r=>r.json())
      .then(data=> setProducts(Array.isArray(data) ? data.slice(0,3) : []))
      .catch(err=>{ console.error(err); setProducts([]) })
      .finally(()=>setLoading(false))
  },[])

  return (
    <div className="container">
      <section style={{padding:'28px 0'}}>
        <motion.h1 style={{fontFamily:"'Playfair Display', serif",fontSize:36,margin:0,color:'#efe9e2'}} initial={{y:8,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.6}}>Best Sellers</motion.h1>
        <p style={{color:'rgba(247,245,242,0.75)',margin:'8px 0 18px 0'}}>Our most cherished fragrances — adored by patrons worldwide.</p>

        {loading ? <p style={{color:'#ccc'}}>Loading...</p> : (
          <motion.div className="grid-lux" variants={container} initial="hidden" animate="show">
            {products.map((p)=> (
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
