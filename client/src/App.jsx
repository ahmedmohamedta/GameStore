import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Profile from './pages/Profile';
function App() {
  const navigate = useNavigate();
  const [visitorCount, setVisitorCount] = useState(0);
  const hasMounted = useRef(false); // لمنع التكرار بسبب StrictMode
 
   const location = useLocation();

  useEffect(() => {
    // ===== عداد الزوار (مؤقت) - يزيد مرة واحدة فقط =====
    // في App.jsx داخل useEffect
if (!sessionStorage.getItem('visitorCounted')) {
  let count = parseInt(localStorage.getItem('visitorCount') || '0') + 1;
  localStorage.setItem('visitorCount', count);
  sessionStorage.setItem('visitorCounted', 'true');
  setVisitorCount(count);
} else {
  setVisitorCount(parseInt(localStorage.getItem('visitorCount') || '0'));
}

    // ===== التوجيه إلى التسجيل لأول مستخدم =====
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (users.length === 0 && !user) {
      // لا يوجد مستخدمين على الإطلاق → أول زائر يوجه للتسجيل
      navigate('/register');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
         
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin" element={
  <Suspense fallback={<div className="pt-24 text-center">جاري التحميل...</div>}>
    <Admin />
  </Suspense>
} />
        </Routes>
      </main>
      <footer className="glass mt-16 py-8 text-center footer-text">
        <p>© 2026 GameStore. جميع الحقوق محفوظة.</p>
       
      </footer>
    </div>
  );
}

export default App;