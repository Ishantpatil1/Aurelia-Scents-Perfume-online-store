import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './About.css'

export default function About(){
  const bgRef = useRef(null)

  // subtle parallax on scroll for background depth
  useEffect(()=>{
    const el = bgRef.current
    if(!el) return
    let raf = null
    const onScroll = ()=>{
      if(raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(()=>{
        const y = window.scrollY
        el.style.transform = `translateY(${y * 0.08}px) scale(1.02)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return ()=>{
      window.removeEventListener('scroll', onScroll)
      if(raf) cancelAnimationFrame(raf)
    }
  }, [])

  const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

  return (
    <div className="about-page">
      <div className="about-bg" ref={bgRef} aria-hidden />
      <div className="gold-particles" aria-hidden>
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      <header className="about-hero">
        <motion.div className="hero-content" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.18 } } }}>
          <motion.h1 className="hero-title" variants={fadeUp}>Where Art Meets Fragrance</motion.h1>
          <motion.p className="hero-sub" variants={fadeUp}>An opus of rare ingredients, couture bottles and timeless stories — each scent a chapter of your signature.</motion.p>
          <motion.div className="hero-cta" variants={fadeUp}>
            <a className="cta-button" href="/collections">Explore the Collection</a>
          </motion.div>
        </motion.div>
      </header>

      <main className="about-main">
        <section className="story-section">
          <motion.div className="story-card" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
            <motion.h2 className="section-title" variants={fadeUp}>Our Story</motion.h2>
            <motion.p className="lead" variants={fadeUp}>
              Aurelia Scents was born from a belief that fragrance is more than a scent — it’s an emotion, a memory, and an identity.
              Crafted with rare ingredients from around the world, each perfume is created with artistry, precision, and passion. Our perfumers blend
              French haute perfumery with modern minimalism and timeless elegance. Each bottle is a celebration of luxury, craftsmanship, and individuality.
            </motion.p>

            <motion.div className="mission" variants={fadeUp}>
              <h3>Mission</h3>
              <p className="muted">“To create fragrances that define elegance, empower individuality, and leave a timeless impression.”</p>
            </motion.div>

            <div className="philosophy-grid">
              <motion.div className="phil" variants={fadeUp}>
                <strong>Exceptional craftsmanship</strong>
                <span>Master perfumers and couture finishing.</span>
              </motion.div>
              <motion.div className="phil" variants={fadeUp}>
                <strong>Ethical sourcing</strong>
                <span>Traceable rare ingredients.</span>
              </motion.div>
              <motion.div className="phil" variants={fadeUp}>
                <strong>Small-batch luxury</strong>
                <span>Artistry over mass production.</span>
              </motion.div>
              <motion.div className="phil" variants={fadeUp}>
                <strong>Couture design</strong>
                <span>Bottles finished with couture precision.</span>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className="timeline-section">
          <motion.h2 className="section-title" initial="hidden" animate="show" variants={fadeUp}>Our Journey</motion.h2>
          <div className="timeline">
            <div className="line" />
            <div className="events">
              <article className="event">
                <time>2015</time>
                <div className="event-body">
                  <h4>Founded</h4>
                  <p>Our atelier opened with a single vision: to craft perfumes as wearable artworks.</p>
                </div>
              </article>
              <article className="event">
                <time>2018</time>
                <div className="event-body">
                  <h4>Maison Recognition</h4>
                  <p>International salons began carrying our signature scents.</p>
                </div>
              </article>
              <article className="event">
                <time>2022</time>
                <div className="event-body">
                  <h4>Masterful Craft</h4>
                  <p>Our master perfumers joined forces with rare ingredient partners.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="ingredients-section">
          <motion.h2 className="section-title" initial="hidden" animate="show" variants={fadeUp}>Signature Ingredients</motion.h2>
          <div className="ingredients-grid">
            {['Oud Wood','Rose Damascena','Amber','Vanilla Bourbon','White Jasmine','Musk'].map((ing, i)=> (
              <motion.div className="ingredient-card" key={ing} initial={{opacity:0, y:12}} animate={{opacity:1, y:0, transition:{delay: i*0.06}}}>
                <div className="crystal-icon" aria-hidden>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6z" stroke="currentColor" strokeWidth="0.8"/></svg>
                </div>
                <h5>{ing}</h5>
                <p className="small">Hand-selected and ethically sourced for unmatched depth.</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="process-section">
          <motion.h2 className="section-title" initial="hidden" animate="show" variants={fadeUp}>Our Craft</motion.h2>
          <div className="process-grid">
            {[
              ['Sourcing','Rare ingredients collected worldwide.'],
              ['Masterful Blending','Couture-level accords and balance.'],
              ['Aging & Refining','Time-honored maturation for longevity.'],
              ['Handcrafted Bottling','Final inspection and couture finishing.']
            ].map((step, idx)=> (
              <motion.div className="process-card" key={step[0]} initial={{opacity:0, y:10}} animate={{opacity:1, y:0, transition:{delay: idx*0.08}}}>
                <div className="proc-icon">{idx+1}</div>
                <h4>{step[0]}</h4>
                <p className="small">{step[1]}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="quote-section">
          <blockquote>
            <p>“A perfume is an invisible accessory — the one that completes you.”</p>
            <cite>Aurelia Scents</cite>
          </blockquote>
        </section>

      </main>

    </div>
  )
}
