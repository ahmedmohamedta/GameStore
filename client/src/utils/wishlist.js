const getWishlistKey = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return user ? `wishlist_${user.email}` : 'wishlist_guest';
};

export const loadWishlist = () => {
  const key = getWishlistKey();
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
};

export const saveWishlist = (wishlist) => {
  const key = getWishlistKey();
  localStorage.setItem(key, JSON.stringify(wishlist));
};

export const toggleWishlist = (productId) => {
  const wishlist = loadWishlist();
  const index = wishlist.indexOf(productId);
  if (index === -1) wishlist.push(productId);
  else wishlist.splice(index, 1);
  saveWishlist(wishlist);
  return [...wishlist]; 
};

export const getWishlist = () => loadWishlist();

export const isInWishlist = (productId) => {
  const wishlist = loadWishlist();
  return wishlist.includes(productId);
};