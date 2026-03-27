import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getWishlist, toggleWishlist } from '../utils/wishlist';
import ProductCard from '../components/ProductCard';
import { addToCart } from '../utils/cart';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // تحميل الطلبات الخاصة بهذا المستخدم فقط
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = allOrders.filter(order => order.userEmail === parsedUser.email);
    setOrders(userOrders);

    // تحميل المنتجات المفضلة للمستخدم الحالي
    const wishlistIds = getWishlist();
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const favProducts = allProducts.filter(p => wishlistIds.includes(p.id));
    setWishlistProducts(favProducts);

    setLoading(false);
  }, [navigate]);

  const handleRemoveFromWishlist = (productId) => {
    toggleWishlist(productId);
    setWishlistProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    // يمكن إضافة إشعار بنجاح الإضافة
  };

  if (loading) {
    return (
      <div className="pt-32 container mx-auto px-4 text-center">
        <div className="text-2xl">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 container mx-auto px-4"
    >
      <h1 className="text-4xl font-bold mb-8 text-[--primary-color] drop-shadow-[0_0_15px_var(--primary-color)]">
        الملف الشخصي
      </h1>

      {/* معلومات الحساب */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 md:col-span-2"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-user-circle text-[--primary-color]"></i>
            معلومات الحساب
          </h2>
          <div className="space-y-3">
            <p><span className="text-gray-400">الاسم:</span> {user.name}</p>
            <p><span className="text-gray-400">البريد الإلكتروني:</span> {user.email}</p>
            <p><span className="text-gray-400">نوع الحساب:</span> 
              {user.isAdmin ? (
                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm mr-2">أدمن</span>
              ) : (
                <span className="bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full text-sm mr-2">عادي</span>
              )}
            </p>
            <p><span className="text-gray-400">تاريخ التسجيل:</span> 15 مارس 2026 (محاكاة)</p>
          </div>
        </motion.div>

        {/* إحصائيات سريعة */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6"
        >
          <h2 className="text-xl font-bold mb-4">نشاطك</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>الطلبات</span>
              <span className="text-2xl font-bold text-[--primary-color]">{orders.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>المفضلة</span>
              <span className="text-2xl font-bold text-[--primary-color]">{wishlistProducts.length}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* الطلبات السابقة */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass p-6 mb-8"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <i className="fas fa-truck text-[--primary-color]"></i>
          الطلبات السابقة
        </h2>
        {orders.length === 0 ? (
          <p className="text-center text-gray-400 py-4">لا توجد طلبات بعد</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-800 text-[--primary-color]">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">التاريخ</th>
                  <th className="py-3 px-4">المجموع</th>
                  <th className="py-3 px-4">الحالة</th>
                  <th className="py-3 px-4">المنتجات</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-gray-700 hover:bg-gray-800/50 transition"
                  >
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4">{order.date}</td>
                    <td className="py-3 px-4 text-[--primary-color] font-bold">${order.total}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        order.status === 'تم التوصيل' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'تم الشحن' ? 'bg-blue-500/20 text-blue-400' :
                        order.status === 'ملغي' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {order.items?.length || 0} منتج
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* المنتجات المفضلة */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass p-6"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <i className="fas fa-heart text-red-500"></i>
          المنتجات المفضلة
        </h2>
        {wishlistProducts.length === 0 ? (
          <p className="text-center text-gray-400 py-4">لا توجد منتجات في المفضلة</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleWishlist={() => handleRemoveFromWishlist(product.id)}
                isInWishlist={true}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Profile;