import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import BackgroundEffects from './components/BackgroundEffects'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import Collections from './pages/Collections'
import BestSellers from './pages/BestSellers'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Exclusive from './pages/Exclusive'
import About from './pages/About'
import Contact from './pages/Contact'
import AuthProvider from './context/AuthContext'
import CartProvider from './context/CartContext'
import Footer from './components/Footer'

export default function App(){
  return (
    <AuthProvider>
      <CartProvider>
        <div className="bg-hero bg-overlay bg-animated" style={{minHeight: '100vh', position: 'relative'}}>
          <BackgroundEffects type="hero" />
          <Navbar />
          <main style={{position: 'relative', zIndex: 3}}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/best-sellers" element={<BestSellers />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
               <Route path="/exclusive" element={<Exclusive />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
