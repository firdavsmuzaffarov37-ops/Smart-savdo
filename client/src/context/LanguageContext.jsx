import React, { createContext, useContext, useState, useEffect } from 'react';

export const translations = {
  uz: {
    // Navigation
    nav_home: 'Bosh sahifa',
    nav_search: 'Mahsulot qidirish',
    nav_compare: 'Taqqoslash',
    nav_budget: 'Byudjet maslahatchi',
    nav_price_history: 'Narx tarixi',
    nav_favorites: 'Sevimlilar',
    nav_settings: 'Sozlamalar',
    nav_login: "Kirish / Ro'yxat",
    nav_logout: 'Chiqish',
    ai_subtitle: 'AI yordamchi savdo',
    back_to_home: 'Bosh sahifaga qaytish',
    
    // Header & Cart
    view_cart: "Savatni ko'rish",
    cart: 'Savat',
    empty_cart: "Savatingiz bo'sh",
    notifications: 'Xabarnomalar',
    user_guest: 'Mehmon',
    user_sign_in: 'Tizimga kiring',
    
    // Categories & Filter Tabs
    cat_all: 'Barchasi',
    cat_smartphones: 'Smartfonlar',
    cat_laptops: 'Noutbuklar',
    cat_tvs: 'Televizorlar',
    cat_headphones: 'Naushniklar',
    cat_appliances: 'Maishiy texnika',
    cat_clothing: 'Kiyim',

    // Home Page Hero & Search
    hero_title_prefix: "Xarid qilishdan oldin ",
    hero_brand: "SmartSavdo",
    hero_title_suffix: " bilan maslahat qiling!",
    hero_desc: "Sun'iy intellekt yordamida mahsulotlarni tahlil qiling, narxlarni solishtiring va pulni tejang.",
    search_input_placeholder: "Mahsulot nomini yozing yoki rasmini yuklang...",
    hero_analyze_btn: "Tahlil qilish",
    
    // Headings & Lists
    categories_heading: "Kategoriyalar",
    show_all_btn: "Barchasini ko'rsatish",
    best_offers_heading: "Eng yaxshi takliflar",
    deals_suffix: "takliflari",
    count_products: "ta mahsulot",
    card_ai_badge: "AI tavsiya",
    btn_details: "Batafsil",
    btn_buy: "Sotib olish",
    btn_add_cart: "Savatga",
    currency_symbol: "so'm",
    
    // Bottom Deals
    budget_fit_heading: "Byudjetingizga mos mahsulotlar",
    special_deals_heading: "Kunning maxsus chegirmalari",
    see_all_arrow: "Barchasi →",
    no_products_title: "Ushbu toifada mahsulot topilmadi",
    no_products_desc: "Boshqa kategoriya yoki qidiruv so'zini sinab ko'ring yoki barcha mahsulotlarni ko'ring.",
    btn_show_all_products: "Barcha mahsulotlarni ko'rsatish",

    // Right AI Panel
    right_ai_title: "AI Mahsulot tahlili",
    right_summary_title: "Qisqacha xulosa",
    right_pros_title: "Afzalliklari",
    right_cons_title: "Kamchiliklari",
    right_for_whom: "Kimlar uchun mos?",
    right_alternatives: "Arzonroq muqobillar",
    right_ai_verdict: "AI tavsiyasi",

    // Settings Page
    settings_title: 'Sozlamalar',
    settings_subtitle: "Hisob ma'lumotlari, xabarnomalar va ilova afzalliklarini boshqaring",
    tab_profile: 'Profil sozlamalari',
    tab_orders: 'Buyurtmalar tarixi',
    tab_alerts: 'Narx xabarnomalari',
    tab_addresses: 'Yetkazib berish manzili',
    tab_system: 'Ilova va AI afzalliklari',
    tab_security: 'Xavfsizlik va Parol',
    
    system_lang: 'Tizim tili',
    lang_uz: "O'zbekcha (UZ)",
    lang_en: 'English (EN)',
    lang_ru: 'Русский (RU)',
    
    main_currency: 'Asosiy valyuta',
    currency_uzs: "So'm (UZS)",
    currency_usd: 'AQSH Dollari ($ USD)',
    
    ai_strategy: "SmartSavdo Sun'iy Intellekt strategiyasi",
    ai_strategy_max_save: 'Maksimal tejash',
    ai_strategy_max_save_desc: "Eng past narxlarni birinchi o'ringa qo'yadi",
    ai_strategy_balanced: 'Muvozanatli (Tavsiya)',
    ai_strategy_balanced_desc: 'Narx va sifat nisbati optimal darajada',
    ai_strategy_premium: 'Premium sifat',
    ai_strategy_premium_desc: 'Rasmiy kafolat va eng yuqori reyting',
    
    save_preferences: 'Afzalliklarni saqlash',
    preferences_saved: 'Tizim afzalliklari saqlandi! ✓',
    profile_saved: "Profil ma'lumotlari muvaffaqiyatli saqlandi! ✓",
    
    full_name: "To'liq ism",
    email: 'Elektron pochta',
    phone: 'Telefon raqami',
    region: 'Viloyat / Shahar',
    address: 'Yetkazib berish manzili',
    bio: "Qisqacha ma'lumot (Bio)",
    save_profile: 'Profilni saqlash',
    
    security_title: 'Xavfsizlik va Parol yangilash',
    security_desc: "Hisobingiz xavfsizligini ta'minlash uchun kuchli paroldan foydalaning",
    old_password: 'Eski parol',
    new_password: 'Yangi parol',
    confirm_password: 'Parolni tasdiqlash',
    change_password: 'Parolni yangilash',
    
    order_history: 'Buyurtmalar tarixi',
    order_history_desc: 'SmartSavdo orqali rasmiylashtirilgan barcha xaridlar',
    order_history_empty: "Hozircha hech qanday buyurtma berilmagan",
    total: 'Jami',
    status: 'Holat',
    status_paid: "To'langan",
    status_pending: 'Kutilmoqda',
    
    // Other Pages
    compare_title: 'Mahsulotlarni taqqoslash',
    compare_subtitle: "Turli do'konlardagi narxlar va texnik xususiyatlarni taqqoslang",
    budget_title: 'AI Byudjet maslahatchi',
    budget_subtitle: "Byudjetingizga mos eng yaxshi to'plam va takliflarni oling",
    price_history_title: 'Narxlar dinamikasi va tarixi',
    price_history_subtitle: "Do'konlardagi narxlarning ko'tarilishi yoki tushishi statistikasi",
    favorites_title: 'Sevimli mahsulotlar',
    favorites_subtitle: "Siz kuzatib borayotgan qulay narxdagi tovarlar",
    favorites_empty: "Sevimlilar ro'yxati hozircha bo'sh",
    
    // Search & Filter
    search_page_title: "Barcha do'konlardan eng arzon takliflarni toping",
    search_page_desc: "Mahsulot nomi, markasi yoki toifasi bo'yicha qidiring. SmartSavdo AI barcha narxlarni avtomatik tahlil qiladi.",
    filter_heading: "Filtrlash",
    filter_clear: "Tozalash",
    filter_category: "Kategoriya",
    filter_shop: "Do'kon",
    filter_max_price: "Maksimal narx",
    filter_found_count: "Topilgan mahsulotlar",
    filter_not_found: "Mahsulot topilmadi",
    filter_not_found_desc: "Qidiruv so'zini o'zgartirib ko'ring yoki filtrlarni tozalang.",
    sort_label: "Saralash",
    sort_relevance: "Ommabopligi bo'yicha",
    sort_price_asc: "Avval arzonlari",
    sort_price_desc: "Avval qimmatlari",
    sort_rating: "Reytingi bo'yicha",
    sort_discount: "Katta chegirma",
    mobile_filter_btn: "Filtrlar",
    swipe_hint: "← Yon tomonga suring →",
    compare_add_btn: "+ Mahsulot qo'shish...",
    compare_empty_title: "Taqqoslash uchun mahsulot tanlanmagan",
    compare_empty_desc: "Yuqoridagi ro'yxatdan yoki mahsulot kartasidan 'Taqqoslash' tugmasini bosing.",
    compare_demo_btn: "Namuna sifatida iPhone va Samsung ni taqqoslash",
    param_rating: "Reyting",
    param_discount: "Chegirma",
    param_best_shop: "Eng arzon do'kon",
    param_warranty: "Kafolat",

    // Quick Actions
    lang_changed: "Til o'zgartirildi: O'zbekcha"
  },
  en: {
    // Navigation
    nav_home: 'Home',
    nav_search: 'Search Products',
    nav_compare: 'Compare',
    nav_budget: 'Budget Advisor',
    nav_price_history: 'Price History',
    nav_favorites: 'Favorites',
    nav_settings: 'Settings',
    nav_login: 'Login / Register',
    nav_logout: 'Logout',
    ai_subtitle: 'AI Shopping Assistant',
    back_to_home: 'Back to Home',
    
    // Header & Cart
    view_cart: 'View Cart',
    cart: 'Cart',
    empty_cart: 'Your cart is empty',
    notifications: 'Notifications',
    user_guest: 'Guest',
    user_sign_in: 'Sign in to your account',
    
    // Categories & Filter Tabs
    cat_all: 'All',
    cat_smartphones: 'Smartphones',
    cat_laptops: 'Laptops',
    cat_tvs: 'Televisions',
    cat_headphones: 'Headphones',
    cat_appliances: 'Home Appliances',
    cat_clothing: 'Clothing',

    // Home Page Hero & Search
    hero_title_prefix: "Before buying, consult with ",
    hero_brand: "SmartSavdo",
    hero_title_suffix: "!",
    hero_desc: "Analyze products with AI, compare prices across stores, and save money.",
    search_input_placeholder: "Type product name or upload image...",
    hero_analyze_btn: "Analyze",
    
    // Headings & Lists
    categories_heading: "Categories",
    show_all_btn: "Show all",
    best_offers_heading: "Best Deals",
    deals_suffix: "deals",
    count_products: "products",
    card_ai_badge: "AI Choice",
    btn_details: "Details",
    btn_buy: "Buy Now",
    btn_add_cart: "To Cart",
    currency_symbol: "UZS",
    
    // Bottom Deals
    budget_fit_heading: "Deals suited to your budget",
    special_deals_heading: "Special Deals of the Day",
    see_all_arrow: "All →",
    no_products_title: "No products found in this category",
    no_products_desc: "Try another category or search term, or view all products.",
    btn_show_all_products: "Show all products",

    // Right AI Panel
    right_ai_title: "AI Product Analysis",
    right_summary_title: "Brief Summary",
    right_pros_title: "Advantages",
    right_cons_title: "Drawbacks",
    right_for_whom: "Who is it for?",
    right_alternatives: "Cheaper Alternatives",
    right_ai_verdict: "AI Verdict",

    // Settings Page
    settings_title: 'Settings',
    settings_subtitle: 'Manage your profile, alerts, and AI shopping preferences',
    tab_profile: 'Profile Settings',
    tab_orders: 'Order History',
    tab_alerts: 'Price Alerts',
    tab_addresses: 'Delivery Address',
    tab_system: 'App & AI Preferences',
    tab_security: 'Security & Password',
    
    system_lang: 'System Language',
    lang_uz: "O'zbekcha (UZ)",
    lang_en: 'English (EN)',
    lang_ru: 'Русский (RU)',
    
    main_currency: 'Main Currency',
    currency_uzs: "UZS (So'm)",
    currency_usd: 'US Dollar ($ USD)',
    
    ai_strategy: 'SmartSavdo AI Shopping Strategy',
    ai_strategy_max_save: 'Maximum Savings',
    ai_strategy_max_save_desc: 'Prioritizes the lowest possible prices first',
    ai_strategy_balanced: 'Balanced (Recommended)',
    ai_strategy_balanced_desc: 'Optimal balance between price and quality',
    ai_strategy_premium: 'Premium Quality',
    ai_strategy_premium_desc: 'Official warranty and top seller ratings',
    
    save_preferences: 'Save Preferences',
    preferences_saved: 'Preferences saved successfully! ✓',
    profile_saved: 'Profile updated successfully! ✓',
    
    full_name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    region: 'Region / City',
    address: 'Delivery Address',
    bio: 'Short Bio',
    save_profile: 'Save Profile',
    
    security_title: 'Security & Password Change',
    security_desc: 'Ensure your account stays secure by using a strong password',
    old_password: 'Old Password',
    new_password: 'New Password',
    confirm_password: 'Confirm New Password',
    change_password: 'Update Password',
    
    order_history: 'Order History',
    order_history_desc: 'All purchases completed through SmartSavdo',
    order_history_empty: 'No orders placed yet',
    total: 'Total',
    status: 'Status',
    status_paid: 'Paid',
    status_pending: 'Pending',
    
    // Other Pages
    compare_title: 'Product Comparison',
    compare_subtitle: 'Compare specs and real-time prices across different stores',
    budget_title: 'AI Budget Advisor',
    budget_subtitle: 'Get curated deals tailored directly to your budget',
    price_history_title: 'Price Dynamics & History',
    price_history_subtitle: 'Track price spikes and drops over time across stores',
    favorites_title: 'Favorite Products',
    favorites_subtitle: 'Products you are tracking for discounts',
    favorites_empty: 'No favorites added yet',
    
    // Search & Filter
    search_page_title: "Find the lowest prices across all online stores",
    search_page_desc: "Search by product name, brand or category. SmartSavdo AI automatically tracks the best deals.",
    filter_heading: "Filters",
    filter_clear: "Clear All",
    filter_category: "Category",
    filter_shop: "Store",
    filter_max_price: "Max Price",
    filter_found_count: "Found Products",
    filter_not_found: "No products found",
    filter_not_found_desc: "Try changing your search term or clear active filters.",
    sort_label: "Sort by",
    sort_relevance: "Relevance",
    sort_price_asc: "Lowest price first",
    sort_price_desc: "Highest price first",
    sort_rating: "Highest rated",
    sort_discount: "Biggest discount",
    mobile_filter_btn: "Filters",
    swipe_hint: "← Swipe horizontally →",
    compare_add_btn: "+ Add product...",
    compare_empty_title: "No products selected for comparison",
    compare_empty_desc: "Click 'Compare' on any product card or choose from the dropdown above.",
    compare_demo_btn: "Compare iPhone & Samsung as a demo",
    param_rating: "Rating",
    param_discount: "Discount",
    param_best_shop: "Best Store",
    param_warranty: "Warranty",

    // Quick Actions
    lang_changed: 'Language switched to: English'
  },
  ru: {
    // Navigation
    nav_home: 'Главная',
    nav_search: 'Поиск товаров',
    nav_compare: 'Сравнение',
    nav_budget: 'Бюджетный советник',
    nav_price_history: 'История цен',
    nav_favorites: 'Избранное',
    nav_settings: 'Настройки',
    nav_login: 'Войти / Регистрация',
    nav_logout: 'Выйти',
    ai_subtitle: 'Умный AI помощник',
    back_to_home: 'На главную',
    
    // Header & Cart
    view_cart: 'Открыть корзину',
    cart: 'Корзина',
    empty_cart: 'Ваша корзина пуста',
    notifications: 'Уведомления',
    user_guest: 'Гость',
    user_sign_in: 'Войдите в систему',
    
    // Categories & Filter Tabs
    cat_all: 'Все',
    cat_smartphones: 'Смартфоны',
    cat_laptops: 'Ноутбуки',
    cat_tvs: 'Телевизоры',
    cat_headphones: 'Наушники',
    cat_appliances: 'Бытовая техника',
    cat_clothing: 'Одежда',

    // Home Page Hero & Search
    hero_title_prefix: "Перед покупкой посоветуйтесь со ",
    hero_brand: "SmartSavdo",
    hero_title_suffix: "!",
    hero_desc: "Анализируйте товары с помощью ИИ, сравнивайте цены и экономьте деньги.",
    search_input_placeholder: "Введите название товара или загрузите фото...",
    hero_analyze_btn: "Анализировать",
    
    // Headings & Lists
    categories_heading: "Категории",
    show_all_btn: "Показать все",
    best_offers_heading: "Лучшие предложения",
    deals_suffix: "предложения",
    count_products: "товаров",
    card_ai_badge: "Выбор ИИ",
    btn_details: "Подробнее",
    btn_buy: "Купить",
    btn_add_cart: "В корзину",
    currency_symbol: "сум",
    
    // Bottom Deals
    budget_fit_heading: "Товары под ваш бюджет",
    special_deals_heading: "Специальные скидки дня",
    see_all_arrow: "Все →",
    no_products_title: "В этой категории ничего не найдено",
    no_products_desc: "Попробуйте другую категорию или поисковый запрос, либо посмотрите все товары.",
    btn_show_all_products: "Показать все товары",

    // Right AI Panel
    right_ai_title: "AI Анализ товара",
    right_summary_title: "Краткий вывод",
    right_pros_title: "Преимущества",
    right_cons_title: "Недостатки",
    right_for_whom: "Кому подходит?",
    right_alternatives: "Более дешевые альтернативы",
    right_ai_verdict: "Рекомендация ИИ",

    // Settings Page
    settings_title: 'Настройки',
    settings_subtitle: 'Управляйте профилем, оповещениями и настройками ИИ',
    tab_profile: 'Настройки профиля',
    tab_orders: 'История заказов',
    tab_alerts: 'Оповещения о ценах',
    tab_addresses: 'Адрес доставки',
    tab_system: 'Параметры приложения и ИИ',
    tab_security: 'Безопасность и пароль',
    
    system_lang: 'Язык системы',
    lang_uz: "O'zbekcha (UZ)",
    lang_en: 'English (EN)',
    lang_ru: 'Русский (RU)',
    
    main_currency: 'Основная валюта',
    currency_uzs: "Сум (UZS)",
    currency_usd: 'Доллар США ($ USD)',
    
    ai_strategy: 'Стратегия искусственного интеллекта SmartSavdo',
    ai_strategy_max_save: 'Максимальная экономия',
    ai_strategy_max_save_desc: 'Приоритет на самые низкие цены в магазинах',
    ai_strategy_balanced: 'Сбалансированная (Рекомендуется)',
    ai_strategy_balanced_desc: 'Оптимальное соотношение цены и качества',
    ai_strategy_premium: 'Премиум качество',
    ai_strategy_premium_desc: 'Официальная гарантия и высокий рейтинг продавца',
    
    save_preferences: 'Сохранить настройки',
    preferences_saved: 'Настройки успешно сохранены! ✓',
    profile_saved: 'Данные профиля успешно сохранены! ✓',
    
    full_name: 'Полное имя',
    email: 'Электронная почта',
    phone: 'Номер телефона',
    region: 'Регион / Город',
    address: 'Адрес доставки',
    bio: 'О себе (кратко)',
    save_profile: 'Сохранить профиль',
    
    security_title: 'Безопасность и смена пароля',
    security_desc: 'Используйте надежный пароль для защиты вашего аккаунта',
    old_password: 'Старый пароль',
    new_password: 'Новый пароль',
    confirm_password: 'Подтвердите новый пароль',
    change_password: 'Обновить пароль',
    
    order_history: 'История заказов',
    order_history_desc: 'Все покупки, оформленные через SmartSavdo',
    order_history_empty: 'Заказов пока нет',
    total: 'Итого',
    status: 'Статус',
    status_paid: 'Оплачен',
    status_pending: 'В обработке',
    
    // Other Pages
    compare_title: 'Сравнение товаров',
    compare_subtitle: 'Сравнивайте характеристики и реальные цены в магазинах',
    budget_title: 'AI Бюджетный советник',
    budget_subtitle: 'Подбор лучших вариантов под ваш бюджет',
    price_history_title: 'Динамика и история цен',
    price_history_subtitle: 'Статистика изменения цен в магазинах со временем',
    favorites_title: 'Избранные товары',
    favorites_subtitle: 'Товары, за ценами которых вы следите',
    favorites_empty: 'В избранном пока ничего нет',
    
    // Search & Filter
    search_page_title: "Найдите самые выгодные цены во всех интернет-магазинах",
    search_page_desc: "Ищите по названию, бренду или категории. SmartSavdo AI автоматически найдет самую выгодную цену.",
    filter_heading: "Фильтры",
    filter_clear: "Сбросить",
    filter_category: "Категория",
    filter_shop: "Магазин",
    filter_max_price: "Макс. цена",
    filter_found_count: "Найдено товаров",
    filter_not_found: "Товары не найдены",
    filter_not_found_desc: "Попробуйте изменить поисковый запрос или сбросить фильтры.",
    sort_label: "Сортировка",
    sort_relevance: "По популярности",
    sort_price_asc: "Сначала дешевые",
    sort_price_desc: "Сначала дорогие",
    sort_rating: "По рейтингу",
    sort_discount: "С наибольшей скидкой",
    mobile_filter_btn: "Фильтры",
    swipe_hint: "← Листайте вбок →",
    compare_add_btn: "+ Добавить товар...",
    compare_empty_title: "Товары для сравнения не выбраны",
    compare_empty_desc: "Нажмите 'Сравнить' на карточке товара или выберите из списка выше.",
    compare_demo_btn: "Сравнить iPhone и Samsung для примера",
    param_rating: "Рейтинг",
    param_discount: "Скидка",
    param_best_shop: "Лучший магазин",
    param_warranty: "Гарантия",

    // Quick Actions
    lang_changed: 'Язык изменен на: Русский'
  }
};

