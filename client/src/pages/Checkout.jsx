import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveCart } from '../utils/cart';

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // في Checkout.jsx
const handleSubmit = (e) => {
  e.preventDefault();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  const user = JSON.parse(localStorage.getItem('user')) || { email: 'guest' };
  
  const order = {
    id: Date.now(),
    userEmail: user.email,
    items: cart,
    total,
    status: 'قيد المعالجة',
    date: new Date().toLocaleString('ar-EG'),
  };

  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  
  // إفراغ السلة
  localStorage.setItem('cart', JSON.stringify([]));
  window.dispatchEvent(new Event('cartUpdated'));
  
  alert('تم تأكيد الطلب بنجاح!');
  navigate('/');
};

  return (
    <main className="pt-32 container mx-auto px-4 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center">إتمام الشراء</h1>
      <div className="glass p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">الاسم الكامل</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-[--primary-color] outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-[--primary-color] outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">العنوان</label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-[--primary-color] outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">رقم الهاتف</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-[--primary-color] outline-none"
            />
          </div>
          <button type="submit" className="w-full btn-primary py-3 rounded-lg font-bold text-lg">
            تأكيد الطلب
          </button>
        </form>
      </div>
    </main>
  );
};

export default Checkout;