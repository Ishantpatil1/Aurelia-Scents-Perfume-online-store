import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const CartContext = createContext()
export function useCart(){ return useContext(CartContext) }

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

export default function CartProvider({ children }){
  const [items, setItems] = useState([])
  const { token, authFetch } = useAuth()

  useEffect(()=>{
    const raw = localStorage.getItem('cart')
    if (raw){
      try{ setItems(JSON.parse(raw)) }catch(e){}
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(items))
  },[items])

  function addItem(item){
    setItems(prev => {
      // merge by product+size
      const copy = [...prev]
      const idx = copy.findIndex(i=>i.product===item.product && i.size===item.size)
      if (idx>-1){ copy[idx].qty += item.qty || 1 } else { copy.push({ ...item, qty: item.qty||1 }) }
      return copy
    })
  }

  function removeItem(product, size){
    setItems(prev => prev.filter(i=>!(i.product===product && i.size===size)))
  }

  function clear(){ setItems([]) }

  function clearCart(){ setItems([]) }

  function updateQuantity(product, size, qty){
    setItems(prev => {
      const copy = prev.map(i=> ({ ...i }))
      const idx = copy.findIndex(i=> i.product===product && i.size===size)
      if (idx === -1) return prev
      if (qty <= 0){ copy.splice(idx,1); return copy }
      copy[idx].qty = qty
      return copy
    })
  }

  function subtotal(){
    return items.reduce((s,i)=> s + (i.price||0) * (i.qty||1), 0)
  }

  async function checkout(){
    if (!token) throw new Error('Not authenticated')
    const res = await fetch(`${API}/api/cart/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ items: items.map(i=>({ product: i.product, size: i.size, qty: i.qty })) })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Checkout failed')
    clear()
    return data
  }

  const value = { items, addItem, removeItem, clear, clearCart, updateQuantity, subtotal, checkout }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
