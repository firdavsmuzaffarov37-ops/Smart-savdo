import React, { useState, useMemo, useEffect } from 'react';
import {
  Camera, Search, Sparkles, ArrowRight, Heart, Star, TrendingDown,
  ChevronRight, Zap, Check, X, Bell, ExternalLink, ThumbsUp, ShieldCheck,
  Cpu, Battery, Smartphone, Eye, SlidersHorizontal, ShoppingBag, ShoppingCart
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutModal from '../components/CheckoutModal';
import { allProducts } from '../data/products';

// ─── CATEGORIES & FILTER TABS ─────────────────────────────────────────────────

const categories = [
  { label: 'Smartfonlar', filterKey: 'Smartfonlar', img: '/products/iphone-15.jpg' },
  { label: 'Noutbuklar', filterKey: 'Noutbuklar', img: '/products/macbook-air.jpg' },
  { label: 'Televizorlar', filterKey: 'Televizorlar', img: '/products/samsung-tv.jpg' },
  { label: 'Naushniklar', filterKey: 'Naushniklar', img: '/products/sony-headphones.jpg' },
  { label: 'Maishiy texnika', filterKey: 'Maishiy texnika', img: '/products/washing-machine.jpg' },
  { label: 'Kiyim', filterKey: 'Kiyim', img: '/products/jacket.jpg' },
];

const filterTabs = ['Barchasi', 'Smartfonlar', 'Noutbuklar', 'Televizorlar', 'Naushniklar', 'Maishiy texnika', 'Kiyim'];

// Use shared allProducts from data/products.js
const productList = allProducts;


export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('Barchasi');
  const [searchValue, setSearchValue] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(productList[0]);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState('');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [checkoutShop, setCheckoutShop] = useState(null);

  const { addToCart } = useCart();

  // Smart Filtering by Category, Tabs, and Search Query
  const filteredProducts = useMemo(() => {
    return productList.filter((product) => {
      // 1. Check Search Query
      const query = searchValue.trim().toLowerCase();
      if (query) {
        const nameMatch = product.name.toLowerCase().includes(query);
        const brandMatch = product.brand.toLowerCase().includes(query);
        const catMatch = product.category.toLowerCase().includes(query);
        const tagMatch = product.tags && product.tags.some(t => t.toLowerCase().includes(query));
        if (!nameMatch && !brandMatch && !catMatch && !tagMatch) return false;
      }

      // 2. Check Active Category / Filter tab
      if (activeFilter === 'Barchasi') return true;

      const normFilter = activeFilter.toLowerCase();
      const normCat = product.category.toLowerCase();

      if (normCat === normFilter) return true;
      if (normCat.includes(normFilter) || normFilter.includes(normCat)) return true;

      // Category aliases
      if (normFilter === 'iphone' || normFilter === 'telefon' || normFilter === 'telefonlar' || normFilter === 'smartfon' || normFilter === 'smartfonlar') {
        return normCat === 'smartfonlar';
      }
      if (normFilter === 'tv' || normFilter === 'televizor' || normFilter === 'televizorlar') {
        return normCat === 'televizorlar';
      }
      if (normFilter === 'noutbuk' || normFilter === 'noutbuklar') {
        return normCat === 'noutbuklar';
      }
      if (normFilter === 'naushnik' || normFilter === 'naushniklar') {
        return normCat === 'naushniklar';
      }
      if (normFilter === 'kiyim' || normFilter === 'kiyimlar') {
        return normCat === 'kiyim';
      }
      if (normFilter === 'maishiy texnika' || normFilter === 'texnika') {
        return normCat === 'maishiy texnika';
      }

      if (product.tags && product.tags.some(t => t.toLowerCase() === normFilter || normFilter.includes(t.toLowerCase()))) {
        return true;
      }

      return false;
    });
  }, [activeFilter, searchValue]);

  // Sync right panel selected product with current filter
  useEffect(() => {
    if (filteredProducts.length > 0 && !filteredProducts.some(p => p.id === selectedProduct?.id)) {
      setSelectedProduct(filteredProducts[0]);
    }
  }, [filteredProducts, selectedProduct]);

  const handlePriceAlert = (productName) => {
    setAlertSuccess(`${productName} uchun narx tushganda telegram / email xabarnoma faollashtirildi! ✓`);
    setTimeout(() => setAlertSuccess(''), 4000);
  };

  const handleOpenDetail = (product) => {
    setSelectedProduct(product);
    setRightPanelOpen(true);
    setModalOpen(true);
  };

  const handleBuyProduct = (product, shop = null) => {
    setCheckoutProduct(product);
    setCheckoutShop(shop);
    setCheckoutModalOpen(true);
  };

  return (
    <div className="flex flex-col xl:flex-row min-h-full">
      {/* ─── CENTER FEED (MAIN CONTENT) ─── */}
      <div className="flex-1 p-4 md:p-6 space-y-6 max-w-[1050px] mx-auto min-w-0">

        {/* ── Alert Toast ── */}
        {alertSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-500 text-white font-medium text-sm flex items-center justify-between shadow-lg shadow-emerald-500/25 animate-fadeIn">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 bg-white/20 rounded-full p-0.5" />
              <span>{alertSuccess}</span>
            </div>
            <button onClick={() => setAlertSuccess('')} className="text-white/80 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── HERO BANNER ── */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white via-emerald-50/70 to-green-100/50 border border-emerald-100/80 p-5 md:p-8 shadow-sm">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-200/25 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-6 items-center justify-between relative z-10">
            {/* Left text */}
            <div className="flex-1 max-w-xl">
              <h1 className="text-2xl md:text-[32px] font-extrabold text-slate-800 leading-tight mb-2">
                Xarid qilishdan oldin{' '}
                <span className="text-emerald-600 inline-block">SmartSavdo</span> bilan maslahat qiling!
              </h1>
              <p className="text-[13px] md:text-[14px] text-slate-500 leading-relaxed mb-5">
                Sun'iy intellekt yordamida mahsulotlarni tahlil qiling, narxlarni solishtiring va pulni tejang.
              </p>

              {/* Search bar */}
              <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm border border-slate-200 p-1.5 pl-3.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  placeholder="Mahsulot nomini yozing yoki rasmini yuklang..."
                  className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder-slate-400 outline-none"
                />
                <button
                  title="Rasm orqali qidirish"
                  className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleOpenDetail(productList[0])}
                  className="btn-green px-4 py-2 text-[13px] flex items-center gap-1.5 whitespace-nowrap"
                >
                  Tahlil qilish <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Filter tabs */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {filterTabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-3 py-1 rounded-full text-[11.5px] font-medium border transition-all ${
                      activeFilter === tab
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-500/25'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Right 3D Robot Illustration with Shopping Bag */}
            <div className="flex-shrink-0 relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-300/30 rounded-full blur-2xl animate-pulse" />
              <img
                src="/robot.jpg"
                alt="SmartSavdo AI Shopping Robot"
                className="w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300 rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* ── KATEGORIYALAR (CATEGORIES WITH REAL PRODUCT IMAGES) ── */}
        {/* ── KATEGORIYALAR (CATEGORIES WITH REAL PRODUCT IMAGES) ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px] font-bold text-slate-800">Kategoriyalar</h2>
            {activeFilter !== 'Barchasi' && (
              <button
                onClick={() => {
                  setActiveFilter('Barchasi');
                  setSearchValue('');
                }}
                className="text-[12px] font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg transition-colors"
              >
                Barchasini ko'rsatish
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {categories.map(({ label, img }) => {
              const isCatActive = activeFilter.toLowerCase() === label.toLowerCase() ||
                (label === 'Smartfonlar' && (activeFilter.toLowerCase() === 'iphone' || activeFilter.toLowerCase() === 'telefon')) ||
                (label === 'Televizorlar' && activeFilter.toLowerCase() === 'tv') ||
                (label === 'Noutbuklar' && activeFilter.toLowerCase() === 'noutbuk') ||
                (label === 'Naushniklar' && activeFilter.toLowerCase() === 'naushnik');

              return (
                <div
                  key={label}
                  onClick={() => {
                    setActiveFilter(label);
                    setSearchValue('');
                  }}
                  className={`app-card app-card-hover p-3 flex flex-col items-center gap-2 cursor-pointer group bg-white border transition-all ${
                    isCatActive
                      ? 'border-emerald-500 ring-2 ring-emerald-500/30 bg-emerald-50/50 shadow-sm'
                      : 'border-slate-100 hover:border-emerald-200'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center p-1 transition-colors ${
                    isCatActive ? 'bg-emerald-100/70' : 'bg-slate-50/60 group-hover:bg-emerald-50/60'
                  }`}>
                    <img
                      src={img}
                      alt={label}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                  <span className={`text-[12px] font-semibold text-center leading-tight transition-colors ${
                    isCatActive ? 'text-emerald-700 font-bold' : 'text-slate-700 group-hover:text-emerald-600'
                  }`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── ENG YAXSHI TAKLIFLAR (BEST OFFERS) ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] font-bold text-slate-800">
                {activeFilter === 'Barchasi' ? 'Eng yaxshi takliflar' : `${activeFilter} takliflari`}
              </h2>
              <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                {filteredProducts.length} ta mahsulot
              </span>
            </div>
            {activeFilter !== 'Barchasi' && (
              <button
                onClick={() => {
                  setActiveFilter('Barchasi');
                  setSearchValue('');
                }}
                className="flex items-center gap-1 text-[12.5px] text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
              >
                Barchasi <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full py-12 px-4 text-center bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Ushbu toifada mahsulot topilmadi</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Boshqa kategoriya yoki qidiruv so'zini sinab ko'ring yoki barcha mahsulotlarni ko'ring.
                </p>
                <button
                  onClick={() => {
                    setActiveFilter('Barchasi');
                    setSearchValue('');
                  }}
                  className="btn-green px-5 py-2.5 text-xs font-bold rounded-xl shadow-sm"
                >
                  Barcha mahsulotlarni ko'rsatish
                </button>
              </div>
            ) : (
              filteredProducts.map((product) => {
                const isSelected = selectedProduct.id === product.id;
                return (
                  <div
                    key={product.id}
                    className={`app-card app-card-hover flex flex-col overflow-hidden relative border transition-all ${
                      isSelected ? 'ring-2 ring-emerald-500 border-emerald-400' : 'border-slate-100'
                    }`}
                  >
                    {/* AI Badge */}
                    {product.isAI && (
                      <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm soft-pulse">
                        <Sparkles className="w-3 h-3" />
                        AI tavsiya
                      </div>
                    )}

                    {/* Discount tag */}
                    <div className="absolute top-2.5 right-2.5 z-10 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      {product.discount}%
                    </div>

                    {/* Product Image (REAL PHOTO) */}
                    <div
                      className="relative bg-gradient-to-b from-slate-50 to-white overflow-hidden cursor-pointer"
                      style={{ aspectRatio: '1 / 1' }}
                      onClick={() => handleOpenDetail(product)}
                    >
                      <img
                        src={product.img}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300 drop-shadow-md"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-3.5 flex flex-col flex-1 bg-white">
                      <div className="text-[11px] text-slate-400 font-medium">{product.brand}</div>
                      <div className="text-[14px] font-bold text-slate-800 leading-tight mb-1">{product.name}</div>

                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-[14px] font-extrabold text-slate-800">{product.price} so'm</span>
                        {product.oldPrice && (
                          <span className="text-[11px] text-slate-400 line-through">{product.oldPrice}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-3">
                        <div className="flex items-center text-amber-500 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                          {product.rating}
                        </div>
                        <span>•</span>
                        <span className="text-slate-600 font-medium">{product.shop}</span>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-auto space-y-1.5">
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            onClick={() => handleOpenDetail(product)}
                            className="w-full py-2 text-[12px] bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors font-bold flex items-center justify-center gap-1"
                          >
                            Batafsil
                          </button>
                          <button
                            onClick={() => handleBuyProduct(product)}
                            className="btn-green w-full py-2 text-[12px] flex items-center justify-center gap-1 font-bold shadow-xs"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Sotib olish
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            onClick={() => addToCart(product)}
                            className="w-full py-1.5 text-[11px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors font-semibold border border-emerald-200/60 flex items-center justify-center gap-1"
                          >
                            <ShoppingCart className="w-3 h-3" />
                            Savatga
                          </button>
                          <button
                            onClick={() => handlePriceAlert(product.name)}
                            className="w-full py-1.5 text-[11px] text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors font-medium border border-slate-200/60 flex items-center justify-center gap-1"
                          >
                            Taqqoslash
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── 3 STATUS / BENEFIT CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-[13px] leading-tight">Bu oyda siz 1 250 000 so'm gacha tejashingiz mumkin!</div>
              <div className="text-[11px] text-emerald-50/80 mt-1">Narxlarni solishtirish orqali eng yaxshi takliflarni toping.</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-[13px] leading-tight">Eng yaxshi takliflar</div>
              <div className="text-[11px] text-amber-50/80 mt-1">50+ do'konlardan eng yaxshi narxlar va chegirmalar.</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-[13px] leading-tight">Narxlar tarixi</div>
              <div className="text-[11px] text-teal-50/80 mt-1">Mahsulot narxlarining o'zgarishini kuzating va arzon paytda oling.</div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM SECTIONS: CHEGIRMALAR & BYUDJET ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Narxi tushganlar */}
          <div className="app-card p-4 border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[14px] font-bold text-slate-800">Narxi tushgan mahsulotlar</h3>
              <span className="text-[11.5px] text-emerald-600 font-semibold cursor-pointer">Barchasi →</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: 'iPhone 15 Blue', discount: '-12%', img: '/products/iphone-15.jpg', price: '11.9M' },
                { name: 'MacBook Air', discount: '-15%', img: '/products/macbook-air.jpg', price: '16.4M' },
                { name: 'Sony WH-XM5', discount: '-20%', img: '/products/sony-headphones.jpg', price: '4.2M' },
              ].map(item => (
                <div key={item.name} className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50/50 transition-colors flex flex-col items-center text-center cursor-pointer relative">
                  <span className="absolute top-1.5 left-1.5 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">{item.discount}</span>
                  <div className="w-14 h-14 my-1">
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="text-[11px] font-semibold text-slate-700 truncate w-full">{item.name}</div>
                  <div className="text-[10.5px] font-bold text-emerald-600">{item.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Byudjetingizga mos */}
          <div className="app-card p-4 border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[14px] font-bold text-slate-800">Byudjetingizga mos mahsulotlar</h3>
              <span className="text-[11.5px] text-emerald-600 font-semibold cursor-pointer">Barchasi →</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { range: '1M – 3M so\'m', name: 'Quloqchinlar', img: '/products/sony-headphones.jpg' },
                { range: '3M – 8M so\'m', name: 'Smartfonlar', img: '/products/iphone-15.jpg' },
                { range: '8M+ so\'m', name: 'Noutbuklar', img: '/products/macbook-air.jpg' },
              ].map(item => (
                <div key={item.range} className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50/50 transition-colors flex flex-col items-center text-center cursor-pointer relative">
                  <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full mb-1">{item.range}</span>
                  <div className="w-14 h-14 my-1">
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="text-[11px] font-semibold text-slate-700 truncate w-full">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ─── RIGHT SIDEBAR (AI MAHSULOT TAHLILI & NARX TARIXI) ─── */}
      {rightPanelOpen && (
        <aside className="w-full xl:w-[380px] bg-white border-l border-slate-200/80 p-5 flex flex-col gap-5 overflow-y-auto max-h-screen sticky top-0 flex-shrink-0 shadow-sm">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-[15px]">
              <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span>AI Mahsulot tahlili</span>
            </div>
            <button
              onClick={() => setRightPanelOpen(false)}
              className="xl:hidden p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Product Header Card */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-16 h-16 rounded-xl bg-white p-1.5 shadow-sm border border-slate-100 flex-shrink-0">
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs text-slate-400 font-medium">{selectedProduct.brand}</div>
              <div className="text-[15px] font-extrabold text-slate-800 leading-tight">{selectedProduct.name}</div>
              <div className="text-[14px] font-extrabold text-emerald-600 mt-0.5">{selectedProduct.price} so'm</div>
            </div>
          </div>

          {/* Qisqacha xulosa */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Qisqacha xulosa
            </div>
            <p className="text-[12.5px] text-slate-600 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100">
              {selectedProduct.summary}
            </p>
          </div>

          {/* Afzalliklari va Kamchiliklari */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Pros */}
            <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
              <div className="text-[12px] font-bold text-emerald-800 mb-2 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Afzalliklari
              </div>
              <ul className="space-y-1.5">
                {selectedProduct.pros.slice(0, 3).map((pro, i) => (
                  <li key={i} className="text-[11px] text-emerald-900/80 flex items-start gap-1.5 leading-snug">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100">
              <div className="text-[12px] font-bold text-rose-800 mb-2 flex items-center gap-1">
                <X className="w-3.5 h-3.5 text-rose-600" /> Kamchiliklari
              </div>
              <ul className="space-y-1.5">
                {selectedProduct.cons.slice(0, 2).map((con, i) => (
                  <li key={i} className="text-[11px] text-rose-900/80 flex items-start gap-1.5 leading-snug">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Kimlar uchun mos? */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[12px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <span>👥</span> Kimlar uchun mos?
            </div>
            <p className="text-[11.5px] text-slate-600 leading-snug">
              {selectedProduct.forWhom}
            </p>
          </div>

          {/* Arzonroq muqobillar */}
          <div>
            <div className="text-[12px] font-bold text-slate-700 mb-2">Arzonroq muqobillar</div>
            <div className="grid grid-cols-2 gap-2">
              {selectedProduct.alternatives.map((alt) => (
                <div key={alt.name} className="p-2.5 rounded-xl border border-slate-200/80 hover:border-emerald-300 transition-colors flex items-center gap-2 cursor-pointer bg-white">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-50 p-1">
                    <img src={alt.img} alt={alt.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-slate-800 truncate">{alt.name}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">{alt.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI tavsiyasi */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-sm space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[13px]">
              <Sparkles className="w-4 h-4 text-emerald-200" />
              AI tavsiyasi
            </div>
            <p className="text-[12px] text-emerald-50 leading-relaxed">
              {selectedProduct.aiVerdict}
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="w-full py-2 bg-white text-emerald-700 font-bold rounded-xl text-[12px] shadow hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5 mt-2"
            >
              Batafsil tahlilni ko'rish <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="grid grid-cols-2 gap-2 mt-2 pt-1">
              <button
                onClick={() => handleBuyProduct(selectedProduct)}
                className="w-full py-2.5 bg-slate-900 text-white hover:bg-slate-800 font-bold rounded-xl text-[12px] shadow hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                Sotib olish
              </button>
              <button
                onClick={() => addToCart(selectedProduct)}
                className="w-full py-2.5 bg-emerald-700/60 hover:bg-emerald-700 text-white font-bold rounded-xl text-[12px] transition-colors flex items-center justify-center gap-1.5 border border-emerald-400/40"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Savatga
              </button>
            </div>
          </div>

          {/* Narx tarixi grafik kartochkasi */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-[13px] font-bold text-slate-800">Narx tarixi</div>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">30 kun</span>
            </div>

            {/* Interactive SVG Chart */}
            <div className="h-28 w-full relative">
              <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal grid lines */}
                <line x1="0" y1="20" x2="300" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="80" x2="300" y2="80" stroke="#f1f5f9" strokeWidth="1" />

                {/* Area under line */}
                <path
                  d="M 10 30 L 75 45 L 150 25 L 225 55 L 290 80 L 290 95 L 10 95 Z"
                  fill="url(#chartFill)"
                />
                {/* Trend line */}
                <path
                  d="M 10 30 L 75 45 L 150 25 L 225 55 L 290 80"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Tooltip on peak point */}
                <circle cx="150" cy="25" r="4" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <rect x="110" y="2" width="80" height="18" rx="4" fill="#1e293b" />
                <text x="150" y="14" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                  12 499 000 so'm
                </text>
              </svg>
            </div>

            {/* Dates row */}
            <div className="flex justify-between text-[10px] text-slate-400 font-medium px-1">
              <span>1 Apr</span>
              <span>8 Apr</span>
              <span>15 Apr</span>
              <span>22 Apr</span>
              <span>29 Apr</span>
            </div>

            {/* Price stats */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
              <div>
                <div className="text-[10px] text-slate-400">Joriy narx</div>
                <div className="text-[11px] font-bold text-slate-800">{selectedProduct.price}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Eng past</div>
                <div className="text-[11px] font-bold text-emerald-600">{selectedProduct.priceMin}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Eng yuqori</div>
                <div className="text-[11px] font-bold text-slate-700">{selectedProduct.priceMax}</div>
              </div>
            </div>

            {/* Narx tushganda xabar ber button */}
            <button
              onClick={() => handlePriceAlert(selectedProduct.name)}
              className="btn-green w-full py-2.5 text-[12px] flex items-center justify-center gap-1.5 font-bold"
            >
              <Bell className="w-3.5 h-3.5" />
              Narx tushganda xabar ber
            </button>
          </div>

          {/* Handwritten slogan */}
          <div className="text-center font-handwriting text-2xl text-emerald-700/85 pt-1">
            Aqlli xarid — katta tejash! ↗
          </div>
        </aside>
      )}

      {/* ─── FULL INTERACTIVE MODAL FOR "BATAFSIL TAHLIL" ─── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-center gap-5 pb-5 border-b border-slate-100">
              <div className="w-28 h-28 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex-shrink-0 flex items-center justify-center">
                <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold mb-1.5">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  Sun'iy Intellekt Chuqur Tahlili
                </div>
                <h2 className="text-2xl font-black text-slate-800">{selectedProduct.name}</h2>
                <div className="text-sm text-slate-400">{selectedProduct.brand} • {selectedProduct.shop}</div>
                <div className="text-xl font-extrabold text-emerald-600 mt-1">{selectedProduct.price} so'm</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-center flex-shrink-0">
                <div className="text-2xl font-black text-emerald-600">{selectedProduct.overallScore}</div>
                <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">AI Reytingi / 10</div>
              </div>
            </div>

            {/* Do'konlar narxlari solishtiruvi */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                  Do'konlar bo'yicha eng arzon narxlar solishtiruvi
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                  Eng foydali do'kondan oling
                </span>
              </h3>
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden shadow-xs">
                {selectedProduct.shops.map((s, idx) => (
                  <div key={idx} className={`p-3 sm:p-3.5 flex items-center justify-between text-xs ${s.isBest ? 'bg-emerald-50/70 font-bold' : 'hover:bg-slate-50'}`}>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800 text-[13px]">{s.name}</span>
                      {s.isBest && (
                        <span className="bg-emerald-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                          Eng arzon taklif!
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="text-slate-500 font-normal hidden sm:inline">{s.delivery} yetkazish</span>
                      <span className="text-slate-900 font-black text-[13px] sm:text-[13.5px]">{s.price}</span>
                      <button
                        onClick={() => {
                          setModalOpen(false);
                          handleBuyProduct(selectedProduct, s);
                        }}
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-xs flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        Sotib olish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Xususiyatlar ballari */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-emerald-600" />
                Funksiyalar va Ko'rsatkichlar tahlili
              </h3>
              <div className="space-y-2.5">
                {[
                  { label: 'Kamera va Video sifati', score: selectedProduct.scores.camera },
                  { label: 'Batareya va Quvvat saqlash', score: selectedProduct.scores.battery },
                  { label: 'Tezlik va Protsessor unumdorligi', score: selectedProduct.scores.performance },
                  { label: 'Ekran va Rang uzatish sifati', score: selectedProduct.scores.display },
                  { label: 'Narx va Sifat mutanosibligi', score: selectedProduct.scores.value },
                ].filter(item => item.score > 0).map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>{item.label}</span>
                      <span className="text-emerald-600 font-bold">{item.score} / 10</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500"
                        style={{ width: `${item.score * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Maslahatchi xulosasi */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-emerald-900 text-[13px]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                SmartSavdo Sun'iy Intellekt maslahati:
              </div>
              <p>
                Ushbu mahsulot narxi oxirgi 30 kun ichida eng qulay nuqtasiga yetgan. Agar siz sifatli va uzoq xizmat qiluvchi qurilma qidirayotgan bo'lsangiz, hozirgi narxda xarid qilish 100% o'zini oqlaydi!
              </p>
            </div>

            {/* ─── YOQDIMI? SOTIB OLISH BANNERI ─── */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white shadow-lg shadow-emerald-600/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 font-black text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  Mahsulot ma'qul keldimi?
                </div>
                <p className="text-xs text-emerald-100">
                  Eng arzon kafolatlangan narxda hoziroq buyurtma bering yoki savatingizga saqlang!
                </p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setModalOpen(false);
                    handleBuyProduct(selectedProduct);
                  }}
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-600" />
                  Ha, sotib olish
                </button>
                <button
                  onClick={() => addToCart(selectedProduct)}
                  className="px-3.5 py-2.5 bg-emerald-800/60 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl border border-emerald-400/40 transition-colors flex items-center justify-center gap-1"
                  title="Savatga saqlash"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Savatga
                </button>
              </div>
            </div>

            {/* Modal footer actions */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                onClick={() => {
                  setModalOpen(false);
                  handleBuyProduct(selectedProduct);
                }}
                className="btn-green flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-500/25"
              >
                <ShoppingBag className="w-4 h-4" /> Hoziroq sotib olish
              </button>
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                }}
                className="px-4 py-3 text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingCart className="w-4 h-4" /> Savatga
              </button>
              <button
                onClick={() => {
                  handlePriceAlert(selectedProduct.name);
                  setModalOpen(false);
                }}
                className="px-4 py-3 text-xs font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <Bell className="w-3.5 h-3.5" /> Narx kuzatish
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-3 text-sm font-semibold text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── CHECKOUT MODAL ─── */}
      {checkoutModalOpen && (
        <CheckoutModal
          isOpen={checkoutModalOpen}
          product={checkoutProduct}
          initialShop={checkoutShop}
          onClose={() => {
            setCheckoutModalOpen(false);
            setCheckoutProduct(null);
            setCheckoutShop(null);
          }}
        />
      )}

    </div>
  );
}
