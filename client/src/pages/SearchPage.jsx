import React, { useState, useMemo } from 'react';
import { 
  Search, SlidersHorizontal, ArrowUpDown, Star, Sparkles, 
  ShoppingBag, ShoppingCart, Heart, Check, X, Camera, Store 
} from 'lucide-react';
import { allProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import CheckoutModal from '../components/CheckoutModal';

export default function SearchPage() {
  const { addToCart, toggleFavorite, isFavorite } = useCart();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [selectedShop, setSelectedShop] = useState('Barchasi');
  const [sortBy, setSortBy] = useState('relevance');
  const [maxPrice, setMaxPrice] = useState(20000000);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState(null);

  const categories = ['Barchasi', 'Smartfonlar', 'Noutbuklar', 'Televizorlar', 'Naushniklar', 'Maishiy texnika', 'Kiyim'];
  const shops = ['Barchasi', 'Olcha.uz', 'Uzum Market', 'Texnomart', 'MediaPark', 'iCoolStore', 'TechnoHouse'];

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

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn min-w-0">
      
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-3xl p-6 md:p-8 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            AI Aqlli Qidiruv Tizimi
          </div>
          <h1 className="text-2xl md:text-3xl font-black">
            Barcha do'konlardan eng arzon takliflarni toping
          </h1>
          <p className="text-xs md:text-sm text-emerald-100 leading-relaxed">
            Mahsulot nomi, markasi yoki toifasi bo'yicha qidiring. SmartSavdo AI barcha narxlarni avtomatik tahlil qiladi.
          </p>

          {/* Search bar */}
          <div className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-lg text-slate-800 mt-2">
            <Search className="w-5 h-5 text-slate-400 ml-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Masalan: iPhone 15, Kurtka, Kir yuvish mashinasi, Sony..."
              className="flex-1 px-2 py-1.5 text-sm outline-none text-slate-700 placeholder-slate-400 bg-transparent font-medium"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {}}
              className="btn-green px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              Qidirish
            </button>
          </div>
        </div>
      </div>

      {/* Main Filter & Results Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Filters Sidebar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-6 h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" /> Filtrlash
            </span>
            <button
              onClick={() => {
                setQuery('');
                setSelectedCategory('Barchasi');
                setSelectedShop('Barchasi');
                setMaxPrice(20000000);
                setSortBy('relevance');
              }}
              className="text-[11px] font-semibold text-emerald-600 hover:underline"
            >
              Tozalash
            </button>
          </div>

          {/* Category filter */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">Kategoriya</label>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Shop filter */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">Do'kon</label>
            <div className="space-y-1">
              {shops.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedShop(s)}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
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
              <span className="font-bold text-slate-700">Maksimal narx:</span>
              <span className="font-extrabold text-emerald-600">
                {(maxPrice / 1000000).toFixed(1)} mln so'm
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
              <span>20 mln so'm</span>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Top Sort & Count Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs">
            <span className="text-xs font-bold text-slate-700">
              Topilgan mahsulotlar: <strong className="text-emerald-600 font-extrabold">{filteredProducts.length}</strong> ta
            </span>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Saralash:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 bg-white font-semibold text-slate-700 cursor-pointer"
              >
                <option value="relevance">Ommabopligi bo'yicha</option>
                <option value="price-asc">Avval arzonlari</option>
                <option value="price-desc">Avval qimmatlari</option>
                <option value="rating">Reytingi bo'yicha</option>
                <option value="discount">Katta chegirma</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm space-y-3">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">Mahsulot topilmadi</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Qidiruv so'zini o'zgartirib ko'ring yoki filtrlarni tozalang.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('Barchasi');
                  setSelectedShop('Barchasi');
                  setMaxPrice(20000000);
                }}
                className="btn-green px-4 py-2 text-xs font-bold rounded-xl"
              >
                Filtrlarni tozalash
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map(product => {
                const fav = isFavorite(product.id);
                return (
                  <div
                    key={product.id}
                    className="app-card app-card-hover bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col relative group"
                  >
                    {/* Favorite Heart Button */}
                    <button
                      onClick={() => toggleFavorite(product)}
                      className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        fav
                          ? 'bg-rose-50 text-rose-500'
                          : 'bg-white/80 backdrop-blur-xs text-slate-400 hover:text-rose-500 shadow-sm'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${fav ? 'fill-rose-500' : ''}`} />
                    </button>

                    {/* AI Badge */}
                    {product.isAI && (
                      <div className="absolute top-2.5 left-2.5 z-10 bg-emerald-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                        AI Tavsiya
                      </div>
                    )}

                    {/* Image */}
                    <div className="h-44 p-4 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
                        {product.brand} • {product.category}
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm truncate mt-0.5">{product.name}</h4>

                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1 mb-2">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-700">{product.rating}</span>
                        <span>•</span>
                        <span className="text-emerald-600 font-semibold">{product.shop}</span>
                      </div>

                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-base font-black text-slate-900">{product.price} so'm</span>
                        {product.oldPrice && (
                          <span className="text-xs text-slate-400 line-through">{product.oldPrice}</span>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="mt-auto grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-50">
                        <button
                          onClick={() => {
                            setCheckoutProduct(product);
                            setCheckoutModalOpen(true);
                          }}
                          className="btn-green py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1 shadow-sm"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Sotib olish
                        </button>
                        <button
                          onClick={() => addToCart(product)}
                          className="py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors flex items-center justify-center gap-1 border border-emerald-200/60"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" /> Savatga
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
