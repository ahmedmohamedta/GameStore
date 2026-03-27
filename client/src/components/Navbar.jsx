import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { loadCart, saveCart } from '../utils/cart';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [cartCount, setCartCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const userMenuRef = useRef(null);
  const userButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  // تحديث المستخدم عند التحميل وعند أي تغيير
  useEffect(() => {
    const updateUser = () => {
      const userData = localStorage.getItem('user');
      setUser(userData ? JSON.parse(userData) : null);
    };
    updateUser();
    window.addEventListener('userUpdated', updateUser);
    window.addEventListener('storage', updateUser);
    return () => {
      window.removeEventListener('userUpdated', updateUser);
      window.removeEventListener('storage', updateUser);
    };
  }, []);

  // تحديث عداد السلة
  useEffect(() => {
    const updateCart = () => {
      const cart = loadCart();
      setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    };
    updateCart();
    window.addEventListener('cartUpdated', updateCart);
    return () => window.removeEventListener('cartUpdated', updateCart);
  }, []);

  // إغلاق القوائم عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && userMenuRef.current && !userMenuRef.current.contains(event.target) && userButtonRef.current && !userButtonRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (isMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu, isMenuOpen]);

  // إغلاق القوائم عند الضغط على Esc
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setShowUserMenu(false);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // منع التمرير عند فتح القائمة المتنقلة
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const handleDoubleClickCart = () => {
    if (window.confirm('هل أنت متأكد من تفريغ السلة بالكامل؟')) {
      saveCart([]);
      setCartCount(0);
      window.dispatchEvent(new Event('cartUpdated'));
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3000);
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setShowUserMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowUserMenu(false);
    window.dispatchEvent(new Event('userUpdated'));
    navigate('/');
  };

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 w-full z-50 px-4 sm:px-6">
        <div className="relative mx-auto max-w-7xl rounded-2xl">
          {/* الخلفية المتحركة */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-pink-500/30 to-blue-500/30 animate-gradient-x rounded-2xl" />
          
          {/* طبقة الزجاج */}
          <div className="absolute inset-0 backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 rounded-2xl" />
          
          {/* الحدود النيون المحسنة */}
          <div className="absolute inset-0 border-2 border-purple-500/70 shadow-[0_0_20px_#a855f7,0_0_40px_#ff00ff,0_0_60px_#00ffff] rounded-2xl animate-pulse" />

          {/* المحتوى */}
          <div className="relative z-10 flex justify-between items-center px-3 sm:px-4 py-3">
            {/* الشعار */}
            <Link to="/" className="flex items-center gap-2 group" onClick={handleLinkClick}>
              <img 
                src="/src/images/game.png" 
                alt="GameStore"
                className="h-7 sm:h-10 w-auto transition-all duration-300 group-hover:filter group-hover:drop-shadow-[0_0_15px_var(--primary-color)] group-hover:scale-110" 
              />
              <span className="text-lg sm:text-2xl font-bold text-[--primary-color] drop-shadow-[0_0_8px_var(--primary-color)] group-hover:text-white transition-colors">
                GameStore
              </span>
            </Link>

            {/* الروابط الرئيسية (سطح المكتب) */}
            <div className="hidden md:flex items-center space-x-6 space-x-reverse">
              <Link to="/" className="hover:text-[--primary-color] transition drop-shadow-[0_0_5px_transparent] hover:drop-shadow-[0_0_10px_var(--primary-color)]">
                الرئيسية
              </Link>
              <Link to="/products" className="hover:text-[--primary-color] transition drop-shadow-[0_0_5px_transparent] hover:drop-shadow-[0_0_10px_var(--primary-color)]">
                المنتجات
              </Link>
              <Link to="/about" className="hover:text-[--primary-color] transition drop-shadow-[0_0_5px_transparent] hover:drop-shadow-[0_0_10px_var(--primary-color)]">
                من نحن
              </Link>
              <Link to="/contact" className="hover:text-[--primary-color] transition drop-shadow-[0_0_5px_transparent] hover:drop-shadow-[0_0_10px_var(--primary-color)]">
                اتصل بنا
              </Link>
            </div>

            {/* أيقونات الإجراءات */}
            <div className="flex items-center gap-1 sm:gap-4">
              {/* زر الثيم مع دوران */}
              <motion.button 
                onClick={toggleTheme} 
                className="text-xl p-1 drop-shadow-[0_0_5px_currentColor] hover:drop-shadow-[0_0_15px_currentColor] transition"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
              </motion.button>
              
              {/* المفضلة مع نبض خفيف */}
              <motion.div whileHover={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 400 }}>
                <Link to="/wishlist" className="relative p-1 drop-shadow-[0_0_5px_#ef4444] hover:drop-shadow-[0_0_15px_#ef4444] transition block">
                  <i className="fas fa-heart text-xl sm:text-2xl text-red-500"></i>
                </Link>
              </motion.div>
              
              {/* السلة */}
              <Link
                to="/cart"
                className="relative p-1 drop-shadow-[0_0_5px_currentColor] hover:drop-shadow-[0_0_15px_currentColor] transition"
                onDoubleClick={handleDoubleClickCart}
                title="اضغط مرتين لتفريغ السلة"
              >
                <i className="fas fa-shopping-cart text-xl sm:text-2xl"></i>
                <span className="absolute -top-1 -right-1 bg-[--primary-color] text-black rounded-full px-1.5 py-0.5 text-xs font-bold min-w-[20px] text-center shadow-[0_0_10px_var(--primary-color)]">
                  {cartCount}
                </span>
              </Link>

              {/* قسم المستخدم */}
              {user ? (
                <>
                  {/* أيقونة لوحة التحكم للأدمن مع دوران عند hover */}
                  {user.isAdmin && (
                    <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.3 }}>
                      <Link 
                        to="/admin" 
                        className="text-xl p-1 drop-shadow-[0_0_5px_currentColor] hover:drop-shadow-[0_0_15px_currentColor] transition block"
                        title="لوحة التحكم"
                      >
                        <i className="fas fa-cog"></i>
                      </Link>
                    </motion.div>
                  )}
{/* أيقونة المستخدم مع القائمة المنسدلة */}
<div className="relative" style={{ position: 'relative' }}> {/* تأكد من relative */}
  <motion.button 
    ref={userButtonRef}
    onClick={() => setShowUserMenu(!showUserMenu)}
    className="text-xl p-1 drop-shadow-[0_0_5px_currentColor] hover:drop-shadow-[0_0_15px_currentColor] transition focus:outline-none"
    title="قائمة المستخدم"
    whileHover={{ scale: 1.1 }}
  >
    <i className="fas fa-user-circle text-2xl"></i>
  </motion.button>
  <AnimatePresence>
    {showUserMenu && (
      <motion.div 
        ref={userMenuRef}
        className="absolute left-auto right-0 mt-2 min-w-[200px] sm:min-w-[220px] bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-[9999] py-2 overflow-hidden origin-top-right"
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        style={{ right: '-11.9rem', left: 'auto' }} // تأكيد إضافي
      >
        <div className="px-4 py-2 border-b border-gray-700">
          <p className="font-bold text-[--primary-color]">{user.name}</p>
          <p className="text-sm text-gray-400">{user.email}</p>
          {user.isAdmin && <span className="inline-block mt-1 text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">أدمن</span>}
        </div>
        <Link
          to="/profile"
          className="flex items-center gap-2 px-4 py-2 text-white hover:bg-[--primary-color] hover:text-black transition"
          onClick={() => setShowUserMenu(false)}
        >
          <i className="fas fa-user"></i>
          <span>الملف الشخصي</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full text-right px-4 py-2 text-white hover:bg-red-600 transition"
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>تسجيل خروج</span>
        </button>
      </motion.div>
    )}
  </AnimatePresence>
</div>             </>
              ) : (
                <Link to="/login" className="text-xl p-1 drop-shadow-[0_0_5px_currentColor] hover:drop-shadow-[0_0_15px_currentColor] transition">
                  <i className="fas fa-sign-in-alt"></i>
                </Link>
              )}

              {/* زر الهامبورغر مع أنيميشن */}
              <motion.button 
                className="md:hidden text-2xl p-1 focus:outline-none drop-shadow-[0_0_5px_currentColor] hover:drop-shadow-[0_0_15px_currentColor]" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="القائمة"
                whileTap={{ scale: 0.9 }}
              >
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* القائمة المتنقلة مع أنيميشن */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            className="md:hidden fixed top-20 left-0 w-full z-40 p-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 rounded-2xl p-4">
              <div className="flex flex-col space-y-3 text-center">
                <Link to="/" className="py-2 hover:text-[--primary-color] transition" onClick={handleLinkClick}>
                  الرئيسية
                </Link>
                <Link to="/products" className="py-2 hover:text-[--primary-color] transition" onClick={handleLinkClick}>
                  المنتجات
                </Link>
                <Link to="/about" className="py-2 hover:text-[--primary-color] transition" onClick={handleLinkClick}>
                  من نحن
                </Link>
                <Link to="/contact" className="py-2 hover:text-[--primary-color] transition" onClick={handleLinkClick}>
                  اتصل بنا
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* رسالة تفريغ السلة */}
      {showHint && (
        <motion.div
          className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-[--primary-color] text-black px-6 py-3 rounded-full shadow-lg z-50 text-sm sm:text-base"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <i className="fas fa-check-circle ml-2"></i>
          تم تفريغ السلة بنجاح (نقر مزدوج)
        </motion.div>
      )}
    </>
  );
};

export default Navbar;