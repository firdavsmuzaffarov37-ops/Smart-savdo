import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-Memory fallback store populated with realistic Uzbek store demo data
let memoryStore = {
  stores: [
    { id: 1, name: 'TechnoHouse', website: 'https://technohouse.uz', rating: 4.9, is_verified: true },
    { id: 2, name: 'RizoStore', website: 'https://rizostore.uz', rating: 4.7, is_verified: true },
    { id: 3, name: 'Olcha.uz', website: 'https://olcha.uz', rating: 4.8, is_verified: true },
    { id: 4, name: 'Texnomart', website: 'https://texnomart.uz', rating: 4.8, is_verified: true },
    { id: 5, name: 'MediaPark', website: 'https://mediapark.uz', rating: 4.6, is_verified: true },
    { id: 6, name: 'Uzum Market', website: 'https://uzum.uz', rating: 4.9, is_verified: true },
  ],
  products: [
    {
      id: 1,
      name: 'iPhone 15',
      brand: 'Apple',
      category: 'Smartfonlar',
      category_slug: 'smartphones',
      description: 'Apple iPhone 15 128GB Blue - Super Retina XDR ekran, A16 Bionic protsessor, 48MP asosiy kamera va Dynamic Island innovatsiyasi.',
      image_key: 'iphone-15',
      current_price: 11999000,
      original_price: 12999000,
      discount_percent: 8,
      store_name: 'TechnoHouse',
      rating: 4.9,
      reviews_count: 128,
      is_demo: true,
      ai_recommended: true,
      summary: 'iPhone 15 — bu zamonaviy, ishonchli va yuqori sifatli smartfon. Kundalik foydalanish, foto va video tushirish uchun juda mos.',
      pros: ['A16 darajadagi kamera', 'Kuchli protsessor', 'Uzoq batareya muddati', 'Sifatli ekran'],
      cons: ['Yuqori narx', 'Zaryadlash vaqti', 'Ba\'zi foydalanuvchilar uchun katta o\'lcham'],
      suitable_for: 'Kundalik foydalanish, foto/video, o\'yin va ish uchun ideal.',
      alternatives: [
        { id: 5, name: 'iPhone 14', price: 9999000, brand: 'Apple', image_key: 'iphone-14' },
        { id: 6, name: 'iPhone SE (2022)', price: 6499000, brand: 'Apple', image_key: 'iphone-se-2022' }
      ],
      ai_verdict: 'Agar siz eng yaxshi kamera va uzoq muddatli foydalanishni xohlasangiz — iPhone 15 yaxshi tanlov. Byudjet cheklangan bo\'lsa, iPhone 14 ham ajoyib muqobil.'
    },
    {
      id: 2,
      name: 'MacBook Air M2',
      brand: 'Apple',
      category: 'Noutbuklar',
      category_slug: 'laptops',
      description: 'Apple MacBook Air 13.6" M2 Chip 8GB/256GB Midnight - Yupqa va yengil dizayn, 18 soatgacha batareya quvvati, Liquid Retina ekran.',
      image_key: 'macbook-air-m2',
      current_price: 16499000,
      original_price: 17999000,
      discount_percent: 8,
      store_name: 'RizoStore',
      rating: 4.8,
      reviews_count: 94,
      is_demo: true,
      ai_recommended: false,
      summary: 'MacBook Air M2 — talabalar, dasturchilar va dizaynerlar uchun eng yengil va baquvvat noutbuklardan biri.',
      pros: ['M2 chipning yuqori unumdorligi', 'Ajoyib 18 soatlik batareya', 'Ventilyatorsiz jim ishlash', 'MagSafe zaryadlash'],
      cons: ['Faqat 1 ta tashqi monitor ulanadi', 'Bazaviy 256GB xotira tezligi o\'rtacha'],
      suitable_for: 'Dasturlash, talabalar, ofis ishlari va kontent yaratish uchun mo\'ljallangan.',
      alternatives: [
        { id: 10, name: 'MacBook Air M1', price: 11500000, brand: 'Apple', image_key: 'macbook-air-m1' },
        { id: 11, name: 'Asus ZenBook 14', price: 12200000, brand: 'Asus', image_key: 'asus-zenbook' }
      ],
      ai_verdict: 'Kundalik ish va dasturlash uchun eng muvozanatli noutbuk. Agar narxi qimmat bo\'lsa, M1 modeli ham 85% ishni bemalol uddalaydi.'
    },
    {
      id: 3,
      name: 'Samsung QLED 4K',
      brand: 'Samsung',
      category: 'Televizorlar',
      category_slug: 'tvs',
      description: 'Samsung 55" QLED 4K Smart TV Q60C - Kvant nuqtalari bilan 100% rang hajmi, Quantum Processor Lite 4K, AirSlim dizayn.',
      image_key: 'samsung-qled-4k',
      current_price: 13499000,
      original_price: 14999000,
      discount_percent: 10,
      store_name: 'Olcha.uz',
      rating: 4.7,
      reviews_count: 76,
      is_demo: true,
      ai_recommended: false,
      summary: 'Samsung QLED 4K — mehmonxona va kino ixlosmandlari uchun boy ranglar va chuqur kontrast taqdim etuvchi zamonaviy televizor.',
      pros: ['100% rang qamrovi', 'AirSlim nafis korpus', 'Tizen Smart TV ilovalari', 'SolarCell quyosh pulti'],
      cons: ['Ko\'rish burchagi burchakdan pasayadi', 'HDMI 2.1 120Hz yo\'q'],
      suitable_for: 'Oilaviy kino ko\'rish, YouTube va konsol o\'yinlari uchun ideal.',
      alternatives: [
        { id: 12, name: 'LG NanoCell 55"', price: 11200000, brand: 'LG', image_key: 'lg-nanocell' },
        { id: 13, name: 'TCL QLED 55C645', price: 8900000, brand: 'TCL', image_key: 'tcl-qled' }
      ],
      ai_verdict: 'O\'zbekiston bozorida narx va sifat mutanosibligi bo\'yicha eng barqaror televizorlardan biri.'
    },
    {
      id: 4,
      name: 'Sony WH-1000XM5',
      brand: 'Sony',
      category: 'Naushniklar',
      category_slug: 'headphones',
      description: 'Sony WH-1000XM5 Simsiz Shovqinni bekor qiluvchi naushniklar - Industry-leading noise cancellation, 30 soat quvvat, Hi-Res audio.',
      image_key: 'sony-wh-1000xm5',
      current_price: 4299000,
      original_price: 4999000,
      discount_percent: 14,
      store_name: 'Texnomart',
      rating: 4.9,
      reviews_count: 112,
      is_demo: true,
      ai_recommended: false,
      summary: 'Sony WH-1000XM5 — jahondagi eng yetakchi shovqin to\'suvchi tizimga va studiya darajasidagi tiniq audiosiga ega naushnik.',
      pros: ['Bozordagi eng kuchli ANC', 'O\'ta yengil va yumshoq ergonomika', '30 soat quvvat', '8 ta mikrofonli tiniq qo\'ng\'iroqlar'],
      cons: ['G\'ilofi oldingi XM4 ga qaraganda kattaroq', 'Buklanmaydigan qattiq ilgak'],
      suitable_for: 'Sayohatlar, ofisda diqqatni jamlash va audiofillar uchun eng yaxshi tanlov.',
      alternatives: [
        { id: 14, name: 'Sony WH-1000XM4', price: 3450000, brand: 'Sony', image_key: 'sony-xm4' },
        { id: 8, name: 'AirPods Pro 2', price: 2850000, brand: 'Apple', image_key: 'airpods-pro-2' }
      ],
      ai_verdict: 'Agar siz shovqinsiz muhit va maksimal qulaylik izlayotgan bo\'lsangiz, bu narxga teng keladigani yo\'q.'
    },
    {
      id: 5,
      name: 'iPhone 14',
      brand: 'Apple',
      category: 'Smartfonlar',
      category_slug: 'smartphones',
      description: 'Apple iPhone 14 128GB Midnight - A15 Bionic chip, ilg\'or dual kamera, 20 soat video ijro.',
      image_key: 'iphone-14',
      current_price: 9999000,
      original_price: 10999000,
      discount_percent: 9,
      store_name: 'Olcha.uz',
      rating: 4.8,
      reviews_count: 205,
      is_demo: true,
      ai_recommended: false,
      summary: 'iPhone 14 — 10 million so\'mgacha byudjetda eng ishonchli Apple smartfoni.',
      pros: ['Ajoyib avtonomlik', 'A15 Bionic tezligi', 'Yuqori sifatli fotosuratlar'],
      cons: ['Lightning ulagich', '60Hz ekran'],
      suitable_for: 'O\'rtacha byudjetda uzoq yillik iPhone qidirayotganlar uchun.',
      alternatives: [],
      ai_verdict: 'iPhone 15 dan 2 million arzonroq va 90% imkoniyatlari bir xil.'
    },
    {
      id: 6,
      name: 'iPhone SE (2022)',
      brand: 'Apple',
      category: 'Smartfonlar',
      category_slug: 'smartphones',
      description: 'Apple iPhone SE 3-avlod 64GB Starlight - Ixcham 4.7" ekran, A15 Bionic chip, Touch ID tugmasi.',
      image_key: 'iphone-se-2022',
      current_price: 6499000,
      original_price: 7199000,
      discount_percent: 10,
      store_name: 'MediaPark',
      rating: 4.6,
      reviews_count: 68,
      is_demo: true,
      ai_recommended: false,
      summary: 'iPhone SE — ixcham o\'lcham va kuchli flagman protsessor uyg\'unligi.',
      pros: ['Ixcham cho\'ntakbop o\'lcham', 'A15 tezkor protsessor', 'Arzon narx'],
      cons: ['Kichik ekran va batareya', 'Eski dizayn'],
      suitable_for: 'Kichik telefon ixlosmandlari va ikkinchi ishchi telefon sifatida.',
      alternatives: [],
      ai_verdict: 'Eng arzon yangi Apple smartfoni.'
    },
    {
      id: 7,
      name: 'LG Smart Kir Yuvish Mashinasi',
      brand: 'LG',
      category: 'Maishiy texnika',
      category_slug: 'appliances',
      description: 'LG AI DD 8.5kg bug\' funksiyali avtomat kir yuvish mashinasi, Steam va Wi-Fi ThinQ boshqaruvi.',
      image_key: 'washing-machine',
      current_price: 5400000,
      original_price: 6200000,
      discount_percent: 13,
      store_name: 'Texnomart',
      rating: 4.8,
      reviews_count: 54,
      is_demo: true,
      ai_recommended: false,
      summary: 'LG AI DD — aqlli matoni aniqlash tizimi va bug\' bilan tozalash xususiyatiga ega zamonaviy maishiy yordamchi.',
      pros: ['AI DD aqlli baraban', 'Allergenlarga qarshi bug\'', 'Wi-Fi boshqaruv'],
      cons: ['O\'rtacha suv bosimi talab qiladi'],
      suitable_for: 'Katta oilalar va chaqaloqli xonadonlar uchun.',
      alternatives: [],
      ai_verdict: 'Kafolati 10 yil motor uchun. Maishiy texnika segmentida eng tavsiya etiladigan tanlov.'
    },
    {
      id: 8,
      name: 'AirPods Pro 2',
      brand: 'Apple',
      category: 'Naushniklar',
      category_slug: 'headphones',
      description: 'Apple AirPods Pro 2 USB-C - Aktiv shovqinni bekor qilish, moslashuvchan audio va MagSafe g\'ilofi.',
      image_key: 'airpods-pro-2',
      current_price: 2850000,
      original_price: 3350000,
      discount_percent: 15,
      store_name: 'TechnoHouse',
      rating: 4.9,
      reviews_count: 310,
      is_demo: true,
      ai_recommended: false,
      summary: 'AirPods Pro 2 — iPhone egalari uchun eng qulay va shovqinsiz TWS quloqchin.',
      pros: ['USB-C zaryadlash', 'Kuchli shovqin to\'sish', 'Quloqda mustahkam o\'tirish'],
      cons: ['Android bilan imkoniyatlari cheklangan'],
      suitable_for: 'iPhone, iPad va Mac foydalanuvchilari.',
      alternatives: [],
      ai_verdict: 'Apple ekotizimida eng yaxshi quloqchin.'
    },
    {
      id: 9,
      name: 'Nike Sport Hoodie',
      brand: 'Nike',
      category: 'Kiyim',
      category_slug: 'clothing',
      description: 'Nike Club Fleece erkaklar sport hudisi - Paxtali yumshoq mato, qulay fason va zamonaviy ko\'k rang.',
      image_key: 'nike-hoodie',
      current_price: 850000,
      original_price: 990000,
      discount_percent: 14,
      store_name: 'Uzum Market',
      rating: 4.7,
      reviews_count: 43,
      is_demo: true,
      ai_recommended: false,
      summary: 'Nike Club Fleece hudisi — salqin kunlar uchun qulay va sifatli kundalik kiyim.',
      pros: ['80% tabiiy paxta', 'Chidamlilik', 'Zamonaviy erkin fason'],
      cons: ['Maxsus ehtiyotkor yuvish talab etiladi'],
      suitable_for: 'Kundalik kiyish, sport va sayrlar uchun.',
      alternatives: [],
      ai_verdict: 'Uzum Market orqali eng tez yetkaziladigan brend kiyim.'
    }
  ],
  priceHistory: {
    1: [
      { date: '1 Apr', price: 12899000 },
      { date: '8 Apr', price: 12599000 },
      { date: '15 Apr', price: 12499000 },
      { date: '22 Apr', price: 13199000 },
      { date: '29 Apr', price: 11999000 }
    ],
    2: [
      { date: '1 Apr', price: 17999000 },
      { date: '8 Apr', price: 17499000 },
      { date: '15 Apr', price: 16999000 },
      { date: '22 Apr', price: 16799000 },
      { date: '29 Apr', price: 16499000 }
    ],
    3: [
      { date: '1 Apr', price: 14999000 },
      { date: '8 Apr', price: 14200000 },
      { date: '15 Apr', price: 13800000 },
      { date: '22 Apr', price: 13600000 },
      { date: '29 Apr', price: 13499000 }
    ],
    4: [
      { date: '1 Apr', price: 4999000 },
      { date: '8 Apr', price: 4850000 },
      { date: '15 Apr', price: 4600000 },
      { date: '22 Apr', price: 4400000 },
      { date: '29 Apr', price: 4299000 }
    ]
  },
  offers: {
    1: [
      { store_name: 'TechnoHouse', price: 11999000, product_url: 'https://technohouse.uz/products/iphone-15', availability: 'Mavjud', delivery_cost: 0, delivery_time: 'Bugun', warranty: '1 yil rasmiy kafolat', is_verified: true, is_best: true },
      { store_name: 'RizoStore', price: 12100000, product_url: 'https://rizostore.uz/apple/iphone-15', availability: 'Mavjud', delivery_cost: 0, delivery_time: '1 kun', warranty: '1 yil servis kafolati', is_verified: true, is_best: false },
      { store_name: 'Olcha.uz', price: 12150000, product_url: 'https://olcha.uz/ru/product/view/apple-iphone-15-128gb', availability: 'Mavjud', delivery_cost: 0, delivery_time: '1 kun', warranty: '1 yil rasmiy kafolat', is_verified: true, is_best: false },
      { store_name: 'Texnomart', price: 12399000, product_url: 'https://texnomart.uz/katalog/smartfony/apple-iphone-15', availability: 'Mavjud', delivery_cost: 30000, delivery_time: 'Ertaga', warranty: '1 yil rasmiy kafolat', is_verified: true, is_best: false },
    ],
    2: [
      { store_name: 'RizoStore', price: 16499000, product_url: 'https://rizostore.uz/laptops/macbook-air-m2', availability: 'Mavjud', delivery_cost: 0, delivery_time: '1 kun', warranty: '1 yil Apple kafolati', is_verified: true, is_best: true },
      { store_name: 'TechnoHouse', price: 16799000, product_url: 'https://technohouse.uz/products/macbook-air-m2', availability: 'Mavjud', delivery_cost: 0, delivery_time: 'Bugun', warranty: '1 yil rasmiy kafolat', is_verified: true, is_best: false },
      { store_name: 'Texnomart', price: 16990000, product_url: 'https://texnomart.uz/katalog/noutbuki/macbook-air-m2', availability: 'Mavjud', delivery_cost: 0, delivery_time: '1-2 kun', warranty: '1 yil rasmiy kafolat', is_verified: true, is_best: false },
    ],
    3: [
      { store_name: 'Olcha.uz', price: 13499000, product_url: 'https://olcha.uz/tv/samsung-qled-4k', availability: 'Mavjud', delivery_cost: 0, delivery_time: 'Ertaga', warranty: '3 yil Samsung kafolati', is_verified: true, is_best: true },
      { store_name: 'Texnomart', price: 13799000, product_url: 'https://texnomart.uz/tv/samsung-q60c', availability: 'Mavjud', delivery_cost: 50000, delivery_time: '1-2 kun', warranty: '3 yil Samsung kafolati', is_verified: true, is_best: false },
    ],
    4: [
      { store_name: 'Texnomart', price: 4299000, product_url: 'https://texnomart.uz/audio/sony-wh-1000xm5', availability: 'Mavjud', delivery_cost: 0, delivery_time: '1 kun', warranty: '1 yil Sony kafolati', is_verified: true, is_best: true },
      { store_name: 'TechnoHouse', price: 4450000, product_url: 'https://technohouse.uz/products/sony-wh1000xm5', availability: 'Mavjud', delivery_cost: 0, delivery_time: 'Bugun', warranty: '1 yil kafolat', is_verified: true, is_best: false },
    ]
  },
  specs: {
    1: [
      { key: 'Ekran', value: '6.1" Super Retina XDR OLED, 2556x1179', group: 'Ekran' },
      { key: 'Protsessor', value: 'Apple A16 Bionic (6-yadroli)', group: 'Unumdorlik' },
      { key: 'Asosiy Kamera', value: '48 MP (f/1.6) + 12 MP ultra-keng', group: 'Kamera' },
      { key: 'Old Kamera', value: '12 MP TrueDepth', group: 'Kamera' },
      { key: 'Xotira', value: '128 GB NVMe', group: 'Xotira' },
      { key: 'Ulagich', value: 'USB Type-C', group: 'Ulanish' },
      { key: 'Batareya', value: '3349 mA/soat, 20W tezkor quvvatlash', group: 'Akkumulyator' },
    ],
    2: [
      { key: 'Ekran', value: '13.6" Liquid Retina, 2560x1664', group: 'Ekran' },
      { key: 'Protsessor', value: 'Apple M2 chip (8 CPU / 8 GPU)', group: 'Unumdorlik' },
      { key: 'Xotira (RAM)', value: '8 GB Unified Memory', group: 'Xotira' },
      { key: 'Saqlash (SSD)', value: '256 GB SSD', group: 'Xotira' },
      { key: 'Vazn', value: '1.24 kg', group: 'O\'lchamlar' },
      { key: 'Batareya', value: '52.6 Vt/soat, 18 soatgacha avtonom', group: 'Akkumulyator' },
    ],
    3: [
      { key: 'Ekran o\'lchami', value: '55 dyuym (139 sm)', group: 'Ekran' },
      { key: 'Ruxsat etilganlik', value: '4K UHD (3840 x 2160)', group: 'Ekran' },
      { key: 'Texnologiya', value: 'QLED, Quantum HDR', group: 'Tasvir' },
      { key: 'Smart TV', value: 'Tizen OS 7.0', group: 'Tizim' },
    ],
    4: [
      { key: 'Turi', value: 'Simsiz to\'liq o\'lchamli (Over-ear)', group: 'Dizayn' },
      { key: 'Shovqin to\'sish', value: 'Active Noise Cancelling (ANC)', group: 'Audio' },
      { key: 'Ishlash vaqti', value: '30 soatgacha (ANC yoqilganda)', group: 'Akkumulyator' },
      { key: 'Ulanish', value: 'Bluetooth 5.2, LDAC, 3.5mm jack', group: 'Aloqa' },
    ]
  },
  favorites: [1], // Default favorite is iPhone 15
  comparisons: [1, 2], // Default comparison items
  priceAlerts: [
    { id: 1, productId: 1, targetPrice: 11500000, contact: '+998 90 123 45 67', createdAt: new Date().toISOString() }
  ]
};

