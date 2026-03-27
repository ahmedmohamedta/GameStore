const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');

// قراءة المنتجات من ملف JSON
const getProducts = () => {
  const data = fs.readFileSync(productsPath);
  return JSON.parse(data);
};

// GET /api/products - جميع المنتجات
router.get('/', (req, res) => {
  const products = getProducts();
  res.json(products);
});

// GET /api/products/:id - منتج واحد
router.get('/:id', (req, res) => {
  const products = getProducts();
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;