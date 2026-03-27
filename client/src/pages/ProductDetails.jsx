import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../utils/api';
import { addToCart } from '../utils/cart';
import { toggleWishlist, isInWishlist } from '../utils/wishlist';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    fetchProductById(id).then(data => {
      setProduct(data);
      setMainImage(data.image);
      setInWishlist(isInWishlist(data.id));
      setLoading(false);
    });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    alert('✅ تمت الإضافة إلى السلة');
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    setInWishlist(!inWishlist);
  };

  if (loading) return <div className="pt-32 text-center text-2xl">جاري التحميل...</div>;
  if (!product) return <div className="pt-32 text-center text-2xl">المنتج غير موجود</div>;
  return (
    <main className="pt-28 container mx-auto px-4">
      <div className="glass p-8 max-w-5xl mx-auto relative overflow-hidden">
        {/* خلفية متدرجة متحركة */}
        <div className="absolute inset-0 bg-gradient-to-r from-[--primary-color]/10 to-purple-600/10 animate-pulse rounded-2xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row gap-10">
          {/* قسم الصور */}
          <div className="md:w-1/2">
            <div className="relative group">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full rounded-2xl shadow-2xl transform transition duration-500 group-hover:scale-105 group-hover:rotate-2"
                loading="lazy"
                />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition"></div>
            </div>
            {/* معرض الصور المصغرة */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="flex gap-3 mt-4 justify-center">
                {product.gallery.map((img, idx) => (
                  <img
                  key={idx}
                  src={img}
                  alt={`${product.name} ${idx+1}`}
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-[--primary-color] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_var(--primary-color)]"
                  onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* قسم التفاصيل */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-[--primary-color] drop-shadow-[0_0_15px_var(--primary-color)]">
              {product.name}
            </h1>
            <p className="text-xl text-gray-300 bg-black/20 p-3 rounded-xl inline-block">
              التصنيف: {product.category}
            </p>
            <p className="text-2xl leading-relaxed text-gray-200 border-r-4 border-[--primary-color] pr-4">
              {product.description}
            </p>
            <p className="text-5xl font-extrabold text-[--primary-color] drop-shadow-[0_0_25px_var(--primary-color)]">
              ${product.price}
            </p>

            {/* الأزرار */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="btn-primary px-8 py-4 rounded-xl text-xl font-bold flex items-center gap-2 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_40px_var(--primary-color)]"
                >
                <i className="fas fa-cart-plus"></i>
                أضف إلى السلة
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`px-8 py-4 rounded-xl text-xl font-bold flex items-center gap-2 transition-all duration-300 hover:scale-110 ${
                  inWishlist
                  ? 'bg-red-600 text-white hover:shadow-[0_0_30px_#ff0000]'
                  : 'bg-gray-700 text-white hover:bg-gray-600 hover:shadow-[0_0_20px_#fff]'
                }`}
                >
                <i className={`${inWishlist ? 'fas' : 'far'} fa-heart`}></i>
                {inWishlist ? 'في المفضلة' : 'أضف للمفضلة'}
              </button>
            </div>

            {/* معلومات إضافية */}
            <div className="grid grid-cols-2 gap-4 pt-6 text-center">
              <div className="glass p-3 rounded-xl">
                <i className="fas fa-truck text-2xl text-[--primary-color] mb-2"></i>
                <p className="text-sm">توصيل سريع خلال 24 ساعة</p>
              </div>
              <div className="glass p-3 rounded-xl">
                <i className="fas fa-shield-alt text-2xl text-[--primary-color] mb-2"></i>
                <p className="text-sm">ضمان الجودة 100%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;