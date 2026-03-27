let cart = [];

export const loadCart = () => {
  const saved = localStorage.getItem('cart');
  cart = saved ? JSON.parse(saved) : [];
  return cart;
};

export const saveCart = (newCart) => {
  cart = newCart;
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (product) => {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  const cartIcon = document.querySelector('.fa-shopping-cart');
  if (cartIcon) {
    cartIcon.classList.add('animate-ping');
    setTimeout(() => cartIcon.classList.remove('animate-ping'), 300);
  }
  saveCart(cart);
  
  // إطلاق حدث لتحديث العداد في App
  window.dispatchEvent(new Event('cartUpdated'));
};
export const removeFromCart = (productId) => {
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  window.dispatchEvent(new Event('cartUpdated')); // لتحديث العداد
};

export const updateQuantity = (productId, quantity) => {
  const item = cart.find(item => item.id === productId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      saveCart(cart);
    }
  }
};

export const getCartTotal = () => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
};