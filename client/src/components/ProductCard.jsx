import React from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../utils/cart';

const ProductCard = ({ product, onToggleWishlist, isInWishlist }) => {
  const handleAddToCart = () => {
    addToCart(product);
    const cartIcon = document.querySelector('.fa-shopping-cart');
    if (cartIcon) {
      cartIcon.classList.add('bounce');
      setTimeout(() => cartIcon.classList.remove('bounce'), 300);
    }
  };

  return (
    <div className="product-card-3d p-6" data-aos="fade-up">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-lg mb-4" loading="lazy" />
      </Link>
      <div className="flex justify-between items-start">
        <h3 className="text-2xl font-semibold mb-2">
          <Link to={`/product/${product.id}`} className="hover:text-[--primary-color]">{product.name}</Link>
        </h3>
        <button onClick={() => onToggleWishlist(product.id)} className="text-2xl text-red-500 hover:text-red-400 transition">
          <i className={`${isInWishlist ? 'fas' : 'far'} fa-heart`}></i>
        </button>
      </div>
      <p className="text-gray-400 mb-2 text-lg">{product.category}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-3xl font-bold text-[--primary-color] price-tag">${product.price}</span>
        <button onClick={handleAddToCart} className="btn-primary px-6 py-3 rounded-lg text-lg">
          <i className="fas fa-cart-plus"></i> أضف
        </button>
      </div>
    </div>
  );
};

export default ProductCard;