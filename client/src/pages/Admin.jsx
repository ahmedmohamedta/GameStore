import React, { useEffect, useState , useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import { fetchProducts } from '../utils/api';
import { motion } from 'framer-motion';
import TypingEffect from '../components/TypingEffect';
import { refreshProductsCache } from '../utils/api';

// بعد تعديل المصفوفة (مثلاً بعد إضافة منتج)
const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const productFormRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [productForm, setProductForm] = useState({
    id: null,
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    featured: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]); // قائمة التصنيفات

  // استخراج التصنيفات الفريدة من المنتجات
  const extractCategories = (products) => {
    const cats = [...new Set(products.map(p => p.category))];
    setCategories(cats);
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (!parsedUser.isAdmin) {
      navigate('/');
      return;
    }
    setUser(parsedUser);
    loadData();
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      let storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
      if (storedProducts.length === 0) {
        // const apiProducts = await fetchProducts();
        // storedProducts = apiProducts.map(p => ({ ...p, featured: false }));
        localStorage.setItem('products', JSON.stringify(storedProducts));
      }
      setProducts(storedProducts);
      extractCategories(storedProducts);

      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      setUsers(storedUsers);

      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(storedOrders);

      const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
      setMessages(storedMessages);
    } catch (error) {
      console.error('خطأ في تحميل البيانات:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProductForm({ ...productForm, image: reader.result });
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

  // const formData = new FormData();
  // formData.append('image', file);

  // try {
  //   // const response = await fetch('http://localhost:5000/api/upload', { // عدّل الرابط حسب نشرك
  //     method: 'POST',
  //     body: formData
  //   });
//     const data = await response.json();
//     if (data.url) {
//       setProductForm({ ...productForm, image: data.url });
//       setImagePreview(data.url);
//     } else {
//       console.error('خطأ في رفع الصورة');
//     }
//   } catch (error) {
//     console.error('فشل رفع الصورة:', error);
//   }
// };

  // دالة إضافة/تعديل المنتج
const handleProductSubmit = (e) => {
  e.preventDefault();
  if (isEditing) {
    const updated = products.map(p =>
      p.id === productForm.id ? { ...productForm, price: parseFloat(productForm.price) } : p
    );
    localStorage.setItem('products', JSON.stringify(updated));
    setProducts(updated);
    setIsEditing(false);
  } else {
    const newProduct = {
      ...productForm,
      id: Date.now(),
      price: parseFloat(productForm.price),
    };
    const updated = [...products, newProduct];
    localStorage.setItem('products', JSON.stringify(updated));
    setProducts(updated);
  }
  resetProductForm();
};

  const resetProductForm = () => {
  setProductForm({
    id: null,
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    featured: false,
  });
  setImagePreview(null);
  setIsEditing(false); // هذا السطر يضمن عودة الزر إلى "إضافة منتج"
};

  const handleEditProduct = (product) => {
  setProductForm(product);
  setImagePreview(product.image);
  setIsEditing(true);
  setTimeout(() => {
    if (productFormRef.current) {
      const navbarHeight = 100; // قد تحتاج لتعديل حسب ارتفاع النافبار الفعلي
      const elementPosition = productFormRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      });
    }
  }, 100);
};

  const handleDeleteProduct = (productId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      const updated = products.filter(p => p.id !== productId);
      localStorage.setItem('products', JSON.stringify(updated));
      setProducts(updated);
      extractCategories(updated);
    }
  };

  const toggleFeatured = (productId) => {
    const updated = products.map(p =>
      p.id === productId ? { ...p, featured: !p.featured } : p
    );
    localStorage.setItem('products', JSON.stringify(updated));
    setProducts(updated);
  };

  const handleDeleteUser = (email) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      const updated = users.filter(u => u.email !== email);
      localStorage.setItem('users', JSON.stringify(updated));
      setUsers(updated);
    }
  };

  const markMessageAsRead = (messageId) => {
    const updated = messages.map(m => m.id === messageId ? { ...m, read: true } : m);
    localStorage.setItem('messages', JSON.stringify(updated));
    setMessages(updated);
  };

  const deleteMessage = (messageId) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
      const updated = messages.filter(m => m.id !== messageId);
      localStorage.setItem('messages', JSON.stringify(updated));
      setMessages(updated);
    }
  };

  // إضافة تصنيف جديد عبر prompt
  const handleAddCategory = () => {
  const newCategory = prompt('أدخل اسم التصنيف الجديد:');
  if (newCategory && newCategory.trim()) {
    const trimmed = newCategory.trim();
    if (!categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
      setProductForm({ ...productForm, category: trimmed });
    } else {
      alert('هذا التصنيف موجود بالفعل');
    }
  }
};

  if (loading) return <div className="pt-32 text-center text-2xl">جاري التحميل...</div>;

  return (
    <div className="pt-32 container mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-[--primary-color] drop-shadow-[0_0_15px_var(--primary-color)]"
      >
        
        <TypingEffect 
          texts={['لوحة التحكم🎛️', '🛠️ إدارة المنتجات', '👥 إدارة المستخدمين']}
          speed={100}
          delay={1500}
          loop={true}
        />
      </motion.h1>

      {/* بطاقات إحصائية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'المنتجات', value: products.length, icon: 'fa-gamepad', color: 'from-blue-500 to-cyan-500' },
          { label: 'المستخدمين', value: users.length, icon: 'fa-users', color: 'from-green-500 to-teal-500' },
          { label: 'الطلبات', value: orders.length, icon: 'fa-shopping-cart', color: 'from-yellow-500 to-orange-500' },
          { label: 'الرسائل', value: messages.length, icon: 'fa-envelope', color: 'from-purple-500 to-pink-500' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--primary-color)' }}
            className={`glass p-6 text-center bg-gradient-to-br ${stat.color} bg-opacity-10 border border-white/20`}
          >
            <i className={`fas ${stat.icon} text-4xl text-[--primary-color] mb-4 drop-shadow-[0_0_10px_var(--primary-color)]`}></i>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-gray-300 mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* تبويبات التنقل */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700">
        {['products', 'users', 'orders', 'messages'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition-colors relative ${
              activeTab === tab ? 'text-[--primary-color]' : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab === 'products' ? 'المنتجات' : tab === 'users' ? 'المستخدمين' : tab === 'orders' ? 'الطلبات' : 'الرسائل'}
            {activeTab === tab && (
              <motion.span
                layoutId="activeTab"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-[--primary-color]"
              />
            )}
          </button>
        ))}
      </div>

      {/* المنتجات */}
      {activeTab === 'products' && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="glass p-4 sm:p-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-[--primary-color]">إدارة المنتجات</h2>

          <form ref={productFormRef} onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            
            <input
              type="text"
              placeholder="اسم المنتج"
              value={productForm.name}
              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
              className="p-3 rounded bg-gray-800 border border-gray-700 focus:border-[--primary-color] outline-none transition col-span-1"
              required
            />
            <input
              type="number"
              placeholder="السعر"
              value={productForm.price}
              onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
              className="p-3 rounded bg-gray-800 border border-gray-700 focus:border-[--primary-color] outline-none transition col-span-1"
              required
              step="0.01"
            />

            {/* حقل التصنيف + زر إضافة تصنيف جديد */}
            <div className="flex gap-2 items-center col-span-1 md:col-span-2">
              <select
                value={productForm.category}
                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                className="flex-1 p-3 rounded bg-gray-800 border border-gray-700 focus:border-[--primary-color] outline-none transition"
                required
              >
                <option value="">اختر تصنيف</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddCategory}
                className="bg-[--primary-color] text-black px-4 py-3 rounded-lg font-bold hover:bg-opacity-80 transition whitespace-nowrap"
                title="إضافة تصنيف جديد"
              >
                <i className="fas fa-plus"></i>
                <span className="hidden sm:inline mr-2">إضافة تصنيف</span>
              </button>
            </div>

            {/* رفع الصورة */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm text-gray-400">صورة المنتج</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="p-2 rounded bg-gray-800 border border-gray-700 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-[--primary-color] file:text-black file:font-semibold hover:file:bg-[--primary-color]/80 transition"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded border border-gray-700" />
              )}
            </div>

            <textarea
              placeholder="وصف المنتج"
              value={productForm.description}
              onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              className="p-3 rounded bg-gray-800 border border-gray-700 focus:border-[--primary-color] outline-none transition md:col-span-2"
              rows="3"
              required
            />

            <div className="flex items-center gap-2 md:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={productForm.featured}
                  onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                  className="w-5 h-5 accent-[--primary-color]"
                />
                <span>منتج مميز</span>
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-primary px-6 py-3 rounded-lg md:col-span-2 font-bold"
            >
              {isEditing ? 'تحديث المنتج' : 'إضافة منتج'}
            </motion.button>

            {isEditing && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={resetProductForm}
                className="bg-gray-600 px-6 py-3 rounded-lg md:col-span-2 font-bold hover:bg-gray-700 transition"
              >
                إلغاء
              </motion.button>
            )}
          </form>

          {/* جدول المنتجات */}
          <div className="overflow-x-auto">
            <table className="w-full text-right min-w-[600px]">
              <thead className="bg-gray-800 text-[--primary-color]">
                <tr>
                  <th className="py-3 px-4">الصورة</th>
                  <th className="py-3 px-4">الاسم</th>
                  <th className="py-3 px-4">السعر</th>
                  <th className="py-3 px-4">التصنيف</th>
                  <th className="py-3 px-4">مميز</th>
                  <th className="py-3 px-4">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-gray-700 hover:bg-gray-800/50 transition"
                  >
                    <td className="py-3 px-4">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg shadow-lg" />
                    </td>
                    <td className="py-3 px-4 font-medium">{product.name}</td>
                    <td className="py-3 px-4 text-[--primary-color] font-bold">${product.price}</td>
                    <td className="py-3 px-4">
                      <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={product.featured || false}
                        onChange={() => toggleFeatured(product.id)}
                        className="w-5 h-5 accent-[--primary-color] cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg ml-2 hover:bg-blue-500 hover:text-white transition"
                      >
                        <i className="fas fa-edit ml-1"></i> تعديل
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white transition"
                      >
                        <i className="fas fa-trash ml-1"></i> حذف
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* المستخدمين */}
      {activeTab === 'users' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass p-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-[--primary-color]">المستخدمين</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-800 text-[--primary-color]">
                <tr>
                  <th className="py-3 px-4">الاسم</th>
                  <th className="py-3 px-4">البريد الإلكتروني</th>
                  <th className="py-3 px-4">نوع الحساب</th>
                  <th className="py-3 px-4">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <motion.tr
                    key={u.email}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-700 hover:bg-gray-800/50 transition"
                  >
                    <td className="py-3 px-4">{u.name}</td>
                    <td className="py-3 px-4">{u.email}</td>
                    <td className="py-3 px-4">
                      {u.isAdmin ? (
                        <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">أدمن</span>
                      ) : (
                        <span className="bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full text-sm">عادي</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleDeleteUser(u.email)}
                        className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={u.isAdmin}
                      >
                        <i className="fas fa-trash ml-1"></i> حذف
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* الطلبات */}
      {activeTab === 'orders' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass p-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-[--primary-color]">الطلبات</h2>
          {orders.length === 0 ? (
            <p className="text-center text-gray-400">لا توجد طلبات بعد</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-gray-800 text-[--primary-color]">
                  <tr>
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">المستخدم</th>
                    <th className="py-3 px-4">التاريخ</th>
                    <th className="py-3 px-4">المجموع</th>
                    <th className="py-3 px-4">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-gray-700 hover:bg-gray-800/50 transition"
                    >
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">{order.userEmail}</td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4 text-[--primary-color] font-bold">${order.total}</td>
                      <td className="py-3 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => {
                            const updated = orders.map(o =>
                              o.id === order.id ? { ...o, status: e.target.value } : o
                            );
                            localStorage.setItem('orders', JSON.stringify(updated));
                            setOrders(updated);
                          }}
                          className="bg-gray-800 border border-gray-700 rounded p-1"
                        >
                          <option>قيد المعالجة</option>
                          <option>تم الشحن</option>
                          <option>تم التوصيل</option>
                          <option>ملغي</option>
                        </select>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      )}

      {/* الرسائل */}
      {activeTab === 'messages' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass p-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-[--primary-color]">الرسائل</h2>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-center text-gray-400">لا توجد رسائل بعد</p>
            ) : (
              messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border ${msg.read ? 'border-gray-700' : 'border-[--primary-color] bg-[--primary-color]/10'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{msg.name}</h3>
                      <p className="text-sm text-gray-400">{msg.email}</p>
                      <p className="text-sm text-gray-400">{msg.date}</p>
                    </div>
                    <div className="flex gap-2">
                      {!msg.read && (
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          onClick={() => markMessageAsRead(msg.id)}
                          className="text-green-400 hover:text-green-300"
                          title="تحديد كمقروءة"
                        >
                          <i className="fas fa-check-circle text-xl"></i>
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        onClick={() => deleteMessage(msg.id)}
                        className="text-red-400 hover:text-red-300"
                        title="حذف"
                      >
                        <i className="fas fa-trash text-xl"></i>
                      </motion.button>
                    </div>
                  </div>
                  <p className="mt-2 p-3 bg-gray-800/50 rounded">{msg.message}</p>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Admin;