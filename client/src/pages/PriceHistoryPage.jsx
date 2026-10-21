import React, { useState } from 'react';
import { 
  TrendingDown, TrendingUp, Bell, Sparkles, Check, 
  ShoppingBag, Calendar, Store, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { allProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import CheckoutModal from '../components/CheckoutModal';

export default function PriceHistoryPage() {
  const { showToast } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(allProducts[0]);
  const [timeRange, setTimeRange] = useState('30');
  const [alertSuccess, setAlertSuccess] = useState('');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const handleSetAlert = () => {
    setAlertSuccess(`${selectedProduct.name} uchun narx yanada tushganda Telegram orqali xabar yuboriladi! ✓`);
    showToast(`${selectedProduct.name} narx kuzatuviga olindi! 🔔`);
    setTimeout(() => setAlertSuccess(''), 4000);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 animate-fadeIn min-w-0">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-3xl p-6 md:p-8 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-200" />
            Bozor Narxlari Tahlili
          </div>
          <h1 className="text-2xl md:text-3xl font-black">
            Narxlar dinamikasini kuzatib, eng arzon paytda xarid qiling
          </h1>
          <p className="text-xs md:text-sm text-emerald-100 max-w-xl">
            Sun'iy intellekt oxirgi 30-90 kunlik narxlar o'zgarishini tahlil qiladi va xarid uchun eng qulay vaqtni ko'rsatib beradi.
          </p>
        </div>

        {/* Product selector */}
        <div className="bg-white/15 p-2 rounded-2xl backdrop-blur-md w-full sm:w-auto">
          <select
            value={selectedProduct.id}
            onChange={(e) => {
              const found = allProducts.find(p => p.id === Number(e.target.value));
              if (found) setSelectedProduct(found);
            }}
            className="w-full sm:w-64 px-3 py-2 bg-white text-slate-800 text-xs font-bold rounded-xl outline-none shadow-sm cursor-pointer"
          >
            {allProducts.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.brand})</option>
            ))}
          </select>
        </div>
      </div>

      {alertSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-500/20 animate-fadeIn">
          <Check className="w-4 h-4" />
          <span>{alertSuccess}</span>
        </div>
      )}

      {/* Main Analysis Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
        
        {/* Top Product info + Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-2xl p-2 flex items-center justify-center flex-shrink-0">
              <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">{selectedProduct.brand} • {selectedProduct.category}</div>
              <h2 className="text-xl font-black text-slate-800">{selectedProduct.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-black text-emerald-600">{selectedProduct.price} so'm</span>
                {selectedProduct.oldPrice && (
                  <span className="text-xs text-slate-400 line-through">{selectedProduct.oldPrice}</span>
                )}
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                  {selectedProduct.discount}% chegirma
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setCheckoutModalOpen(true)}
              className="btn-green flex-1 sm:flex-initial px-5 py-2.5 text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" /> Hoziroq sotib olish
            </button>
            <button
              onClick={handleSetAlert}
              className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200/60 transition-colors flex items-center gap-1.5"
            >
              <Bell className="w-4 h-4" /> Narx tushganda xabar ber
            </button>
          </div>
        </div>

        {/* Chart Header & Filters */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-800">Narx o'zgarish grafigi</h3>
            <p className="text-[11px] text-slate-400">Oxirgi haftalardagi minimal va o'rtacha narxlar</p>
          </div>

          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {['30', '60', '90'].map(d => (
              <button
                key={d}
                onClick={() => setTimeRange(d)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
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
        <div className="h-56 w-full relative bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
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
            <rect x="500" y="90" width="95" height="24" rx="6" fill="#0f172a" />
            <text x="547" y="106" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
              {selectedProduct.price}
            </text>
          </svg>

          {/* Dates row */}
          <div className="flex justify-between text-[11px] text-slate-400 font-medium px-4 pt-2">
            <span>1-hafta</span>
            <span>2-hafta</span>
            <span>3-hafta</span>
            <span>4-hafta</span>
            <span className="font-bold text-emerald-600">Bugungi narx (Eng arzon)</span>
          </div>
        </div>

        {/* 3 Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] text-slate-400 font-semibold block">Joriy eng arzon narx</span>
            <span className="text-base font-black text-slate-900 mt-0.5 block">{selectedProduct.price} so'm</span>
            <span className="text-[10px] text-emerald-600 font-bold">✓ Eng maqbul do'kon: {selectedProduct.shop}</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <span className="text-[11px] text-emerald-800 font-semibold block">30 kunlik minimal narx</span>
            <span className="text-base font-black text-emerald-700 mt-0.5 block">{selectedProduct.priceMin} so'm</span>
            <span className="text-[10px] text-emerald-600 font-bold">Pastki chegarada turibdi</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] text-slate-400 font-semibold block">30 kunlik maksimal narx</span>
            <span className="text-base font-black text-slate-700 mt-0.5 block">{selectedProduct.priceMax} so'm</span>
            <span className="text-[10px] text-slate-400 font-medium">Bozor avvalgi eng yuqori narxi</span>
          </div>
        </div>

        {/* AI Recommendation Banner */}
        <div className="p-4 rounded-2xl bg-emerald-500 text-white flex items-center gap-3.5 shadow-md shadow-emerald-500/20">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="text-xs">
            <strong className="block text-sm font-black mb-0.5">
              SmartSavdo AI maslahati: Xarid qilish uchun ayni muddao!
            </strong>
            Ushbu mahsulot narxi oxirgi 30 kun ichida eng past ko'rsatkichga tushgan. Keyingi haftalarda narx ko'tarilishi ehtimoli 85% ni tashkil qiladi.
          </div>
        </div>

      </div>

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <CheckoutModal
          isOpen={checkoutModalOpen}
          product={selectedProduct}
          onClose={() => setCheckoutModalOpen(false)}
        />
      )}

    </div>
  );
}
