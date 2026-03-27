import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // التحقق من تطابق كلمة المرور
    if (formData.password !== formData.confirmPassword) {
      setError('كلمة المرور غير متطابقة');
      return;
    }

    // جلب المستخدمين الحاليين
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // التحقق من عدم وجود البريد الإلكتروني مسبقاً
    if (users.some(u => u.email === formData.email)) {
      setError('البريد الإلكتروني مستخدم بالفعل');
      return;
    }

    // أول مستخدم يصبح أدمن
    const isAdmin = users.length === 0;

    // إنشاء المستخدم الجديد
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      isAdmin,
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // تسجيل الدخول تلقائياً
    localStorage.setItem('user', JSON.stringify({ 
      email: newUser.email, 
      name: newUser.name, 
      isAdmin 
    }));
    localStorage.setItem('user', JSON.stringify({ email: newUser.email, name: newUser.name, isAdmin }));
window.dispatchEvent(new Event('userUpdated')); // هذا السطر
navigate('/');
    // التوجيه: إذا كان أدمن → إلى لوحة التحكم، وإلا → الرئيسية
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="pt-32 container mx-auto px-4 max-w-md">
      <div className="glass p-8">
        <h1 className="text-3xl font-bold text-center mb-6">إنشاء حساب جديد</h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* باقي الحقول كما هي */}
          <div className="mb-4">
            <label className="block mb-2">الاسم الكامل</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-[--primary-color] outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-[--primary-color] outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">كلمة المرور</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-[--primary-color] outline-none"
              required
              minLength="6"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">تأكيد كلمة المرور</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-[--primary-color] outline-none"
              required
            />
          </div>

          <button type="submit" className="w-full btn-primary py-3 rounded-lg font-bold">
            تسجيل
          </button>
        </form>

        <p className="text-center mt-4">
          لديك حساب بالفعل؟ <Link to="/login" className="text-[--primary-color] hover:underline">تسجيل الدخول</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;