import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminUserProfile = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب جميع البيانات من localStorage
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = allUsers.find(u => u.email === decodeURIComponent(email));
    if (!foundUser) {
      navigate('/admin');
      return;
    }
    setUser(foundUser);

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = allOrders.filter(o => o.userEmail === foundUser.email);
    setOrders(userOrders);

    const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    const userMessages = allMessages.filter(m => m.email === foundUser.email);
    setMessages(userMessages);

    // جلب المنتجات لاستخراج أسماء المنتجات من المفضلة
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(allProducts);

    // جلب المفضلة الخاصة بالمستخدم
    const wishlistKey = `wishlist_${foundUser.email}`;
    const savedWishlist = JSON.parse(localStorage.getItem(wishlistKey) || '[]');
    setWishlist(savedWishlist);

    setLoading(false);
  }, [email, navigate]);

  if (loading) return <div className="pt-32 text-center text-2xl">جاري التحميل...</div>;
  if (!user) return <div className="pt-32 text-center text-2xl">المستخدم غير موجود</div>;

  // الحصول على تفاصيل المنتجات المفضلة
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="pt-32 container mx-auto px-4">
      <button
        onClick={() => navigate('/admin')}
        className="mb-4 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
      >
        <i className="fas fa-arrow-right ml-2"></i> العودة للوحة التحكم
      </button>

      <div className="glass p-6">
        <h1 className="text-3xl font-bold mb-4 text-[--primary-color]">الملف الشخصي للمستخدم</h1>

        {/* معلومات الحساب */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p><strong>الاسم:</strong> {user.name}</p>
            <p><strong>البريد الإلكتروني:</strong> {user.email}</p>
            <p><strong>نوع الحساب:</strong> {user.isAdmin ? 'أدمن' : 'عادي'}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p><strong>إحصائيات:</strong></p>
            <p>عدد الطلبات: {orders.length}</p>
            <p>عدد الرسائل: {messages.length}</p>
            <p>عدد المفضلات: {wishlist.length}</p>
          </div>
        </div>

        {/* الطلبات */}
        {orders.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">الطلبات</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-gray-800">
                  <tr><th>#</th><th>التاريخ</th><th>المجموع</th><th>الحالة</th><th>المنتجات</th></tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-gray-700">
                      <td className="py-2">{order.id}</td>
                      <td>{order.date}</td>
                      <td>${order.total}</td>
                      <td>{order.status}</td>
                      <td>{order.items?.map(i => i.name).join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* الرسائل */}
        {messages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">الرسائل</h2>
            {messages.map(msg => (
              <div key={msg.id} className="border border-gray-700 p-3 mb-2 rounded-lg">
                <p><strong>التاريخ:</strong> {msg.date}</p>
                <p>{msg.message}</p>
                <p className="text-sm text-gray-400">الحالة: {msg.read ? 'مقروءة' : 'غير مقروءة'}</p>
              </div>
            ))}
          </div>
        )}

        {/* المفضلة */}
        {wishlistProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">المنتجات المفضلة</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {wishlistProducts.map(p => (
                <div key={p.id} className="glass p-2 rounded text-center">
                  <img src={p.image} alt={p.name} className="w-16 h-16 object-cover mx-auto mb-2 rounded" />
                  <p className="text-sm">{p.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserProfile;