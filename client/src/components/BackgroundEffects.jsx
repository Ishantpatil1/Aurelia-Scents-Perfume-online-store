import React, { useRef, useEffect } from 'react'

// Lightweight canvas-based golden particles + slow smoke overlay.
// Props: type -> 'hero' | 'product' | 'collections' to slightly vary particle density.
export default function BackgroundEffects({ type = 'hero' }){
  const ref = useRef(null)
  useEffect(()=>{
    const canvas = ref.current
    if(!canvas) return
    const ctx = canvas.getContext('2d')
    let width = canvas.width = canvas.clientWidth * devicePixelRatio
    let height = canvas.height = canvas.clientHeight * devicePixelRatio
    const DPR = devicePixelRatio || 1

    let particles = []
    const baseCount = type === 'hero' ? 40 : type === 'product' ? 28 : 20
    const count = Math.round(baseCount * (window.innerWidth / 1200))

    function rand(min,max){ return Math.random()*(max-min)+min }

    for(let i=0;i<count;i++){
      particles.push({
        x: rand(0,width),
        y: rand(0,height),
        r: rand(0.6,3.6) * DPR,
        vx: rand(-0.05,0.05),
        vy: rand(-0.02,0.06),
        alpha: rand(0.08,0.9),
        hue: rand(40,50)
      })
    }

    let raf = null
    function draw(){
      ctx.clearRect(0,0,width,height)
      // subtle smoky background layers
      ctx.globalCompositeOperation = 'source-over'
      // soft radial gold glow (large blur)
      const g = ctx.createRadialGradient(width*0.2, height*0.25, 0, width*0.2, height*0.25, Math.max(width,height)*0.8)
      g.addColorStop(0, 'rgba(212,167,89,0.08)')
      g.addColorStop(0.4, 'rgba(184,106,167,0.02)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.fillRect(0,0,width,height)

      // particles
      particles.forEach(p=>{
        p.x += p.vx * (DPR*1.2)
        p.y += p.vy * (DPR*1.2)
        if(p.x < -50) p.x = width + 50
        if(p.x > width + 50) p.x = -50
        if(p.y > height + 80) p.y = -80
        // glow
        ctx.beginPath()
        ctx.fillStyle = `rgba(212,167,89,${p.alpha*0.35})`
        ctx.arc(p.x, p.y, p.r*2.6, 0, Math.PI*2)
        ctx.fill()
        // center bright
        ctx.beginPath()
        ctx.fillStyle = `rgba(212,167,89,${p.alpha})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
        ctx.fill()
      })

      // slow smoky sweep
      ctx.globalCompositeOperation = 'lighter'
      const t = (Date.now()/1000)
      ctx.fillStyle = `rgba(255,255,255,${0.02 + Math.sin(t*0.12)*0.006})`
      ctx.beginPath()
      ctx.ellipse(width*0.66 + Math.sin(t*0.08)*width*0.02, height*0.6, width*0.58, height*0.28, Math.sin(t*0.03)*0.03, 0, Math.PI*2)
      ctx.fill()

      raf = requestAnimationFrame(draw)
    }

    function resize(){
      width = canvas.width = canvas.clientWidth * DPR
      height = canvas.height = canvas.clientHeight * DPR
    }

    window.addEventListener('resize', resize)
    draw()
    return ()=>{ window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  },[type])

  return (
    <div className="bg-effects" aria-hidden>
      <canvas ref={ref} />
    </div>
  )
}
