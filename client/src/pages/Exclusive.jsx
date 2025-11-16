import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './Register.css'

export default function Exclusive(){
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    fetch('http://localhost:5000/api/products')
      .then(r=>r.json())
      .then(list=>{
        // pick a curated exclusive product if present, otherwise first product
        if(Array.isArray(list) && list.length){
          // try to find a product flagged as exclusive, else pick the first
          const ex = list.find(p=>p.tags && p.tags.includes('exclusive')) || list[0]
          setProduct(ex)
        } else {
          setProduct(null)
        }
      })
      .catch(err => { console.error(err); setProduct(null) })
      .finally(()=>setLoading(false))
  },[])

  const fallback = {
    name: 'Nocturne Rouge — Limited Edition',
    shortDescription: 'An atelier blend of oud, rose absolue and ambergris — created in a single handcrafted batch.',
    description: `Nocturne Rouge is a rare composition born from an encounter between crimson rose and warm resinous woods. Hand-blended and matured for six months, it unveils a velvet trail that lingers like memory. Limited to a small number of numbered flacons, each bottle is hand-signed by the perfumer.`,
    notes: ['Top: Saffron, Bergamot', 'Heart: Damask Rose, Jasmine', 'Base: Agarwood (Oud), Ambergris, Benzoin'],
    price: 420,
    images: ['/backgrounds/heros.png']
  }

  const p = product || fallback

  function handleReserve(){
    // if product has an id, go to product detail; otherwise go to contact
    if (product && product._id){
      navigate(`/product/${product._id}`)
    } else {
      // no product id available (fallback) — go to collections or contact
      navigate('/collections')
    }
  }

  return (
    <div className="container" style={{padding:'36px 0', display:'flex', justifyContent:'center'}}>
      <motion.section className="hero-cinematic bg-collections" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.9}} style={{padding:'48px',borderRadius:16, width:'100%',maxWidth:1100}}>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content" style={{position:'relative',zIndex:3, display:'flex', justifyContent:'center'}}>
          <div style={{display:'flex',gap:36,alignItems:'flex-start',justifyContent:'center',flexWrap:'wrap',width:'100%'}}>
          <motion.div className="thumb-wrapper" initial={{opacity:0,scale:.98}} animate={{opacity:1,scale:1}} transition={{duration:0.9}} style={{flex:'0 0 380px',maxWidth:380,alignSelf:'center'}}>
            <img src={(p.images && p.images[0]) || '/backgrounds/heros.png'} alt={p.name} style={{width:'100%',borderRadius:14,display:'block',objectFit:'cover'}}/>
          </motion.div>

          <motion.div style={{flex:1,minWidth:320,maxWidth:620}} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.9,delay:0.12}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
              <span style={{background:'linear-gradient(90deg,#ffdca3,#e6c680)',padding:'6px 10px',borderRadius:999,fontSize:12,fontWeight:700,color:'#111'}}>Exclusive</span>
              <h2 style={{fontFamily:"'Playfair Display', serif",fontSize:32,margin:0,color:'#fff7ec'}}>{p.name}</h2>
            </div>

            <p style={{color:'rgba(247,245,242,0.92)',fontSize:16,marginTop:8,lineHeight:1.6}}>{p.shortDescription || p.description}</p>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:18}}>
              <div style={{background:'rgba(255,255,255,0.02)',padding:12,borderRadius:10}}>
                <div style={{fontSize:12,color:'rgba(247,245,242,0.7)',marginBottom:6}}>Perfumer</div>
                <div style={{fontWeight:700}}>Juliette Moreau</div>
                <div style={{fontSize:12,color:'rgba(247,245,242,0.65)',marginTop:6}}>Maison: Aurelia Atelier</div>
              </div>

              <div style={{background:'rgba(255,255,255,0.02)',padding:12,borderRadius:10}}>
                <div style={{fontSize:12,color:'rgba(247,245,242,0.7)',marginBottom:6}}>Concentration</div>
                <div style={{fontWeight:700}}>Extrait de Parfum</div>
                <div style={{fontSize:12,color:'rgba(247,245,242,0.65)',marginTop:6}}>Bottle: 75ml</div>
              </div>
            </div>

            <div style={{marginTop:18,display:'flex',gap:18,alignItems:'center',flexWrap:'wrap'}}>
              <div style={{fontFamily:'Montserrat, Inter, sans-serif',color:'#e6c680',fontWeight:700,fontSize:20}}>${(p.price || 0).toFixed(2)}</div>
              <button onClick={handleReserve} className="btn-cta" style={{padding:'10px 18px',borderRadius:12}}>Reserve / Inquire</button>
            </div>

            <section style={{marginTop:26}}>
              <h4 style={{margin:0,fontFamily:"'Cormorant Garamond', serif",fontSize:18,color:'#fff7ec'}}>The Story</h4>
              <p style={{color:'rgba(247,245,242,0.82)',lineHeight:1.6}}>{p.description}</p>

              <h4 style={{fontFamily:"'Cormorant Garamond', serif",fontSize:18,color:'#fff7ec'}}>Olfactory Notes</h4>
              <ul style={{color:'rgba(247,245,242,0.82)',marginTop:8}}>
                {(p.notes || []).map((n, i)=> <li key={i} style={{marginBottom:6}}>{n}</li>)}
              </ul>

              <div style={{marginTop:14,display:'flex',gap:12,alignItems:'center',flexWrap:'wrap'}}>
                <div style={{background:'rgba(255,255,255,0.02)',padding:10,borderRadius:10}}>
                  <div style={{fontSize:12,color:'rgba(247,245,242,0.7)'}}>Edition</div>
                  <div style={{fontWeight:700}}>Limited — 250 bottles</div>
                </div>
                <div style={{background:'rgba(255,255,255,0.02)',padding:10,borderRadius:10}}>
                  <div style={{fontSize:12,color:'rgba(247,245,242,0.7)'}}>Year</div>
                  <div style={{fontWeight:700}}>2025</div>
                </div>
              </div>

              <p style={{marginTop:10,color:'rgba(247,245,242,0.72)',fontSize:13}}>Each edition is numbered and presented in a hand-finished case. Contact our boutique for private viewings and commissioned bottles.</p>
            </section>
          </motion.div>
        </div>
        </div>
      </motion.section>
    </div>
  )
}
