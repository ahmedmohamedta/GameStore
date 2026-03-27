import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadCart, saveCart, getCartTotal, updateQuantity, removeFromCart } from '../utils/cart';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const items = loadCart();
    setCartItems(items);
    setTotal(getCartTotal());
  }, []);

  const handleQuantityChange = (id, newQty) => {
    updateQuantity(id, newQty);
    setCartItems(loadCart());
    setTotal(getCartTotal());
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    setCartItems(loadCart());
    setTotal(getCartTotal());
  };

  if (cartItems.length === 0) {
    return (
      <main className="pt-32 container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-8">سلة التسوق</h1>
        <div className="glass p-12">
          <p className="text-2xl mb-4">السلة فارغة</p>
          <Link to="/products" className="btn-primary inline-block px-6 py-3 rounded-lg">
            تسوق الآن
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">سلة التسوق</h1>

      {/* عرض للأجهزة الكبيرة (جدول) */}
      <div className="hidden md:block glass p-6">
        <table className="w-full text-right">
          <thead className="bg-gray-800 text-[--primary-color]">
            <tr>
              <th className="py-3 px-4">المنتج</th>
              <th className="py-3 px-4">السعر</th>
              <th className="py-3 px-4">الكمية</th>
              <th className="py-3 px-4">الإجمالي</th>
              <th className="py-3 px-4">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id} className="border-b border-gray-700">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <span>{item.name}</span>
                </td>
                <td className="py-3 px-4">${item.price}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="bg-gray-700 w-8 h-8 rounded hover:bg-gray-600"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="bg-gray-700 w-8 h-8 rounded hover:bg-gray-600"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4 font-bold text-[--primary-color]">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <i className="fas fa-trash text-xl"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-6 text-2xl font-bold">
          <span>الإجمالي:</span>
          <span className="text-[--primary-color]">${total}</span>
        </div>
        <div className="flex justify-end mt-8">
          <Link to="/checkout" className="btn-primary px-8 py-3 rounded-full text-lg font-semibold">
            إتمام الشراء
          </Link>
        </div>
      </div>

      {/* عرض للأجهزة الصغيرة (بطاقات) */}
      <div className="md:hidden space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="glass p-4">
            <div className="flex gap-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-[--primary-color] font-bold">${item.price}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="bg-gray-700 w-8 h-8 rounded hover:bg-gray-600"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="bg-gray-700 w-8 h-8 rounded hover:bg-gray-600"
                >
                  +
                </button>
              </div>
              <div className="font-bold text-[--primary-color]">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:text-red-400"
              >
                <i className="fas fa-trash text-xl"></i>
              </button>
            </div>
          </div>
        ))}
        <div className="glass p-4 flex justify-between items-center text-xl font-bold">
          <span>الإجمالي:</span>
          <span className="text-[--primary-color]">${total}</span>
        </div>
        <div className="flex justify-center mt-4">
          <Link to="/checkout" className="btn-primary px-8 py-3 rounded-full text-lg font-semibold w-full text-center">
            إتمام الشراء
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Cart;