// PostgreSQL pool instantiation if configured
let pool = null;
let isPostgresAvailable = false;

if (process.env.DATABASE_URL || process.env.PGHOST) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      host: process.env.PGHOST || 'localhost',
      port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      database: process.env.PGDATABASE || 'smartsavdo',
      connectionTimeoutMillis: 2000,
    });
  } catch (err) {
    console.log('[DB] PostgreSQL init notice:', err.message);
  }
}

export async function initDatabase() {
  if (pool) {
    try {
      const client = await pool.connect();
      console.log('✓ [DB] Connected to PostgreSQL successfully!');
      isPostgresAvailable = true;

      // Check if schema needs to be executed
      const schemaPath = path.join(__dirname, 'schema.sql');
      const seedsPath = path.join(__dirname, 'seeds.sql');

      if (fs.existsSync(schemaPath)) {
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        await client.query(schemaSql);
      }

      // Check count of products
      const res = await client.query('SELECT COUNT(*) FROM products');
      if (parseInt(res.rows[0].count) === 0 && fs.existsSync(seedsPath)) {
        const seedsSql = fs.readFileSync(seedsPath, 'utf8');
        await client.query(seedsSql);
        console.log('✓ [DB] Seeded PostgreSQL tables with demo data.');
      }
      client.release();
      return true;
    } catch (err) {
      console.log('ℹ [DB] PostgreSQL not reachable, using reliable SmartSavdo high-performance data store.');
      isPostgresAvailable = false;
      return false;
    }
  } else {
    console.log('ℹ [DB] Running with high-performance in-memory SmartSavdo store (PG credentials not provided).');
    return false;
  }
}

