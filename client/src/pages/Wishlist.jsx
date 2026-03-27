import React, { useState, useEffect, useCallback } from 'react';
import { getWishlist, toggleWishlist } from '../utils/wishlist';
import ProductCard from '../components/ProductCard';
import { addToCart } from '../utils/cart';

const Wishlist = () => {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [products, setProducts] = useState([]);

  // دالة تحديث القائمة من localStorage
  const refreshWishlist = useCallback(() => {
    const ids = getWishlist();
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const favProducts = allProducts.filter(p => ids.includes(p.id));
    setWishlistIds(ids);
    setProducts(favProducts);
  }, []);

  // تحميل البيانات عند بدء التشغيل والاستماع للتغييرات الخارجية
  useEffect(() => {
    refreshWishlist();

    const handleStorageChange = (e) => {
      if (e.key && e.key.startsWith('wishlist_')) {
        refreshWishlist();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshWishlist]);

  // معالج إزالة/إضافة منتج من المفضلة
  const handleToggleWishlist = (productId) => {
    const newIds = toggleWishlist(productId);
    setWishlistIds(newIds);
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const updatedFav = allProducts.filter(p => newIds.includes(p.id));
    setProducts(updatedFav);
  };

  // معالج إضافة المنتج إلى السلة
  const handleAddToCart = (product) => {
    addToCart(product);
    alert('✅ تمت الإضافة إلى السلة');
  };

  // عرض رسالة إذا كانت المفضلة فارغة
  if (products.length === 0) {
    return (
      <main className="pt-32 container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-8">❤️ المنتجات المفضلة</h1>
        <div className="glass p-12">
          <p className="text-2xl mb-4">لا توجد منتجات في المفضلة</p>
          <a href="/products" className="btn-primary inline-block px-6 py-3 rounded-lg">
            تصفح المنتجات
          </a>
        </div>
      </main>
    );
  }

  // عرض المنتجات المفضلة
  return (
    <main className="pt-32 container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">❤️ المنتجات المفضلة</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
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

export default Wishlist;