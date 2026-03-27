const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

const getProducts = () => {
  const data = fs.readFileSync(productsFilePath);
  return JSON.parse(data);
};

const saveProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

// جميع المسارات أدناه تتطلب token و admin
router.use(verifyToken, verifyAdmin);

// إضافة منتج جديد
router.post('/products', (req, res) => {
  const products = getProducts();
  const newProduct = {
    id: products.length + 1,
    ...req.body,
  };
  products.push(newProduct);
  saveProducts(products);
  res.status(201).json(newProduct);
});

// تعديل منتج
router.put('/products/:id', (req, res) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  products[index] = { ...products[index], ...req.body };
  saveProducts(products);
  res.json(products[index]);
});

// حذف منتج
router.delete('/products/:id', (req, res) => {
  const products = getProducts();
  const newProducts = products.filter(p => p.id !== parseInt(req.params.id));
  if (newProducts.length === products.length) {
    return res.status(404).json({ message: 'Product not found' });
  }
  saveProducts(newProducts);
  res.json({ message: 'Product deleted' });
});

module.exports = router;