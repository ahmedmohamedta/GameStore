// api.js - يعمل بدون Backend

// تحميل المنتجات الافتراضية من ملف JSON العام (موجود في public/data/products.json)
const loadDefaultProducts = async () => {
  try {
    const response = await fetch('/data/products.json');
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('❌ فشل تحميل المنتجات الافتراضية:', error);
    return [];
  }
};

// دالة جلب المنتجات
export const fetchProducts = async () => {
  let products = localStorage.getItem('products');
  if (products) {
    const parsed = JSON.parse(products);
    if (parsed.length) {
      console.log('✅ جلب المنتجات من localStorage');
      return parsed;
    }
  }
  // لا توجد منتجات في localStorage -> جلب من الملف الافتراضي
  const defaultProducts = await loadDefaultProducts();
  if (defaultProducts.length) {
    localStorage.setItem('products', JSON.stringify(defaultProducts));
    console.log('✅ تحميل المنتجات الافتراضية وتخزينها في localStorage');
    return defaultProducts;
  }
  return [];
};

// دالة جلب منتج واحد
export const fetchProductById = async (id) => {
  const products = await fetchProducts();
  const product = products.find(p => p.id === parseInt(id));
  return product || null;
};

// دالة تحديث localStorage بعد التعديل من الأدمن (تستخدمها Admin.jsx)
export const refreshProductsCache = async () => {
  // لا حاجة لاستدعاء API، فقط نقرأ من localStorage
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  return products;
};