import React, { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';
import { addToCart } from '../utils/cart';
import { toggleWishlist, getWishlist } from '../utils/wishlist';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(200);
  const [categories, setCategories] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  // تحديث قائمة المفضلة من localStorage
  const refreshWishlist = useCallback(() => {
    setWishlistIds(getWishlist());
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchProducts().then(data => {
      setProducts(data);
      const cats = ['all', ...new Set(data.map(p => p.category))];
      setCategories(cats);
    });
    refreshWishlist();

    // الاستماع لتغييرات localStorage (إذا تغيرت المفضلة من مكان آخر)
    const handleStorageChange = (e) => {
      if (e.key && e.key.startsWith('wishlist_')) {
        refreshWishlist();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshWishlist]);

  // تحديث المنتجات المعروضة بناءً على الفلتر
  useEffect(() => {
    filterProducts();
  }, [selectedCategory, priceRange, products]);

  const filterProducts = () => {
    let result = products.filter(p => p.price <= priceRange);
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    setFiltered(result);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleToggleWishlist = (productId) => {
    try {
      const newIds = toggleWishlist(productId);
      if (Array.isArray(newIds)) {
        setWishlistIds(newIds);
      } else {
        console.error('❌ toggleWishlist لم تُرجع مصفوفة:', newIds);
        setWishlistIds(getWishlist());
      }
    } catch (error) {
      console.error('❌ خطأ في تحديث المفضلة:', error);
      setWishlistIds(getWishlist());
    }
  };

  return (
    <main className="pt-32 container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8" data-aos="fade-down">جميع المنتجات</h1>

      {/* فلاتر التصنيف والسعر */}
      <div className="mb-8 flex flex-wrap gap-4 items-center" data-aos="fade-up">
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === cat
                  ? 'bg-[--primary-color] text-black'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              {cat === 'all' ? 'الكل' : cat}
            </button>
          ))}
        </div>

        
      </div>

      {/* شبكة المنتجات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onToggleWishlist={() => handleToggleWishlist(product.id)}
            isInWishlist={wishlistIds.includes(product.id)}
          />
        ))}
      </div>
    </main>
  );
};

export default Products;