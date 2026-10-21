import { db } from '../database/db.js';

export async function getProducts(req, res) {
  try {
    const { category, minPrice, maxPrice, sort } = req.query;
    if (category || minPrice || maxPrice || sort) {
      const filtered = await db.searchProducts({ category, minPrice, maxPrice, sort });
      return res.json({ success: true, count: filtered.length, data: filtered });
    }
    const products = await db.getAllProducts();
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await db.getProductById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Mahsulot topilmadi' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function searchProducts(req, res) {
  try {
    const { query, category, minPrice, maxPrice, sort } = req.body;
    const results = await db.searchProducts({ query, category, minPrice, maxPrice, sort });
    res.json({ success: true, count: results.length, data: results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getPriceHistory(req, res) {
  try {
    const { id } = req.params;
    const { days = 30 } = req.query;
    const history = await db.getPriceHistory(id, days);
    res.json({ success: true, data: history });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getOffers(req, res) {
  try {
    const { productId } = req.query;
    const offers = await db.getOffers(productId || 1);
    res.json({ success: true, count: offers.length, data: offers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getFavorites(req, res) {
  try {
    const favs = await db.getFavorites();
    res.json({ success: true, data: favs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function toggleFavorite(req, res) {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, message: 'productId talab qilinadi' });
    }
    const result = await db.toggleFavorite(productId);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getComparisons(req, res) {
  try {
    const list = await db.getComparisons();
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function addComparison(req, res) {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: 'productId kerak' });
    const list = await db.addComparison(productId);
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function removeComparison(req, res) {
  try {
    const { productId } = req.params;
    const list = await db.removeComparison(productId);
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function createPriceAlert(req, res) {
  try {
    const { productId, targetPrice, contact } = req.body;
    if (!productId || !targetPrice || !contact) {
      return res.status(400).json({ success: false, message: 'Ma\'lumotlar to\'liq emas' });
    }
    const alert = await db.addPriceAlert({ productId, targetPrice, contact });
    res.json({ success: true, message: 'Narx bildirishnomasi faollashtirildi!', data: alert });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getStores(req, res) {
  try {
    const stores = await db.getStores();
    res.json({ success: true, data: stores });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