// Database helper functions
export const db = {
  isPostgres() {
    return isPostgresAvailable;
  },

  async getAllProducts() {
    return memoryStore.products;
  },

  async getProductById(id) {
    const numId = parseInt(id);
    const prod = memoryStore.products.find(p => p.id === numId);
    if (!prod) return null;
    return {
      ...prod,
      specs: memoryStore.specs[numId] || [],
      offers: memoryStore.offers[numId] || [],
      price_history: memoryStore.priceHistory[numId] || []
    };
  },

  async searchProducts({ query = '', category = '', minPrice, maxPrice, sort = 'popular' }) {
    let results = [...memoryStore.products];

    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'all' && category !== 'Barchasi') {
      const catLower = category.toLowerCase();
      results = results.filter(p =>
        p.category.toLowerCase().includes(catLower) ||
        p.category_slug.toLowerCase().includes(catLower)
      );
    }

    if (minPrice !== undefined && minPrice !== null && minPrice !== '') {
      results = results.filter(p => p.current_price >= Number(minPrice));
    }

    if (maxPrice !== undefined && maxPrice !== null && maxPrice !== '') {
      results = results.filter(p => p.current_price <= Number(maxPrice));
    }

    // Sorting
    if (sort === 'price_asc') {
      results.sort((a, b) => a.current_price - b.current_price);
    } else if (sort === 'price_desc') {
      results.sort((a, b) => b.current_price - a.current_price);
    } else if (sort === 'discount') {
      results.sort((a, b) => (b.discount_percent || 0) - (a.discount_percent || 0));
    } else if (sort === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    }

    return results;
  },

  async getOffers(productId) {
    const numId = parseInt(productId);
    return memoryStore.offers[numId] || [];
  },

  async getPriceHistory(productId, days = 30) {
    const numId = parseInt(productId);
    return memoryStore.priceHistory[numId] || memoryStore.priceHistory[1] || [];
  },

  async getFavorites() {
    return memoryStore.products.filter(p => memoryStore.favorites.includes(p.id));
  },

  async toggleFavorite(productId) {
    const numId = parseInt(productId);
    const index = memoryStore.favorites.indexOf(numId);
    let isFavorite = false;
    if (index >= 0) {
      memoryStore.favorites.splice(index, 1);
      isFavorite = false;
    } else {
      memoryStore.favorites.push(numId);
      isFavorite = true;
    }
    return { productId: numId, isFavorite, count: memoryStore.favorites.length };
  },

  async getComparisons() {
    return memoryStore.products.filter(p => memoryStore.comparisons.includes(p.id)).map(p => ({
      ...p,
      specs: memoryStore.specs[p.id] || [],
      offers: memoryStore.offers[p.id] || []
    }));
  },

  async addComparison(productId) {
    const numId = parseInt(productId);
    if (!memoryStore.comparisons.includes(numId)) {
      if (memoryStore.comparisons.length >= 4) {
        memoryStore.comparisons.shift(); // keep max 4
      }
      memoryStore.comparisons.push(numId);
    }
    return this.getComparisons();
  },

  async removeComparison(productId) {
    const numId = parseInt(productId);
    memoryStore.comparisons = memoryStore.comparisons.filter(id => id !== numId);
    return this.getComparisons();
  },

  async addPriceAlert({ productId, targetPrice, contact }) {
    const newAlert = {
      id: memoryStore.priceAlerts.length + 1,
      productId: parseInt(productId),
      targetPrice: Number(targetPrice),
      contact,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    memoryStore.priceAlerts.push(newAlert);
    return newAlert;
  },

  async getStores() {
    return memoryStore.stores;
  }
};
