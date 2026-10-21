// ─── CENTRAL PRODUCTS DATA ──────────────────────────────────────────

export const allProducts = [
  {
    id: 1,
    name: 'iPhone 15',
    category: 'Smartfonlar',
    tags: ['Smartfonlar', 'iPhone', 'Telefon', 'Telefonlar', 'Apple'],
    brand: 'Apple',
    price: '11 999 000',
    priceNum: 11999000,
    oldPrice: '12 499 000',
    discount: -4,
    shop: 'TechnoHouse',
    rating: 4.8,
    isAI: true,
    img: '/products/iphone-15.jpg',
    summary: 'iPhone 15 — bu zamonaviy, ishonchli va yuqori sifatli smartfon. Kundalik foydalanish, foto va video tushirish uchun juda mos.',
    pros: [
      'A16 Bionic darajadagi kuchli kamera',
      'Kuchli protsessor va Dynamic Island',
      'Uzoq batareya muddati (kun bo\'yi)',
      'Sifatli Super Retina XDR ekran',
      'USB-C yangi qulay porti'
    ],
    cons: [
      'Yuqori narx toifasi',
      'Zaryadlash vaqti (20W chegarasi)',
      '120Hz ProMotion ekrani faqat Pro modelda'
    ],
    forWhom: 'Kundalik faol foydalanish, foto/video ixlosmandlari va uzoq yillar barqaror ishlaydigan smartfon izlovchilar.',
    alternatives: [
      { name: 'iPhone 14', price: '9 999 000 so\'m', img: '/products/iphone-15.jpg' },
      { name: 'iPhone SE (2022)', price: '6 499 000 so\'m', img: '/products/iphone-15.jpg' },
    ],
    aiVerdict: 'Agar siz eng yaxshi kamera va uzoq muddatli foydalanishni xohlasangiz — iPhone 15 ajoyib tanlov. Byudjet cheklangan bo\'lsa, iPhone 14 yaxshi muqobil.',
    priceMin: '10 499 000',
    priceMax: '13 999 000',
    historyPoints: [
      { date: '1 Apr', price: 12900000 },
      { date: '8 Apr', price: 12700000 },
      { date: '15 Apr', price: 12499000 },
      { date: '22 Apr', price: 12200000 },
      { date: '29 Apr', price: 11999000 },
    ],
    shops: [
      { name: 'TechnoHouse', price: '11 999 000 so\'m', delivery: 'Bugun', isBest: true },
      { name: 'Olcha.uz', price: '12 150 000 so\'m', delivery: '1 kun' },
      { name: 'Texnomart', price: '12 399 000 so\'m', delivery: 'Bepul' },
      { name: 'Uzum Market', price: '12 499 000 so\'m', delivery: '1 kun' },
    ],
    scores: { camera: 9.6, battery: 8.8, performance: 9.7, display: 9.3, value: 8.6 },
    overallScore: 9.2
  },
  {
    id: 7,
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Smartfonlar',
    tags: ['Smartfonlar', 'Telefon', 'Telefonlar', 'Samsung', 'Galaxy'],
    brand: 'Samsung',
    price: '14 299 000',
    priceNum: 14299000,
    oldPrice: '15 900 000',
    discount: -10,
    shop: 'Olcha.uz',
    rating: 4.9,
    isAI: true,
    img: '/products/samsung-s24.jpg',
    summary: 'Titanium korpus, 200MP professional kamera va o\'rnatilgan Galaxy AI sun\'iy intellekt tizimi.',
    pros: [
      'Aql bovar qilmas 200MP kamera va 100x zoom',
      'Kuchli Snapdragon 8 Gen 3 protsessori',
      'O\'rnatilgan S-Pen stilus ruchkasi',
      'Galaxy AI: real vaqtda tarjima va surat tahriri'
    ],
    cons: [
      'Katta o\'lcham va salmoqli vazn',
      'Qimmat narx toifasi'
    ],
    forWhom: 'Eng ilg\'or Android smartfonni xohlovchilar, biznes egalari va mobil fotograflar.',
    alternatives: [
      { name: 'Galaxy S23 Ultra', price: '11 500 000 so\'m', img: '/products/samsung-s24.jpg' },
      { name: 'iPhone 15 Pro Max', price: '16 500 000 so\'m', img: '/products/iphone-15.jpg' }
    ],
    aiVerdict: 'Bozordagi eng kuchli Android flagman. 7 yillik rasmiy Android yangilanish kafolati beriladi!',
    priceMin: '13 900 000',
    priceMax: '16 200 000',
    historyPoints: [
      { date: '1 Apr', price: 15900000 },
      { date: '8 Apr', price: 15400000 },
      { date: '15 Apr', price: 14900000 },
      { date: '22 Apr', price: 14500000 },
      { date: '29 Apr', price: 14299000 },
    ],
    shops: [
      { name: 'Olcha.uz', price: '14 299 000 so\'m', delivery: 'Bepul', isBest: true },
      { name: 'MediaPark', price: '14 699 000 so\'m', delivery: '1 kun' },
      { name: 'Texnomart', price: '14 899 000 so\'m', delivery: 'Bepul' }
    ],
    scores: { camera: 9.9, battery: 9.4, performance: 9.8, display: 9.8, value: 9.1 },
    overallScore: 9.6
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    category: 'Noutbuklar',
    tags: ['Noutbuklar', 'Noutbuk', 'Laptop', 'Apple', 'MacBook'],
    brand: 'Apple',
    price: '16 499 000',
    priceNum: 16499000,
    oldPrice: '17 899 000',
    discount: -8,
    shop: 'iCoolStore',
    rating: 4.9,
    isAI: false,
    img: '/products/macbook-air.jpg',
    summary: 'MacBook Air M2 — engil, tezkor va quvvati 18 soatgacha yetadigan ideal ish va o\'qish noutbuki. Mutlaqo ovozsiz sovutish tizimi.',
    pros: [
      'Inqilobiy Apple M2 chipi (juda tezkor)',
      '18 soatgacha uzluksiz batareya quvvati',
      'Ultra yupqa (1.13 sm) va engil korpus',
      'MagSafe 3 tezkor quvvatlash'
    ],
    cons: [
      'Asosiy modelda 8GB xotira',
      'Faqat bitta tashqi monitorni qo\'llab-quvvatlaydi'
    ],
    forWhom: 'Dasturchilar, talabalar, dizaynerlar va doimiy safarda ishlovchi mutaxassislar.',
    alternatives: [
      { name: 'MacBook Air M1', price: '11 200 000 so\'m', img: '/products/macbook-air.jpg' },
      { name: 'Asus ZenBook 14', price: '12 800 000 so\'m', img: '/products/macbook-air.jpg' },
    ],
    aiVerdict: 'Hozirgi narxi bo\'yicha M2 Air bozordagi eng yaxshi ultrabook. Narx pasaygan paytda xarid qilish juda foydali!',
    priceMin: '15 900 000',
    priceMax: '18 400 000',
    historyPoints: [
      { date: '1 Apr', price: 17800000 },
      { date: '8 Apr', price: 17400000 },
      { date: '15 Apr', price: 17100000 },
      { date: '22 Apr', price: 16800000 },
      { date: '29 Apr', price: 16499000 },
    ],
    shops: [
      { name: 'iCoolStore', price: '16 499 000 so\'m', delivery: 'Bugun', isBest: true },
      { name: 'Texnomart', price: '16 999 000 so\'m', delivery: 'Bepul' },
      { name: 'Olcha.uz', price: '17 200 000 so\'m', delivery: '1 kun' },
    ],
    scores: { camera: 8.5, battery: 9.8, performance: 9.5, display: 9.4, value: 9.1 },
    overallScore: 9.4
  },
  {
    id: 3,
    name: 'Samsung QLED 4K (55")',
    category: 'Televizorlar',
    tags: ['Televizorlar', 'Televizor', 'TV', 'Samsung'],
    brand: 'Samsung',
    price: '13 499 000',
    priceNum: 13499000,
    oldPrice: '14 999 000',
    discount: -10,
    shop: 'Olcha.uz',
    rating: 4.7,
    isAI: false,
    img: '/products/samsung-tv.jpg',
    summary: 'Quantum Dot texnologiyasiga ega zamonaviy 4K smart televizor. Kino va o\'yinlar uchun 100% rang qamrovi.',
    pros: [
      'Yorqin va to\'yingan Quantum Dot ranglar',
      'Quantum Processor 4K sun\'iy intellekt chipi',
      'Yupqa AirSlim dizayn',
      'O\'yinlar uchun past kechikish rejimi'
    ],
    cons: [
      'Dolby Vision formati mavjud emas',
      'Oddiy audio dinamiklar (Soundbar tavsiya etiladi)'
    ],
    forWhom: 'Oilaviy kino ko\'rish, PlayStation 5 o\'yinchilari va yorug\' xonalar uchun.',
    alternatives: [
      { name: 'LG NanoCell 55"', price: '10 800 000 so\'m', img: '/products/samsung-tv.jpg' },
      { name: 'TCL QLED 55"', price: '8 500 000 so\'m', img: '/products/samsung-tv.jpg' },
    ],
    aiVerdict: 'Yorqin xonalarda OLED dan ko\'ra QLED afzalroq. Narxi optimal darajaga tushgan.',
    priceMin: '12 800 000',
    priceMax: '15 400 000',
    historyPoints: [
      { date: '1 Apr', price: 14900000 },
      { date: '8 Apr', price: 14500000 },
      { date: '15 Apr', price: 14200000 },
      { date: '22 Apr', price: 13800000 },
      { date: '29 Apr', price: 13499000 },
    ],
    shops: [
      { name: 'Olcha.uz', price: '13 499 000 so\'m', delivery: 'Bepul', isBest: true },
      { name: 'MediaPark', price: '13 899 000 so\'m', delivery: '1 kun' },
    ],
    scores: { camera: 0, battery: 0, performance: 8.9, display: 9.6, value: 9.0 },
    overallScore: 9.1
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5',
    category: 'Naushniklar',
    tags: ['Naushniklar', 'Naushnik', 'Quloqchin', 'Sony', 'Audio'],
    brand: 'Sony',
    price: '4 299 000',
    priceNum: 4299000,
    oldPrice: '4 999 000',
    discount: -14,
    shop: 'Texnomart',
    rating: 4.9,
    isAI: false,
    img: '/products/sony-headphones.jpg',
    summary: 'Sanoatdagi eng ilg\'or shovqinni bekor qiluvchi (ANC) simsiz quloqchinlar. Kristaldek toza ovoz va 30 soat quvvat.',
    pros: [
      'Eng yuqori darajadagi faol shovqin bekor qilish',
      'Yengil, ergonomik va yumshoq charm yostiqchalar',
      '30 soat batareya quvvati + tezkor zaryad',
      'Sony LDAC yuqori sifatli audio kodek'
    ],
    cons: [
      'Boshqa modellar kabi buklanmaydi',
      'Suvdan himoya darajasi cheklangan'
    ],
    forWhom: 'Musiqa shaydolari, ofisda chalg\'imasdan ishlovchilar va tez-tez sayohat qiluvchilar.',
    alternatives: [
      { name: 'Bose QuietComfort 45', price: '3 800 000 so\'m', img: '/products/sony-headphones.jpg' },
      { name: 'Sony WH-1000XM4', price: '3 400 000 so\'m', img: '/products/sony-headphones.jpg' },
    ],
    aiVerdict: 'Hozirgi -14% chegirma bilan ushbu quloqchin bozordagi eng foydali premium variant!',
    priceMin: '3 999 000',
    priceMax: '5 100 000',
    historyPoints: [
      { date: '1 Apr', price: 4999000 },
      { date: '8 Apr', price: 4799000 },
      { date: '15 Apr', price: 4599000 },
      { date: '22 Apr', price: 4400000 },
      { date: '29 Apr', price: 4299000 },
    ],
    shops: [
      { name: 'Texnomart', price: '4 299 000 so\'m', delivery: 'Bepul', isBest: true },
      { name: 'Olcha.uz', price: '4 450 000 so\'m', delivery: '1 kun' },
    ],
    scores: { camera: 0, battery: 9.7, performance: 9.8, display: 0, value: 9.3 },
    overallScore: 9.6
  },
  {
    id: 5,
    name: 'LG Smart Inverter Kir yuvish mashinasi (8.5 kg)',
    category: 'Maishiy texnika',
    tags: ['Maishiy texnika', 'Kir yuvish mashinasi', 'LG', 'Texnika'],
    brand: 'LG',
    price: '5 499 000',
    priceNum: 5499000,
    oldPrice: '6 200 000',
    discount: -11,
    shop: 'MediaPark',
    rating: 4.9,
    isAI: true,
    img: '/products/washing-machine.jpg',
    summary: 'AI DD sun\'iy intellekt texnologiyasiga ega aqlli va shovqinsiz kir yuvish mashinasi. Matoga qarab 18% ko\'proq himoya qiladi.',
    pros: [
      'AI DD — mato yumshoqligiga qarab aylanishni sozlaydi',
      'Steam bug\' bilan yuvish — 99.9% allergenlarni yo\'qotadi',
      'Inverter Direct Drive — mutlaqo shovqinsiz va tebranishsiz',
      'A+++ energiya tejovchi sinf'
    ],
    cons: [
      'Katta o\'lcham (chuqurligi 56 sm)',
      'Smart funksiyalar Wi-Fi orqali sozlanadi'
    ],
    forWhom: 'Katta oilalar, yosh bolali onalar va sifatli shovqinsiz maishiy texnika qidiruvchilar.',
    alternatives: [
      { name: 'Samsung EcoBubble 7kg', price: '4 899 000 so\'m', img: '/products/washing-machine.jpg' },
      { name: 'Artel Grand 8kg', price: '3 900 000 so\'m', img: '/products/washing-machine.jpg' }
    ],
    aiVerdict: 'Ushbu toifada eng kam elektr va suv sarflaydigan, eng jim ishlaydigan kir yuvish mashinasi!',
    priceMin: '5 200 000',
    priceMax: '6 400 000',
    historyPoints: [
      { date: '1 Apr', price: 6200000 },
      { date: '8 Apr', price: 5990000 },
      { date: '15 Apr', price: 5800000 },
      { date: '22 Apr', price: 5650000 },
      { date: '29 Apr', price: 5499000 },
    ],
    shops: [
      { name: 'MediaPark', price: '5 499 000 so\'m', delivery: 'Bepul', isBest: true },
      { name: 'Texnomart', price: '5 799 000 so\'m', delivery: '1 kun' },
      { name: 'Olcha.uz', price: '5 850 000 so\'m', delivery: 'Bepul' }
    ],
    scores: { camera: 0, battery: 0, performance: 9.6, display: 9.0, value: 9.4 },
    overallScore: 9.4
  },
  {
    id: 6,
    name: 'Qishki Erkaklar Kurtkasi (Waterproof Parka)',
    category: 'Kiyim',
    tags: ['Kiyim', 'Kiyimlar', 'Kurtka', 'Kiyim-kechak', 'Erkaklar kiyimi'],
    brand: 'North Peak',
    price: '589 000',
    priceNum: 589000,
    oldPrice: '750 000',
    discount: -21,
    shop: 'Uzum Market',
    rating: 4.9,
    isAI: true,
    img: '/products/jacket.jpg',
    summary: 'Suv va sovuq shamol o\'tkazmaydigan zamonaviy qishki parka kurtkasi. -25°C darajagacha tanani qulay va issiq saqlaydi.',
    pros: [
      'Gore-Tex sifatidagi suv o\'tkazmaydigan mato',
      'Issiq tabiiy termo-tolali qatlam',
      'Yechiladigan mo\'ynali kapyushon',
      'Ko\'p sonli xavfsiz cho\'ntaklar va sifatli furnitura'
    ],
    cons: [
      'Faqat qo\'lda yoki nozik rejimda yuvish tavsiya etiladi'
    ],
    forWhom: 'Sovuq qish mavsumida issiq, zamonaviy va bardoshli sifatli kurtka izlayotgan barcha yoshdagilar uchun.',
    alternatives: [
      { name: 'Zara Casual Parka', price: '850 000 so\'m', img: '/products/jacket.jpg' },
      { name: 'Terra Pro Qishki Kurtka', price: '690 000 so\'m', img: '/products/jacket.jpg' }
    ],
    aiVerdict: '-21% chegirma bilan O\'zbekiston bozoridagi eng tejamkor va sifatli qishki kiyim taklifi!',
    priceMin: '550 000',
    priceMax: '790 000',
    historyPoints: [
      { date: '1 Apr', price: 750000 },
      { date: '8 Apr', price: 699000 },
      { date: '15 Apr', price: 649000 },
      { date: '22 Apr', price: 610000 },
      { date: '29 Apr', price: 589000 },
    ],
    shops: [
      { name: 'Uzum Market', price: '589 000 so\'m', delivery: 'Bugun', isBest: true },
      { name: 'Olcha.uz', price: '620 000 so\'m', delivery: '1 kun' },
    ],
    scores: { camera: 0, battery: 0, performance: 9.3, display: 9.7, value: 9.8 },
    overallScore: 9.6
  },
  {
    id: 8,
    name: 'Sport Casual Qishki Shapka va Kurtka Jamlanmasi',
    category: 'Kiyim',
    tags: ['Kiyim', 'Kiyimlar', 'Kurtka', 'Sport kiyim', 'Kiyim-kechak'],
    brand: 'UrbanStyle',
    price: '420 000',
    priceNum: 420000,
    oldPrice: '520 000',
    discount: -19,
    shop: 'Olcha.uz',
    rating: 4.7,
    isAI: false,
    img: '/products/sport-set.jpg',
    summary: 'Yengil, shamolga chidamli va qulay qora sport kurtkasi va trikotaj shapka jamlanmasi.',
    pros: [
      'Erkin harakatlanish uchun yengil va elastik mato',
      'Nafas oluvchi shamolga qarshi tola',
      'Universal qora rang har qanday uslubga mos tushadi'
    ],
    cons: [
      'Qattiq sovuq kunlar uchun issiq ichki kiyim talab qilinadi'
    ],
    forWhom: 'Sportchilar, haydovchilar va engil kiyinishni yoqtiruvchilar uchun.',
    alternatives: [
      { name: 'Nike Windrunner', price: '650 000 so\'m', img: '/products/sport-set.jpg' }
    ],
    aiVerdict: 'Kundalik yugurish, sayr va mashina haydash uchun juda qulay tanlov.',
    priceMin: '399 000',
    priceMax: '540 000',
    historyPoints: [
      { date: '1 Apr', price: 520000 },
      { date: '8 Apr', price: 490000 },
      { date: '15 Apr', price: 460000 },
      { date: '22 Apr', price: 440000 },
      { date: '29 Apr', price: 420000 },
    ],
    shops: [
      { name: 'Olcha.uz', price: '420 000 so\'m', delivery: 'Bepul', isBest: true },
      { name: 'Uzum Market', price: '445 000 so\'m', delivery: '1 kun' }
    ],
    scores: { camera: 0, battery: 0, performance: 8.9, display: 9.1, value: 9.4 },
    overallScore: 9.1
  },
  {
    id: 9,
    name: 'Erkaklar Klassik Ko\'ylagi (Premium Oxford)',
    category: 'Kiyim',
    tags: ['Kiyim', 'Kiyimlar', 'Ko\'ylak', 'Erkaklar kiyimi', 'Klassik', 'Shirt'],
    brand: 'FormalPlus',
    price: '185 000',
    priceNum: 185000,
    oldPrice: '240 000',
    discount: -23,
    shop: 'Uzum Market',
    rating: 4.6,
    isAI: false,
    img: '/products/mens-shirt.jpg',
    summary: 'Ish va rasmiy uchrashuvlar uchun mo\'ljallangan sifatli paxta ko\'ylak. Yengil dazmollanadi, burishmaydigan mato.',
    pros: [
      '100% paxta nafas oluvchi mato',
      'Har qanday kostyumga mos klassik qirqim',
      'Rang tanlov imkoniyati: oq, ko\'k, kulrang'
    ],
    cons: ['Bir oz dag\'al tuyulishi mumkin'],
    forWhom: 'Ish uchrashuvlari, rasmiy tadbirlar va ofis muhiti uchun.',
    alternatives: [
      { name: 'Zara Slim Fit Ko\'ylak', price: '250 000 so\'m', img: '/products/mens-shirt.jpg' },
      { name: 'Reserved Classic', price: '195 000 so\'m', img: '/products/mens-shirt.jpg' }
    ],
    aiVerdict: 'Narx-sifat nisbatida eng foydali tanlov. Klassik ko\'ylak izlovchilar uchun 100% mos.',
    priceMin: '170 000',
    priceMax: '270 000',
    historyPoints: [
      { date: '1 Apr', price: 240000 },
      { date: '8 Apr', price: 220000 },
      { date: '15 Apr', price: 200000 },
      { date: '22 Apr', price: 190000 },
      { date: '29 Apr', price: 185000 },
    ],
    shops: [
      { name: 'Uzum Market', price: '185 000 so\'m', delivery: 'Bugun', isBest: true },
      { name: 'Olcha.uz', price: '198 000 so\'m', delivery: '1 kun' },
    ],
    scores: { camera: 0, battery: 0, performance: 8.5, display: 9.0, value: 9.5 },
    overallScore: 9.0
  },
  {
    id: 10,
    name: 'Ayollar Zamonaviy Jinsi Shim (High-waist)',
    category: 'Kiyim',
    tags: ['Kiyim', 'Kiyimlar', 'Shim', 'Jins', 'Ayollar kiyimi', 'Jinsi'],
    brand: 'DenimPro',
    price: '320 000',
    priceNum: 320000,
    oldPrice: '420 000',
    discount: -24,
    shop: 'Olcha.uz',
    rating: 4.8,
    isAI: true,
    img: '/products/womens-jeans.jpg',
    summary: 'Yuqori bel modeli, nafas oluvchi stretch denim mato. Har qanday kiyim bilan yaxshi uyg\'unlashadi.',
    pros: [
      'Qulay stretch-denim barcha bo\'y uchun mos',
      'Keng rang tanlovi: ko\'k, qora, kulrang',
      'Mahkam tikuv va sifatli yopqich'
    ],
    cons: ['Katta o\'lchamlar uchun alohida buyurtma kerak'],
    forWhom: 'Zamonaviy uslubni yoqtiruvchi har qanday yoshdagi ayollar uchun.',
    alternatives: [
      { name: 'Mango Slim Jeans', price: '450 000 so\'m', img: '/products/womens-jeans.jpg' },
      { name: 'H&M Mom Jeans', price: '380 000 so\'m', img: '/products/womens-jeans.jpg' }
    ],
    aiVerdict: 'Bestseller model — keng rang va o\'lcham assortimenti bilan.',
    priceMin: '299 000',
    priceMax: '450 000',
    historyPoints: [
      { date: '1 Apr', price: 420000 },
      { date: '8 Apr', price: 390000 },
      { date: '15 Apr', price: 360000 },
      { date: '22 Apr', price: 340000 },
      { date: '29 Apr', price: 320000 },
    ],
    shops: [
      { name: 'Olcha.uz', price: '320 000 so\'m', delivery: 'Bugun', isBest: true },
      { name: 'Uzum Market', price: '335 000 so\'m', delivery: '1 kun' },
    ],
    scores: { camera: 0, battery: 0, performance: 9.0, display: 9.2, value: 9.6 },
    overallScore: 9.3
  },
  {
    id: 11,
    name: 'Nike Air Max 270 Sport Krossovka',
    category: 'Kiyim',
    tags: ['Kiyim', 'Kiyimlar', 'Poyabzal', 'Krossovka', 'Sport poyabzal', 'Nike', 'Oyoq kiyim'],
    brand: 'Nike',
    price: '1 290 000',
    priceNum: 1290000,
    oldPrice: '1 650 000',
    discount: -22,
    shop: 'TechnoHouse',
    rating: 4.9,
    isAI: true,
    img: '/products/nike-sneakers.jpg',
    summary: 'Original Nike Air Max 270 — maksimal yumshoqligi va zamonaviy dizayni bilan eng mashhur sport poyabzali.',
    pros: [
      'Max Air yostiqchasi — butun kun qulay',
      'Nafas oluvchi mesh yuza yozing',
      'Original Nike kafolatli mahsulot',
      'Ko\'p rangli variant'
    ],
    cons: ['Yuqori narx', 'Original deb sotilgan soxta modellar ko\'p'],
    forWhom: 'Sport va kundalik hayotda qulay va chiroyli poyabzal izlovchilar uchun.',
    alternatives: [
      { name: 'Adidas Ultraboost', price: '1 450 000 so\'m', img: '/products/nike-sneakers.jpg' },
      { name: 'Puma RS-X', price: '980 000 so\'m', img: '/products/nike-sneakers.jpg' }
    ],
    aiVerdict: 'Original Nike kafolati va Max Air texnologiyasi bilan eng ishonchli tanlov!',
    priceMin: '1 190 000',
    priceMax: '1 750 000',
    historyPoints: [
      { date: '1 Apr', price: 1650000 },
      { date: '8 Apr', price: 1550000 },
      { date: '15 Apr', price: 1450000 },
      { date: '22 Apr', price: 1370000 },
      { date: '29 Apr', price: 1290000 },
    ],
    shops: [
      { name: 'TechnoHouse', price: '1 290 000 so\'m', delivery: 'Bugun', isBest: true },
      { name: 'Uzum Market', price: '1 350 000 so\'m', delivery: '1 kun' },
      { name: 'Olcha.uz', price: '1 399 000 so\'m', delivery: '2 kun' },
    ],
    scores: { camera: 0, battery: 0, performance: 9.5, display: 9.8, value: 9.1 },
    overallScore: 9.5
  },
  {
    id: 12,
    name: 'Ayollar Kechki Libosi (Evening Dress)',
    category: 'Kiyim',
    tags: ['Kiyim', 'Kiyimlar', 'Libos', 'Ko\'ylak', 'Ayollar kiyimi', 'Kechki libos', 'Dress'],
    brand: 'EleganceFashion',
    price: '450 000',
    priceNum: 450000,
    oldPrice: '620 000',
    discount: -27,
    shop: 'Olcha.uz',
    rating: 4.8,
    isAI: false,
    img: '/products/evening-dress.jpg',
    summary: 'Zamonaviy va nozik kechki libos. To\'y, ziyofat va rasmiy tadbirlar uchun ideal.',
    pros: [
      'Yuqori sifatli atlas va to\'r mato',
      'Asimmetrik qirqim — zamonaviy ko\'rinish',
      'Qulay yopqich va regulirovka qilish imkoniyati'
    ],
    cons: ['Faqat sovuq yuvish tavsiya etiladi'],
    forWhom: 'To\'y, bayram va rasmiy tadbirlarga tayyorlanayotgan ayollar uchun.',
    alternatives: [
      { name: 'Zara Evening Dress', price: '650 000 so\'m', img: '/products/evening-dress.jpg' }
    ],
    aiVerdict: '27% chegirma bilan mavsumning eng foydali kechki libos taklifi!',
    priceMin: '420 000',
    priceMax: '680 000',
    historyPoints: [
      { date: '1 Apr', price: 620000 },
      { date: '8 Apr', price: 580000 },
      { date: '15 Apr', price: 530000 },
      { date: '22 Apr', price: 490000 },
      { date: '29 Apr', price: 450000 },
    ],
    shops: [
      { name: 'Olcha.uz', price: '450 000 so\'m', delivery: 'Bugun', isBest: true },
      { name: 'Uzum Market', price: '475 000 so\'m', delivery: '1 kun' },
    ],
    scores: { camera: 0, battery: 0, performance: 8.7, display: 9.5, value: 9.3 },
    overallScore: 9.2
  }
];

