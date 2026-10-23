import React, { useState, useMemo } from 'react';
import { 
  Search, SlidersHorizontal, ArrowUpDown, Star, Sparkles, 
  ShoppingBag, ShoppingCart, Heart, Check, X, Camera, Store,
  ChevronDown, ChevronUp, Filter
} from 'lucide-react';
import { allProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useLanguage, localizeProduct } from '../context/LanguageContext';
import CheckoutModal from '../components/CheckoutModal';

export default function SearchPage() {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const { language, t } = useLanguage();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [selectedShop, setSelectedShop] = useState('Barchasi');
  const [sortBy, setSortBy] = useState('relevance');
  const [maxPrice, setMaxPrice] = useState(20000000);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState(null);

  const categories = [
    { key: 'Barchasi', label: t('cat_all') },
    { key: 'Smartfonlar', label: t('cat_smartphones') },
    { key: 'Noutbuklar', label: t('cat_laptops') },
    { key: 'Televizorlar', label: t('cat_tvs') },
    { key: 'Naushniklar', label: t('cat_headphones') },
    { key: 'Maishiy texnika', label: t('cat_appliances') },
    { key: 'Kiyim', label: t('cat_clothing') }
  ];

  const shops = ['Barchasi', 'Olcha.uz', 'Uzum Market', 'Texnomart', 'MediaPark', 'iCoolStore', 'TechnoHouse'];

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'Barchasi') count++;
    if (selectedShop !== 'Barchasi') count++;
    if (maxPrice < 20000000) count++;
    return count;
  }, [selectedCategory, selectedShop, maxPrice]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      // 1. Text Query
      const q = query.trim().toLowerCase();
      if (q) {
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesTags = p.tags && p.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesCat && !matchesTags) return false;
      }

      // 2. Category
      if (selectedCategory !== 'Barchasi' && p.category !== selectedCategory) {
        return false;
      }

      // 3. Shop
      if (selectedShop !== 'Barchasi') {
        const hasShop = p.shop === selectedShop || (p.shops && p.shops.some(s => s.name === selectedShop));
        if (!hasShop) return false;
      }

      // 4. Max Price
      if (p.priceNum > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNum - b.priceNum;
      if (sortBy === 'price-desc') return b.priceNum - a.priceNum;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discount - a.discount;
      return 0; // relevance
    });
  }, [query, selectedCategory, selectedShop, sortBy, maxPrice]);

  const clearAllFilters = () => {
    setQuery('');
    setSelectedCategory('Barchasi');
    setSelectedShop('Barchasi');
    setMaxPrice(20000000);
    setSortBy('relevance');
  };

  return (
    <div className="p-3 sm:p-5 md:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn min-w-0">
      
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden">
        <div className="max-w-2xl space-y-2.5 sm:space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] sm:text-xs font-bold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            AI Aqlli Qidiruv
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight">
            {t('search_page_title')}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            {t('search_page_desc')}
          </p>

          {/* Search bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-lg text-slate-800 mt-2 sm:mt-3">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 ml-1.5 sm:ml-2 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search_input_placeholder')}
              className="flex-1 px-1.5 sm:px-2 py-1.5 text-xs sm:text-sm outline-none text-slate-700 placeholder-slate-400 bg-transparent font-medium min-w-0"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {}}
              className="btn-green px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-xs flex items-center gap-1 shadow-sm flex-shrink-0"
            >
              <Search className="w-3.5 h-3.5 sm:hidden" />
              <span className="hidden sm:inline">{t('hero_analyze_btn')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Filter Toggle Bar */}
      <div className="lg:hidden flex items-center justify-between gap-2 bg-white p-3 rounded-2xl border border-slate-100 shadow-xs">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            showMobileFilters || activeFiltersCount > 0
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
          <span>{t('filter_heading')}</span>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-black">
              {activeFiltersCount}
            </span>
          )}
          {showMobileFilters ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
        </button>

        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="px-3 py-2 text-xs font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
          >
            {t('filter_clear')}
          </button>
        )}
      </div>

      {/* Main Filter & Results Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Filters Sidebar: permanent on lg, collapsible on mobile/tablet */}
        <div className={`bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm space-y-5 h-fit ${
          showMobileFilters ? 'block' : 'hidden lg:block'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" /> {t('filter_heading')}
            </span>
            <button
              onClick={clearAllFilters}
              className="text-[11px] font-semibold text-emerald-600 hover:underline"
            >
              {t('filter_clear')}
            </button>
          </div>

          {/* Category filter */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">{t('filter_category')}</label>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-1">
              {categories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors truncate ${
                    selectedCategory === cat.key
                      ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Shop filter */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">{t('filter_shop')}</label>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-1">
              {shops.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedShop(s)}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors truncate ${
                    selectedShop === s
                      ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-bold text-slate-700">{t('filter_max_price')}:</span>
              <span className="font-extrabold text-emerald-600">
                {(maxPrice / 1000000).toFixed(1)} mln {t('currency_symbol')}
              </span>
            </div>
            <input
              type="range"
              min={300000}
              max={20000000}
              step={200000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>300 ming</span>
              <span>20 mln</span>
            </div>
          </div>

          {/* Done button on mobile */}
          <div className="pt-2 lg:hidden">
            <button
              onClick={() => setShowMobileFilters(false)}
              className="btn-green w-full py-2.5 rounded-xl text-xs font-bold"
            >
              Natijalarni ko'rish ({filteredProducts.length})
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3 space-y-3 sm:space-y-4">
          
          {/* Top Sort & Count Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white p-3 sm:p-3.5 rounded-2xl border border-slate-100 shadow-xs">
            <span className="text-xs font-bold text-slate-700">
              {t('filter_found_count')}: <strong className="text-emerald-600 font-extrabold">{filteredProducts.length}</strong> {t('count_products')}
            </span>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 whitespace-nowrap">{t('sort_label')}:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-2.5 py-1.5 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 bg-white font-semibold text-slate-700 text-xs cursor-pointer"
              >
                <option value="relevance">{t('sort_relevance')}</option>
                <option value="price-asc">{t('sort_price_asc')}</option>
                <option value="price-desc">{t('sort_price_desc')}</option>
                <option value="rating">{t('sort_rating')}</option>
                <option value="discount">{t('sort_discount')}</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-100 shadow-sm space-y-3">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">{t('filter_not_found')}</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {t('filter_not_found_desc')}
              </p>
              <button
                onClick={clearAllFilters}
                className="btn-green px-4 py-2 text-xs font-bold rounded-xl"
              >
                {t('filter_clear')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-2.5 sm:gap-4">
              {filteredProducts.map(rawProduct => {
                const product = localizeProduct(rawProduct, language);
                const fav = isFavorite(product.id);
                return (
                  <div
                    key={product.id}
                    className="app-card app-card-hover bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col relative group"
                  >
                    {/* Favorite Heart Button */}
                    <button
                      onClick={() => toggleFavorite(rawProduct)}
                      className={`absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                        fav
                          ? 'bg-rose-50 text-rose-500'
                          : 'bg-white/90 backdrop-blur-xs text-slate-400 hover:text-rose-500 shadow-xs'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${fav ? 'fill-rose-500' : ''}`} />
                    </button>

                    {/* AI Badge */}
                    {product.isAI && (
                      <div className="absolute top-2 left-2 z-10 bg-emerald-500 text-white text-[8px] sm:text-[9px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs">
                        {t('card_ai_badge')}
                      </div>
                    )}

                    {/* Image */}
                    <div className="h-32 sm:h-44 p-2 sm:p-4 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-2.5 sm:p-4 flex flex-col flex-1">
                      <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold tracking-wider truncate">
                        {product.brand} • {product.category}
                      </div>
                      <h4 className="font-bold text-slate-800 text-xs sm:text-sm truncate mt-0.5" title={product.name}>
                        {product.name}
                      </h4>

                      <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-500 mt-1 mb-1.5 sm:mb-2 truncate">
                        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400 flex-shrink-0" />
                        <span className="font-bold text-slate-700">{product.rating}</span>
                        <span>•</span>
                        <span className="text-emerald-600 font-semibold truncate">{product.shop}</span>
                      </div>

                      <div className="flex flex-wrap items-baseline gap-1 sm:gap-2 mb-2 sm:mb-3">
                        <span className="text-xs sm:text-base font-black text-slate-900 leading-tight">
                          {product.price} {t('currency_symbol')}
                        </span>
                        {product.oldPrice && (
                          <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                            {product.oldPrice}
                          </span>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="mt-auto grid grid-cols-2 gap-1 sm:gap-1.5 pt-2 border-t border-slate-50">
                        <button
                          onClick={() => {
                            setCheckoutProduct(rawProduct);
                            setCheckoutModalOpen(true);
                          }}
                          className="btn-green py-1.5 sm:py-2 px-1 text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl flex items-center justify-center gap-1 shadow-xs truncate"
                        >
                          <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                          <span className="truncate">{t('btn_buy')}</span>
                        </button>
                        <button
                          onClick={() => addToCart(rawProduct)}
                          className="py-1.5 sm:py-2 px-1 text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg sm:rounded-xl transition-colors flex items-center justify-center gap-1 border border-emerald-200/60 truncate"
                        >
                          <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                          <span className="truncate">{t('btn_add_cart')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <CheckoutModal
          isOpen={checkoutModalOpen}
          product={checkoutProduct}
          onClose={() => {
            setCheckoutModalOpen(false);
            setCheckoutProduct(null);
          }}
        />
      )}

    </div>
  );
}
