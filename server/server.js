const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const multer = require('multer');
const path = require('path');

// إعداد تخزين الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // حفظ في مجلد uploads
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// نقطة نهاية لرفع الصورة
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'لم يتم رفع أي ملف' });
  // إرجاع رابط الصورة (نفترض أن الخادم يخدم المجلد uploads كملفات ثابتة)
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

// خدمة المجلد uploads كملفات ثابتة
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter); // محمية

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});