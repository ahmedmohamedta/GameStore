import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation , Link} from 'react-router-dom';
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
import Profile from './pages/Profile';
import AdminUserProfile from './pages/AdminUserProfile';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [visitorCount, setVisitorCount] = useState(0);
  const hasMounted = useRef(false);

  // إعادة التمرير إلى أعلى عند تغيير المسار
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);



  useEffect(() => {

     const loadSampleData = async () => {
    if (!localStorage.getItem('users')) {
      const res = await fetch('/data/users.json');
      const users = await res.json();
      localStorage.setItem('users', JSON.stringify(users));
    }
    if (!localStorage.getItem('messages')) {
      const res = await fetch('/data/messages.json');
      const messages = await res.json();
      localStorage.setItem('messages', JSON.stringify(messages));
    }
    if (!localStorage.getItem('orders')) {
      const res = await fetch('/data/orders.json');
      const orders = await res.json();
      localStorage.setItem('orders', JSON.stringify(orders));
    }
    if (!localStorage.getItem('products')) {
      const res = await fetch('/data/products.json');
      const products = await res.json();
      localStorage.setItem('products', JSON.stringify(products));
    }
  };
loadSampleData();
    // ===== عداد الزوار (مؤقت) - يزيد مرة واحدة فقط =====
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
          <Route path="/admin" element={<Admin />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={
            <Suspense fallback={<div className="pt-24 text-center">جاري التحميل...</div>}>
              <Admin />
            </Suspense>
          } />
          <Route path="/admin/user/:email" element={<AdminUserProfile />} />
        </Routes>
      </main>
      <footer className="relative glass mt-16 py-8 text-center footer-text overflow-hidden">
  {/* الخط العلوي المتوهج مع أنيميشن pulse */}
  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[--primary-color] to-transparent shadow-[0_0_8px_var(--primary-color)] glowMove "></div>
  
  <div className="container mx-auto px-4">
    <p className="transition-all duration-300 hover:text-[--primary-color] hover:drop-shadow-[0_0_8px_var(--primary-color)]">
      © 2026 GameStore. جميع الحقوق محفوظة.
    </p>
  </div>
</footer>
    </div>
  );
}

export default App;