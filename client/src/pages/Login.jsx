import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      localStorage.setItem('user', JSON.stringify({ 
        email: foundUser.email, 
        name: foundUser.name, 
        isAdmin: foundUser.isAdmin 
      }));
      window.dispatchEvent(new Event('userUpdated'));
      navigate('/');
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="pt-32 container mx-auto px-4 max-w-md">
      <div className="glass p-8">
        <h1 className="text-3xl font-bold text-center mb-6">تسجيل الدخول</h1>
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-[--primary-color] outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-[--primary-color] outline-none"
              required
            />
          </div>
          <button type="submit" className="w-full btn-primary py-3 rounded-lg font-bold">
            دخول
          </button>
        </form>
        <p className="text-center mt-4">
          ليس لديك حساب؟ <Link to="/register" className="text-[--primary-color] hover:underline">سجل الآن</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;