import React, { useState } from 'react';
import Map from '../components/Map'; // تأكد من المسار الصحيح

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // حفظ الرسالة في localStorage (كما هو)
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    const newMessage = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleString('ar-EG'),
      read: false,
    };
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));

    setSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="pt-32 container mx-auto px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">اتصل بنا</h1>

      <div className="glass p-8" data-aos="fade-up">
        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-500 p-3 rounded-lg mb-4">
            تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4 md:col-span-2">
            <label className="block mb-2">الاسم</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-[--primary-color] outline-none"
            />
          </div>
          <div className="mb-4 md:col-span-2">
            <label className="block mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-[--primary-color] outline-none"
            />
          </div>
          <div className="mb-4 md:col-span-2">
            <label className="block mb-2">الرسالة</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-[--primary-color] outline-none"
            />
          </div>
          <button type="submit" className="w-full btn-primary py-3 rounded-lg font-bold text-lg md:col-span-2">
            إرسال
          </button>
        </form>

        {/* معلومات إضافية وخريطة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="glass p-4">
            <h3 className="text-xl font-bold mb-2">📍 موقعنا</h3>
            <p>شارع الألعاب، مبنى GameStore، القاهرة، مصر</p>
            <p className="mt-2">📞 +20 123 456 7890</p>
            <p>✉️ support@gamestore.com</p>
          </div>
          <div className="glass p-4 h-64 overflow-hidden">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;