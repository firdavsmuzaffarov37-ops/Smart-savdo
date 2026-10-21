import React, { useState, useMemo } from 'react';
import { 
  Calculator, Sparkles, TrendingDown, Check, ArrowRight, 
  ShoppingBag, ShoppingCart, ShieldCheck, DollarSign, Wallet 
} from 'lucide-react';
import { allProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import CheckoutModal from '../components/CheckoutModal';

export default function BudgetAdvisorPage() {
  const { addToCart } = useCart();
  const [budget, setBudget] = useState(12000000);
  const [category, setCategory] = useState('Barchasi');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState(null);

  const budgetPresets = [
    { label: '1 mln so\'m', val: 1000000 },
    { label: '5 mln so\'m', val: 5000000 },
    { label: '10 mln so\'m', val: 10000000 },
    { label: '15 mln so\'m', val: 15000000 },
    { label: '20 mln so\'m', val: 20000000 },
  ];

  const categories = ['Barchasi', 'Smartfonlar', 'Noutbuklar', 'Televizorlar', 'Naushniklar', 'Maishiy texnika', 'Kiyim'];

  // Calculate matching products under budget
  const matchingProducts = useMemo(() => {
    return allProducts
      .filter(p => {
        if (category !== 'Barchasi' && p.category !== category) return false;
        return p.priceNum <= budget;
      })
      .sort((a, b) => b.priceNum - a.priceNum);
  }, [budget, category]);

  const topPick = matchingProducts[0];
  const remainingBudget = topPick ? budget - topPick.priceNum : 0;
  const formattedBudget = Number(budget).toLocaleString('uz-UZ').replace(/,/g, ' ');
  const formattedRemaining = remainingBudget.toLocaleString('uz-UZ').replace(/,/g, ' ');

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 animate-fadeIn min-w-0">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-3xl p-6 md:p-8 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
            <Calculator className="w-3.5 h-3.5 text-emerald-200" />
            AI Byudjet Maslahatchi
          </div>
          <h1 className="text-2xl md:text-3xl font-black">
            Mavjud byudjetingizga eng munosib xaridni tanlang
          </h1>
          <p className="text-xs md:text-sm text-emerald-100 leading-relaxed">
            Qancha mablag'ingiz borligini kiriting. Sun'iy intellekt har bir so'mingizni tejab, eng sifatli qurilma yoki kiyimni tavsiya qiladi.
          </p>

          {/* Budget Input & Presets */}
          <div className="bg-white rounded-2xl p-4 text-slate-800 shadow-xl space-y-3 mt-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1 relative w-full">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-xs">Byudjet:</span>
                <input
                  type="number"
                  step="100000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value) || 0)}
                  className="w-full pl-20 pr-16 py-2.5 text-base font-black border border-slate-200 rounded-xl outline-none focus:border-emerald-500 text-slate-900"
                />
                <span className="absolute right-3 top-3 text-slate-400 text-xs font-bold">so'm</span>
              </div>

              {/* Category Selector */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full sm:w-48 px-3 py-2.5 text-xs font-bold border border-slate-200 rounded-xl outline-none focus:border-emerald-500 bg-white cursor-pointer"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Quick buttons */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 font-medium self-center">Tezkor tanlov:</span>
              {budgetPresets.map(preset => (
                <button
                  key={preset.val}
                  type="button"
                  onClick={() => setBudget(preset.val)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    budget === preset.val
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Budget Verdict Card */}
      {topPick && (
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-500/30">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
                AI Tavsiya etgan eng ideal xarid
              </span>
              <h3 className="text-xl font-black text-slate-800">{topPick.name}</h3>
              <p className="text-xs text-slate-600 mt-1 max-w-lg leading-relaxed">
                {topPick.aiVerdict}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs text-center sm:text-right flex-shrink-0 w-full sm:w-auto">
            <div className="text-[11px] text-slate-400 font-medium">Byudjetdan tejaladigan summa:</div>
            <div className="text-lg font-black text-emerald-600">+{formattedRemaining} so'm</div>
            <button
              onClick={() => {
                setCheckoutProduct(topPick);
                setCheckoutModalOpen(true);
              }}
              className="mt-2 btn-green w-full py-2 px-4 text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Hoziroq sotib olish
            </button>
          </div>
        </div>
      )}

      {/* All matching products grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-800">
            {formattedBudget} so'mgacha bo'lgan barcha variantlar ({matchingProducts.length} ta)
          </h2>
        </div>

        {matchingProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm space-y-3">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Calculator className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">Ushbu byudjetga mos mahsulot topilmadi</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Iltimos, byudjet summasini oshiring yoki boshqa toifani tanlang.
            </p>
            <button
              onClick={() => setBudget(10000000)}
              className="btn-green px-5 py-2 text-xs font-bold rounded-xl"
            >
              Byudjetni 10 mln so'mga o'rnatish
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchingProducts.map((p, idx) => {
              const diff = budget - p.priceNum;
              const formattedDiff = diff.toLocaleString('uz-UZ').replace(/,/g, ' ');
              const isBest = idx === 0;

              return (
                <div
                  key={p.id}
                  className={`app-card app-card-hover bg-white rounded-2xl border p-4 flex flex-col justify-between ${
                    isBest ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl p-1 flex items-center justify-center flex-shrink-0">
                      <img src={p.img} alt={p.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      {isBest && (
                        <span className="inline-block px-2 py-0.5 bg-emerald-500 text-white text-[9px] font-extrabold rounded-full mb-1">
                          1-o'rindagi tanlov
                        </span>
                      )}
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">{p.brand} • {p.category}</div>
                      <h4 className="font-bold text-xs text-slate-800 truncate">{p.name}</h4>
                      <div className="text-sm font-black text-slate-900 mt-1">{p.price} so'm</div>
                      <div className="text-[11px] text-emerald-600 font-bold mt-0.5">
                        Tejamkorlik: +{formattedDiff} so'm
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-50">
                    <button
                      onClick={() => {
                        setCheckoutProduct(p);
                        setCheckoutModalOpen(true);
                      }}
                      className="btn-green py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1 shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Sotib olish
                    </button>
                    <button
                      onClick={() => addToCart(p)}
                      className="py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200/60 transition-colors flex items-center justify-center gap-1"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Savatga
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
