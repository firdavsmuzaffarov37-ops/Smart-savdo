import { db } from '../database/db.js';
import { analyzeProductWithAI, runBudgetAdvisorAI, identifyProductByImage } from '../services/aiService.js';

export async function analyzeProduct(req, res) {
  try {
    const { productId, query } = req.body;
    let product;
    if (productId) {
      product = await db.getProductById(productId);
    }
    if (!product) {
      // default product is iPhone 15
      product = await db.getProductById(1);
    }

    const aiAnalysis = await analyzeProductWithAI(product, query);
    res.json({
      success: true,
      productId: product.id,
      productName: product.name,
      analysis: aiAnalysis
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function budgetAdvisor(req, res) {
  try {
    const { budget, category, brand, usagePurpose } = req.body;
    const adviceResult = await runBudgetAdvisorAI({ budget, category, brand, usagePurpose });

    // Filter matching products from database within budget
    const budgetNum = Number(budget) || 12000000;
    const allProducts = await db.getAllProducts();
    const matchingProducts = allProducts.filter(p => p.current_price <= budgetNum);

    res.json({
      success: true,
      data: {
        advice: adviceResult,
        products: matchingProducts
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function uploadAndIdentify(req, res) {
  try {
    const file = req.file;
    const originalName = file ? file.originalname : req.body.fileName || 'iphone.jpg';

    const identified = await identifyProductByImage(file ? file.filename : '', originalName);
    const product = await db.getProductById(identified.identifiedProductId);

    res.json({
      success: true,
      identified,
      product
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
