import React, { useState } from 'react';
import { 
  TrendingDown, TrendingUp, Bell, Sparkles, Check, 
  ShoppingBag, Calendar, Store, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { allProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useLanguage, localizeProduct } from '../context/LanguageContext';
import CheckoutModal from '../components/CheckoutModal';

export default function PriceHistoryPage() {
  const { showToast } = useCart();
  const { language, t } = useLanguage();
  const [selectedProductId, setSelectedProductId] = useState(allProducts[0].id);
  const [timeRange, setTimeRange] = useState('30');
  const [alertSuccess, setAlertSuccess] = useState('');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const rawProduct = allProducts.find(p => p.id === selectedProductId) || allProducts[0];
  const selectedProduct = localizeProduct(rawProduct, language);

  const handleSetAlert = () => {
    setAlertSuccess(`${selectedProduct.name} uchun narx yanada tushganda Telegram orqali xabar yuboriladi! ✓`);
    showToast(`${selectedProduct.name} narx kuzatuviga olindi! 🔔`);
    setTimeout(() => setAlertSuccess(''), 4000);
  };

  return (
    <div className="p-3 sm:p-5 md:p-8 max-w-6xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn min-w-0">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] sm:text-xs font-bold backdrop-blur-xs">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-200" />
            Bozor Narxlari Tahlili
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight">
            {t('price_history_title')}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
            {t('price_history_subtitle')}
          </p>
        </div>

        {/* Product selector */}
        <div className="bg-white/15 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl backdrop-blur-md w-full md:w-auto">
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(Number(e.target.value))}
            className="w-full md:w-64 px-3 py-2 bg-white text-slate-800 text-xs font-bold rounded-lg sm:rounded-xl outline-none shadow-sm cursor-pointer"
          >
            {allProducts.map(p => {
              const loc = localizeProduct(p, language);
              return (
                <option key={p.id} value={p.id}>{loc.name} ({p.brand})</option>
              );
            })}
          </select>
        </div>
      </div>

      {alertSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-500/20 animate-fadeIn">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>{alertSuccess}</span>
        </div>
      )}

      {/* Main Analysis Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-100 shadow-sm space-y-4 sm:space-y-6">
        
        {/* Top Product info + Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 border border-slate-100 rounded-2xl p-2 flex items-center justify-center flex-shrink-0">
              <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-semibold uppercase truncate">
                {selectedProduct.brand} • {selectedProduct.category}
              </div>
              <h2 className="text-base sm:text-xl font-black text-slate-800 truncate">{selectedProduct.name}</h2>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1">
                <span className="text-sm sm:text-lg font-black text-emerald-600">
                  {selectedProduct.price} {t('currency_symbol')}
                </span>
                {selectedProduct.oldPrice && (
                  <span className="text-xs text-slate-400 line-through">{selectedProduct.oldPrice}</span>
                )}
                <span className="text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                  {selectedProduct.discount}% {t('param_discount')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setCheckoutModalOpen(true)}
              className="btn-green flex-1 sm:flex-initial px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 truncate"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">{t('btn_buy')}</span>
            </button>
            <button
              onClick={handleSetAlert}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200/60 transition-colors flex items-center justify-center gap-1.5 truncate"
            >
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Narx tushganda xabar ber</span>
              <span className="sm:hidden">Kuzatish</span>
            </button>
          </div>
        </div>

        {/* Chart Header & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-800">Narx o'zgarish grafigi</h3>
            <p className="text-[10px] sm:text-[11px] text-slate-400">Oxirgi haftalardagi minimal va o'rtacha narxlar</p>
          </div>

          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            {['30', '60', '90'].map(d => (
              <button
                key={d}
                onClick={() => setTimeRange(d)}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  timeRange === d
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {d} kun
              </button>
            ))}
          </div>
        </div>

        {/* Visual Trend Chart */}
        <div className="h-44 sm:h-56 w-full relative bg-slate-50/50 rounded-2xl p-3 sm:p-4 border border-slate-100 flex flex-col justify-between">
          <svg viewBox="0 0 600 160" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="30" x2="600" y2="30" stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" />
            <line x1="0" y1="75" x2="600" y2="75" stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" />
            <line x1="0" y1="120" x2="600" y2="120" stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" />

            {/* Area Fill */}
            <path
              d="M 20 40 L 150 65 L 300 45 L 450 90 L 580 125 L 580 150 L 20 150 Z"
              fill="url(#priceGradient)"
            />

            {/* Line */}
            <path
              d="M 20 40 L 150 65 L 300 45 L 450 90 L 580 125"
              fill="none"
              stroke="#10b981"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Data points */}
            <circle cx="20" cy="40" r="4" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            <circle cx="150" cy="65" r="4" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            <circle cx="300" cy="45" r="4" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            <circle cx="450" cy="90" r="4" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            <circle cx="580" cy="125" r="5" fill="#059669" stroke="#ffffff" strokeWidth="2" />

            {/* Current Best Price Tooltip */}
            <rect x="490" y="85" width="105" height="26" rx="6" fill="#0f172a" />
            <text x="542" y="102" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
              {selectedProduct.price} {t('currency_symbol')}
            </text>
          </svg>

          {/* Dates row */}
          <div className="flex justify-between text-[9px] sm:text-[11px] text-slate-400 font-medium px-2 sm:px-4 pt-1 sm:pt-2 border-t border-slate-100">
            <span>1-hafta</span>
            <span>2-hafta</span>
            <span>3-hafta</span>
            <span>4-hafta</span>
            <span className="font-bold text-emerald-600">Bugun (Eng arzon)</span>
          </div>
        </div>

        {/* 3 Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-semibold block">Joriy eng arzon narx</span>
            <span className="text-sm sm:text-base font-black text-slate-900 mt-0.5 block">
              {selectedProduct.price} {t('currency_symbol')}
            </span>
            <span className="text-[10px] text-emerald-600 font-bold block truncate">
              ✓ Eng maqbul: {selectedProduct.shop}
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <span className="text-[10px] sm:text-[11px] text-emerald-800 font-semibold block">30 kunlik minimal narx</span>
            <span className="text-sm sm:text-base font-black text-emerald-700 mt-0.5 block">
              {selectedProduct.priceMin} {t('currency_symbol')}
            </span>
            <span className="text-[10px] text-emerald-600 font-bold block">Pastki chegarada turibdi</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-semibold block">30 kunlik maksimal narx</span>
            <span className="text-sm sm:text-base font-black text-slate-700 mt-0.5 block">
              {selectedProduct.priceMax} {t('currency_symbol')}
            </span>
            <span className="text-[10px] text-slate-400 font-medium block">Bozor avvalgi eng yuqori narxi</span>
          </div>
        </div>

        {/* AI Recommendation Banner */}
        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-500 text-white flex items-start sm:items-center gap-3 sm:gap-3.5 shadow-md shadow-emerald-500/20">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="text-xs">
            <strong className="block text-xs sm:text-sm font-black mb-0.5">
              SmartSavdo AI maslahati: Xarid qilish uchun ayni muddao!
            </strong>
            <p className="text-[11px] sm:text-xs text-emerald-50 leading-relaxed">
              Ushbu mahsulot narxi oxirgi 30 kun ichida eng past ko'rsatkichga tushgan. Keyingi haftalarda narx ko'tarilishi ehtimoli 85% ni tashkil qiladi.
            </p>
          </div>
        </div>

      </div>

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <CheckoutModal
          isOpen={checkoutModalOpen}
          product={rawProduct}
          onClose={() => setCheckoutModalOpen(false)}
        />
      )}

    </div>
  );
}
