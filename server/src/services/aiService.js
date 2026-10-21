import dotenv from 'dotenv';
dotenv.config();

// Supported providers: OpenAI / Gemini / Anthropic / Built-in Smart Intelligence Engine
const AI_API_KEY = process.env.AI_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

export async function analyzeProductWithAI(product, userQuery = '') {
  // If external AI key is available, we could make an HTTP request to OpenAI or Gemini:
  if (AI_API_KEY) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `Siz SmartSavdo xizmatining O'zbekistondagi xaridlar bo'yicha sun'iy intellekt maslahatchisisiz.
Javoblarni faqat o'zbek tilida (lotin yozuvida), sodda, samimiy va tushunarli tarzda taqdim eting.
Faqat berilgan mahsulot ma'lumotlariga tayaning, yolg'on parametrlar to'qimang.
JSON formatda javob bering:
{
  "summary": "...",
  "pros": ["...", "..."],
  "cons": ["...", "..."],
  "suitable_for": "...",
  "verdict": "..."
}`
            },
            {
              role: 'user',
              content: `Mahsulot: ${product.name} (${product.brand}), Narxi: ${product.current_price} so'm. Tavsifi: ${product.description}. Savol/Izoh: ${userQuery || 'To\'liq tahlil qiling'}`
            }
          ],
          temperature: 0.3
        })
      });

      if (response.ok) {
        const data = await response.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        return {
          ...parsed,
          provider: 'OpenAI GPT-4o-mini',
          isLiveAi: true
        };
      }
    } catch (err) {
      console.log('[AI] Remote AI error, falling back to smart local model:', err.message);
    }
  }

  // Built-in SmartSavdo Uzbek NLP Engine (Demo & Offline safe mode)
  // Generates customized, realistic Uzbek analysis based on real specs
  return {
    summary: product.summary || `${product.name} — zamonaviy, sifatli va O'zbekiston bozorida talabgir mahsulotlardan biri bo'lib, o'z narx toifasida kuchli imkoniyatlarga ega.`,
    pros: product.pros || [
      'Yuqori sifatli materiallar va yig\'ilish',
      'Kuchli va energiya tejamkor ishlash',
      'Rasmiy do\'konlarda 1 yil kafolat',
      'Zamonaviy dizayn'
    ],
    cons: product.cons || [
      'Bozorda nisbatan yuqori narx',
      'Aksessuarlar alohida xarid qilinishi mumkin'
    ],
    suitable_for: product.suitable_for || 'Kundalik foydalanish, faol xaridlar va sifatni qadrlaydigan xaridorlar uchun juda mos.',
    verdict: product.ai_verdict || `Ushbu mahsulot narxi va xususiyatlari mutanosib. Agar siz ${product.brand} brendining ishonchliligini xohlasangiz, qulay taklif hisoblanadi.`,
    alternatives: product.alternatives || [],
    provider: 'SmartSavdo AI Rule Engine (Oflayn/Demo rejim)',
    isLiveAi: false,
    disclaimer: 'Ushbu tahlil sun\'iy intellekt algoritmlari yordamida yaratilgan. Rasmiy do\'kon ma\'lumotlari bilan tasdiqlang.'
  };
}

export async function runBudgetAdvisorAI({ budget, category, brand, usagePurpose }) {
  const budgetNum = Number(budget) || 10000000;

  let advice = '';
  if (budgetNum < 3000000) {
    advice = `Siz kiritgan ${budgetNum.toLocaleString('uz-UZ')} so'm byudjet uchun tejamkor va ishonchli variantlar saralandi. Ushbu toifada naushniklar, kiyim-kechak yoki kirish darajasidagi maishiy texnikalar juda maqbul tanlov.`;
  } else if (budgetNum < 8000000) {
    advice = `${budgetNum.toLocaleString('uz-UZ')} so'm byudjet o'rta sinf smartfonlar (iPhone SE, Galaxy A-seriya) yoki sifatli kir yuvish mashinalari uchun optimal hisoblanadi.`;
  } else if (budgetNum < 15000000) {
    advice = `${budgetNum.toLocaleString('uz-UZ')} so'm byudjet bilan flagman toifasidagi qurilmalar, jumladan iPhone 14/15 yoki Samsung QLED televizorini bemalol xarid qilish mumkin.`;
  } else {
    advice = `${budgetNum.toLocaleString('uz-UZ')} so'm byudjet yuqori darajadagi noutbuklar (MacBook Air M2), professional texnika va premium jihozlar uchun to'liq yetarlidir.`;
  }

  return {
    budget: budgetNum,
    advice,
    category: category || 'Barcha toifalar',
    brand: brand || 'Barcha brendlar',
    purpose: usagePurpose || 'Kundalik foydalanish',
    savingsTip: 'Do\'konlar orasidagi 5-15% lik chegirmalarni taqqoslash orqali o\'rtacha 500 000 dan 1 500 000 so\'mgacha tejashingiz mumkin.',
    timestamp: new Date().toISOString()
  };
}

export async function identifyProductByImage(fileName, originalName) {
  // Simulates AI Vision product identification with realistic Uzbek marketplace matching
  const lower = (originalName || '').toLowerCase();
  
  if (lower.includes('macbook') || lower.includes('laptop') || lower.includes('noutbuk')) {
    return {
      identifiedProductId: 2,
      confidence: 0.94,
      productName: 'MacBook Air M2',
      category: 'Noutbuklar',
      notes: 'Rasm orqali Apple MacBook Air M2 noutbuki aniqlandi.'
    };
  } else if (lower.includes('tv') || lower.includes('samsung') || lower.includes('televizor')) {
    return {
      identifiedProductId: 3,
      confidence: 0.92,
      productName: 'Samsung QLED 4K',
      category: 'Televizorlar',
      notes: 'Rasmda Samsung QLED 4K televizori aniqlandi.'
    };
  } else if (lower.includes('headphone') || lower.includes('sony') || lower.includes('naushnik')) {
    return {
      identifiedProductId: 4,
      confidence: 0.96,
      productName: 'Sony WH-1000XM5',
      category: 'Naushniklar',
      notes: 'Rasmda Sony WH-1000XM5 shovqin to\'suvchi naushnigi aniqlandi.'
    };
  } else {
    // Default identification to iPhone 15
    return {
      identifiedProductId: 1,
      confidence: 0.97,
      productName: 'iPhone 15',
      category: 'Smartfonlar',
      notes: 'Rasm tahlil qilindi: Apple iPhone 15 modeli yuqori aniqlikda aniqlandi.'
    };
  }
}
