import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';
import { addToCart } from '../utils/cart';
import { toggleWishlist, isInWishlist } from '../utils/wishlist';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TypingEffect from '../components/TypingEffect';
const Home = () => {
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [testimonials] = useState([
   
  ]);

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
      // جلب المنتجات المميزة (featured = true)
      const featuredProducts = data.filter(p => p.featured === true);
      setFeatured(featuredProducts.length > 0 ? featuredProducts : data.slice(0, 4)); // إذا لم يوجد مميز، اعرض أول 4 كبديل
    });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    const cartIcon = document.querySelector('.fa-shopping-cart');
    if (cartIcon) {
      cartIcon.classList.add('bounce');
      setTimeout(() => cartIcon.classList.remove('bounce'), 300);
    }
  };

  const handleToggleWishlist = (productId) => {
    toggleWishlist(products.find(p => p.id === productId));
    setProducts([...products]);
  };

  return (
    <main className="pt-32 container mx-auto  px-2">
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[500px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/converted/hero-bg.jpg')" }}>
        <div className="absolute inset-0 glass bg-opacity-60 backdrop-blur-sm"></div>
        <motion.div
          className="relative text-center text-white px-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >

{/* ===== HERO SECTION ===== */}
<section className="relative h-[500px] flex items-center justify-center overflow-hidden">
  {/* طبقة الزجاج مع تأثير التوهج (بدون glass لأنك أزلتها) */}
  <div className="absolute inset-0 border-purple-500/50 shadow-[0_0_30px_#a855f7,0_0_60px_#ff00ff,0_0_90px_#00ffff]"></div>
  
  <motion.div
    className="relative text-center text-white px-4 flex flex-col items-center z-10"
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    {/* اللوجو مع حركة عائمة ومهتزة */}
    <motion.img 
      src="/converted/game.png" 
      alt="GameStore Logo" 
      className="w-24 h-24 md:w-32 md:h-32 mb-4 drop-shadow-[0_0_30px_var(--primary-color)]"
      animate={{
        y: [0, -25, 0],           // حركة لأعلى وأسفل
        rotate: [0, 5, -5, 0],     // اهتزاز خفيف
      }}
      transition={{
        duration: 3,               // مدة الدورة الكاملة (3 ثوان)
        repeat: Infinity,          // تكرار لا نهائي
        repeatType: "loop",        // نمط التكرار
        ease: "easeInOut"          // تسارع ناعم
      }}
    />
    {/* النص الرئيسي بحجم أصغر */}
    
<h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-[0_0_30px_var(--primary-color)]">
  <TypingEffect 
    texts={['🎮 GameStore', '⚡ أفضل العروض', '🔥 أحدث الألعاب']}
    speed={100}
    delay={2000}
    loop={true}
  />
</h1>
    {/* الشعار الفرعي */}
    <p className="text-xl md:text-2xl drop-shadow-[0_0_15px_white] mt-4">
      عالم الألعاب بين يديك
    </p>
  </motion.div>
</section>
          
        </motion.div>
      </section>

      {/* ===== المنتجات المميزة ===== */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-down">
          🔥 منتجات مميزة
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isInWishlist={isInWishlist(product.id)}
            />
          ))}
        </div>
      </section>

   

      

      {/* ===== إحصائيات ===== */}
      {/* ===== إحصائيات ===== */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'عملاء سعداء', value: '15K+', icon: 'fa-users', delay: 0 },
            { label: 'لعبة متوفرة', value: '20+', icon: 'fa-gamepad', delay: 100 },
            { label: 'سنة خبرة', value: '5', icon: 'fa-calendar-alt', delay: 200 },
            { label: 'توصيل سريع', value: '24h', icon: 'fa-truck', delay: 300 },
          ].map((stat, idx) => (
            <div
              key={idx}
              data-aos="zoom-in-up"
              data-aos-duration="800"
              data-aos-delay={stat.delay}
              className="glass p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_var(--primary-color)] group"
            >
              <i className={`fas ${stat.icon} text-5xl text-[--primary-color] mb-4 group-hover:animate-bounce transition-all`}></i>
              <p className="text-4xl font-bold text-[--primary-color] drop-shadow-[0_0_10px_var(--primary-color)]">
                {stat.value}
              </p>
              <p className="text-gray-400 mt-2 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

    
    </main>
  );
};

export default Home;