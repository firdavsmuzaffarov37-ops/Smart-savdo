import React, { useState, useMemo } from 'react';
import { 
  Calculator, Sparkles, TrendingDown, Check, ArrowRight, 
  ShoppingBag, ShoppingCart, ShieldCheck, DollarSign, Wallet 
} from 'lucide-react';
import { allProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useLanguage, localizeProduct } from '../context/LanguageContext';
import CheckoutModal from '../components/CheckoutModal';

export default function BudgetAdvisorPage() {
  const { addToCart } = useCart();
  const { language, t } = useLanguage();
  const [budget, setBudget] = useState(12000000);
  const [category, setCategory] = useState('Barchasi');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState(null);

  const budgetPresets = [
    { label: `1 mln ${t('currency_symbol')}`, val: 1000000 },
    { label: `5 mln ${t('currency_symbol')}`, val: 5000000 },
    { label: `10 mln ${t('currency_symbol')}`, val: 10000000 },
    { label: `15 mln ${t('currency_symbol')}`, val: 15000000 },
    { label: `20 mln ${t('currency_symbol')}`, val: 20000000 },
  ];

  const categories = [
    { key: 'Barchasi', label: t('cat_all') },
    { key: 'Smartfonlar', label: t('cat_smartphones') },
    { key: 'Noutbuklar', label: t('cat_laptops') },
    { key: 'Televizorlar', label: t('cat_tvs') },
    { key: 'Naushniklar', label: t('cat_headphones') },
    { key: 'Maishiy texnika', label: t('cat_appliances') },
    { key: 'Kiyim', label: t('cat_clothing') }
  ];

  // Calculate matching products under budget
  const matchingProducts = useMemo(() => {
    return allProducts
      .filter(p => {
        if (category !== 'Barchasi' && p.category !== category) return false;
        return p.priceNum <= budget;
      })
      .sort((a, b) => b.priceNum - a.priceNum);
  }, [budget, category]);

  const rawTopPick = matchingProducts[0];
  const topPick = rawTopPick ? localizeProduct(rawTopPick, language) : null;
  const remainingBudget = rawTopPick ? budget - rawTopPick.priceNum : 0;
  const formattedBudget = Number(budget).toLocaleString('uz-UZ').replace(/,/g, ' ');
  const formattedRemaining = remainingBudget.toLocaleString('uz-UZ').replace(/,/g, ' ');

  return (
    <div className="p-3 sm:p-5 md:p-8 max-w-6xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn min-w-0">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden">
        <div className="max-w-2xl space-y-2.5 sm:space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] sm:text-xs font-bold backdrop-blur-xs">
            <Calculator className="w-3.5 h-3.5 text-emerald-200" />
            AI Byudjet Maslahatchi
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight">
            {t('budget_title')}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            {t('budget_subtitle')}
          </p>

          {/* Budget Input & Presets */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 text-slate-800 shadow-xl space-y-3 mt-3">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <div className="flex-1 relative w-full">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-xs">Byudjet:</span>
                <input
                  type="number"
                  step="100000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value) || 0)}
                  className="w-full pl-20 pr-14 py-2 sm:py-2.5 text-sm sm:text-base font-black border border-slate-200 rounded-xl outline-none focus:border-emerald-500 text-slate-900"
                />
                <span className="absolute right-3 top-2.5 sm:top-3 text-slate-400 text-xs font-bold">
                  {t('currency_symbol')}
                </span>
              </div>

              {/* Category Selector */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full sm:w-48 px-3 py-2 sm:py-2.5 text-xs font-bold border border-slate-200 rounded-xl outline-none focus:border-emerald-500 bg-white cursor-pointer"
              >
                {categories.map(c => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Quick buttons */}
            <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100 overflow-x-auto scrollbar-none pb-0.5">
              <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap mr-1">Tezkor:</span>
              {budgetPresets.map(preset => (
                <button
                  key={preset.val}
                  type="button"
                  onClick={() => setBudget(preset.val)}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-colors whitespace-nowrap flex-shrink-0 ${
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
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 w-full md:w-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-500/30">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 block">
                {t('card_ai_badge')} — Eng ideal xarid
              </span>
              <h3 className="text-base sm:text-xl font-black text-slate-800 truncate">{topPick.name}</h3>
              <p className="text-xs text-slate-600 mt-0.5 sm:mt-1 max-w-lg leading-relaxed line-clamp-2 sm:line-clamp-none">
                {topPick.aiVerdict}
              </p>
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-emerald-100 shadow-xs text-center sm:text-right flex-shrink-0 w-full sm:w-auto">
            <div className="text-[11px] text-slate-400 font-medium">Byudjetdan tejaladigan summa:</div>
            <div className="text-base sm:text-lg font-black text-emerald-600">
              +{formattedRemaining} {t('currency_symbol')}
            </div>
            <button
              onClick={() => {
                setCheckoutProduct(rawTopPick);
                setCheckoutModalOpen(true);
              }}
              className="mt-2 btn-green w-full py-2 px-4 text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> {t('btn_buy')}
            </button>
          </div>
        </div>
      )}

      {/* All matching products grid */}
      <div>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-xs sm:text-base font-bold text-slate-800">
            {formattedBudget} {t('currency_symbol')}gacha bo'lgan variantlar ({matchingProducts.length})
          </h2>
        </div>

        {matchingProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-100 shadow-sm space-y-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Calculator className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">{t('filter_not_found')}</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {t('filter_not_found_desc')}
            </p>
            <button
              onClick={() => setBudget(10000000)}
              className="btn-green px-5 py-2 text-xs font-bold rounded-xl"
            >
              Byudjetni 10 mln {t('currency_symbol')}ga o'rnatish
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {matchingProducts.map((rawP, idx) => {
              const p = localizeProduct(rawP, language);
              const diff = budget - rawP.priceNum;
              const formattedDiff = diff.toLocaleString('uz-UZ').replace(/,/g, ' ');
              const isBest = idx === 0;

              return (
                <div
                  key={p.id}
                  className={`app-card app-card-hover bg-white rounded-2xl border p-3.5 sm:p-4 flex flex-col justify-between ${
                    isBest ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-18 h-18 sm:w-20 sm:h-20 bg-slate-50 border border-slate-100 rounded-xl p-1 flex items-center justify-center flex-shrink-0">
                      <img src={p.img} alt={p.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      {isBest && (
                        <span className="inline-block px-2 py-0.5 bg-emerald-500 text-white text-[9px] font-extrabold rounded-full mb-1">
                          1-o'rindagi tanlov
                        </span>
                      )}
                      <div className="text-[10px] text-slate-400 uppercase font-semibold truncate">{p.brand} • {p.category}</div>
                      <h4 className="font-bold text-xs text-slate-800 truncate">{p.name}</h4>
                      <div className="text-sm font-black text-slate-900 mt-1">{p.price} {t('currency_symbol')}</div>
                      <div className="text-[11px] text-emerald-600 font-bold mt-0.5 truncate">
                        Tejamkorlik: +{formattedDiff} {t('currency_symbol')}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-50">
                    <button
                      onClick={() => {
                        setCheckoutProduct(rawP);
                        setCheckoutModalOpen(true);
                      }}
                      className="btn-green py-1.5 sm:py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1 shadow-xs truncate"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{t('btn_buy')}</span>
                    </button>
                    <button
                      onClick={() => addToCart(rawP)}
                      className="py-1.5 sm:py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200/60 transition-colors flex items-center justify-center gap-1 truncate"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{t('btn_add_cart')}</span>
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
