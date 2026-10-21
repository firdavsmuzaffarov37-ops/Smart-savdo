import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  getProducts,
  getProductById,
  searchProducts,
  getPriceHistory,
  getOffers,
  getFavorites,
  toggleFavorite,
  getComparisons,
  addComparison,
  removeComparison,
  createPriceAlert,
  getStores
} from '../controllers/productController.js';
import {
  analyzeProduct,
  budgetAdvisor,
  uploadAndIdentify
} from '../controllers/aiController.js';

const router = express.Router();

// Multer storage for image search uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Faqat rasm fayllari (JPG, PNG, WEBP) qabul qilinadi'), false);
    }
  }
});

// Products routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products/search', searchProducts);
router.get('/products/:id/price-history', getPriceHistory);

// Store offers
router.get('/stores', getStores);
router.get('/offers', getOffers);

// Favorites
router.get('/favorites', getFavorites);
router.post('/favorites', toggleFavorite);

// Comparisons
router.get('/comparisons', getComparisons);
router.post('/comparisons', addComparison);
router.delete('/comparisons/:productId', removeComparison);

// Price Alerts
router.post('/price-alerts', createPriceAlert);

// AI Integration routes
router.post('/ai/analyze', analyzeProduct);
router.post('/ai/budget-advisor', budgetAdvisor);
router.post('/ai/upload-search', upload.single('image'), uploadAndIdentify);

export default router;