export function localizeProduct(product, language) {
  if (!product) return product;
  if (language === 'uz') return product;

  const overrides = {
    ru: {
      1: {
        summary: "iPhone 15 — современный, надежный и качественный смартфон. Отлично подходит для повседневного использования, фото и видеосъемки.",
        pros: [
          "Мощная камера уровня A16 Bionic",
          "Быстрый процессор и интерактивный Dynamic Island",
          "Длительное время автономной работы на весь день",
          "Превосходный дисплей Super Retina XDR",
          "Новый универсальный разъем USB-C"
        ],
        cons: [
          "Высокая ценовая категория",
          "Ограничение скорости зарядки 20W",
          "Экран 120Hz ProMotion только в Pro версии"
        ],
        forWhom: "Для активного использования, любителей мобильной съемки и тех, кто ищет надежный смартфон на долгие годы.",
        aiVerdict: "Если вам важна отличная камера и долговечность — iPhone 15 лучший выбор. При ограниченном бюджете iPhone 14 также станет отличной альтернативой."
      },
      7: {
        summary: "Титановый корпус, профессиональная 200MP камера и встроенный искусственный интеллект Galaxy AI.",
        pros: [
          "Невероятная 200MP камера со 100-кратным зумом",
          "Топовый процессор Snapdragon 8 Gen 3",
          "Встроенное электронное перо S-Pen",
          "Galaxy AI: живой перевод звонков и умная обработка фото"
        ],
        cons: [
          "Крупные габариты и ощутимый вес",
          "Высокая стоимость"
        ],
        forWhom: "Для энтузиастов передовых технологий Android, предпринимателей и мобильных фотографов.",
        aiVerdict: "Самый мощный Android-флагман на рынке с официальной 7-летней гарантией обновлений!"
      },
      2: {
        summary: "Тонкий, легкий и невероятно быстрый ноутбук на базе энергоэффективного чипа Apple M2.",
        pros: ["Колоссальное время работы до 18 часов", "Бесшумное охлаждение без вентиляторов", "Яркий дисплей Liquid Retina", "Качественная клавиатура Magic Keyboard"],
        cons: ["Всего два порта Thunderbolt/USB 4", "Базовая версия имеет 8GB оперативной памяти"],
        forWhom: "Для студентов, разработчиков, дизайнеров и тех, кому важна максимальная мобильность.",
        aiVerdict: "Идеальный ультрабук для работы и учебы в поездках."
      },
      3: {
        summary: "4K QLED телевизор с миллиардом оттенков квантовых точек и умной системой Smart Hub на Tizen OS.",
        pros: ["Яркие, насыщенные квантовые цвета", "Мощный Quantum 4K процессор масштабирования", "Тонкий дизайн AirSlim без рамок"],
        cons: ["Углы обзора уступают OLED панелям"],
        forWhom: "Для любителей фильмов, сериалов и видеоигр в гостиной.",
        aiVerdict: "Превосходное соотношение цены и качества для семейного домашнего кинотеатра."
      },
      4: {
        summary: "Лучшее в мире активное шумоподавление и кристально чистый звук высокой четкости LDAC.",
        pros: ["Лучшее в индустрии шумоподавление с двумя чипами", "До 30 часов автономности с быстрой зарядкой", "Легкая и комфортная посадка"],
        cons: ["Конструкция не складывается полностью в шарнирах"],
        forWhom: "Для путешественников, работы в шумном офисе и меломанов.",
        aiVerdict: "Флагманские беспроводные наушники номер один для защиты от шума."
      },
      5: {
        summary: "Инверторный мотор с прямым приводом Direct Drive и функцией деликатной стирки паром Steam.",
        pros: ["Тихая работа без лишних вибраций", "Энергоэффективность класса A+++", "Технология AI DD определяет тип ткани"],
        cons: ["Большая глубина корпуса при установке"],
        forWhom: "Для семей с детьми и бережной заботы о гардеробе.",
        aiVerdict: "Надежная стиральная машина с искусственным интеллектом для длительной эксплуатации."
      },
      6: {
        summary: "Стильная ветрозащитная и влагоотталкивающая мужская куртка на демисезонную прохладную погоду.",
        pros: ["Плотная водоотталкивающая ткань", "Удобные глубокие карманы на молнии", "Современный минималистичный крой"],
        cons: ["Не предназначена для суровых зимних морозов"],
        forWhom: "Для повседневной городской носки в осенне-весенний период.",
        aiVerdict: "Практичный и модный элемент базового мужского гардероба."
      }
    },
    en: {
      1: {
        summary: "iPhone 15 is a modern, reliable, and premium smartphone. Ideal for daily usage, photography, and high quality video recording.",
        pros: [
          "Powerful A16 Bionic camera system",
          "High-performance processor & Dynamic Island",
          "All-day battery life",
          "Stunning Super Retina XDR display",
          "Convenient universal USB-C port"
        ],
        cons: [
          "High price segment",
          "20W charging speed limit",
          "120Hz ProMotion display limited to Pro model"
        ],
        forWhom: "Active daily users, photography enthusiasts, and anyone seeking long-term iOS stability.",
        aiVerdict: "If you prioritize top-tier camera results and long-lasting performance, iPhone 15 is an outstanding choice."
      },
      7: {
        summary: "Titanium frame, 200MP professional camera system, and built-in Galaxy AI intelligence.",
        pros: [
          "Incredible 200MP sensor and 100x zoom capability",
          "Flagship Snapdragon 8 Gen 3 performance",
          "Integrated S-Pen stylus",
          "Galaxy AI: real-time call translation & smart photo editing"
        ],
        cons: [
          "Large footprint and heavier weight",
          "Premium price tag"
        ],
        forWhom: "Tech enthusiasts wanting the most powerful Android phone, executives, and mobile creators.",
        aiVerdict: "The undisputed top-tier Android flagship with guaranteed 7 years of OS updates!"
      },
      2: {
        summary: "Ultra-thin, featherlight, and exceptionally fast laptop powered by the Apple M2 silicon chip.",
        pros: ["Massive battery life up to 18 hours", "Fanless, completely silent operation", "Brilliant Liquid Retina screen", "Comfortable Magic Keyboard"],
        cons: ["Only two Thunderbolt/USB 4 ports", "Base model starts with 8GB RAM"],
        forWhom: "Students, programmers, creatives, and business travelers.",
        aiVerdict: "The gold standard portable laptop for productivity on the go."
      },
      3: {
        summary: "4K QLED Smart TV featuring Quantum Dot technology and 100% color volume with Tizen OS.",
        pros: ["Vibrant quantum dot colors", "Quantum 4K AI upscaling processor", "Ultra-slim AirSlim bezel-less design"],
        cons: ["Viewing angles not as wide as OLED"],
        forWhom: "Movie lovers, sports fans, and console gamers in the living room.",
        aiVerdict: "Unbeatable value and picture quality for family home theater entertainment."
      },
      4: {
        summary: "Industry-leading active noise cancellation with Hi-Res Audio and LDAC codec support.",
        pros: ["Best-in-class noise cancellation with 8 mics", "30 hours of battery life with quick charge", "Plush, feather-light ergonomic headband"],
        cons: ["Does not fold down as compactly as XM4"],
        forWhom: "Frequent travelers, remote workers, and demanding audiophiles.",
        aiVerdict: "The benchmark premium noise-canceling headphones today."
      },
      5: {
        summary: "Direct Drive inverter motor with AI DD fabric sensing and Steam allergy care wash.",
        pros: ["Whisper-quiet operation with minimal vibrations", "Top A+++ energy efficiency rating", "AI DD detects fabric weight and softness"],
        cons: ["Requires ample space in depth"],
        forWhom: "Families needing reliable, gentle, and hygienic laundry care.",
        aiVerdict: "A durable and smart washing machine built for years of peace of mind."
      },
      6: {
        summary: "Sleek windproof and water-resistant jacket tailored for transitional spring and autumn seasons.",
        pros: ["Durable water-repellent shell", "Spacious secure zip pockets", "Modern, versatile urban fit"],
        cons: ["Not insulated for deep winter cold"],
        forWhom: "Everyday urban commuters seeking lightweight weather protection.",
        aiVerdict: "A dependable and sharp layering essential for everyday style."
      }
    }
  };

  const productOverrides = overrides[language]?.[product.id];
  if (productOverrides) {
    return { ...product, ...productOverrides };
  }
  return product;
}

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('smartsavdo_language');
      if (saved && (saved === 'uz' || saved === 'en' || saved === 'ru')) {
        return saved;
      }
    } catch {}
    return 'uz';
  });

  const setLanguage = (newLang) => {
    if (newLang === 'uz' || newLang === 'en' || newLang === 'ru') {
      setLanguageState(newLang);
      try {
        localStorage.setItem('smartsavdo_language', newLang);
      } catch {}
    }
  };

  const t = (key, fallback = '') => {
    const langDict = translations[language] || translations.uz;
    if (langDict && langDict[key] !== undefined) {
      return langDict[key];
    }
    // Fallback to uz if not found in current language
    if (translations.uz && translations.uz[key] !== undefined) {
      return translations.uz[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations, localizeProduct }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
