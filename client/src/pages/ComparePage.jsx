import React, { useState } from 'react';
import { 
  BarChart2, X, Plus, Sparkles, Check, ShoppingBag, 
  ShoppingCart, ArrowRight, ShieldCheck, Star 
} from 'lucide-react';
import { allProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import CheckoutModal from '../components/CheckoutModal';

export default function ComparePage() {
  const { compareList, addToCompare, removeFromCompare, addToCart } = useCart();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [selectedToAdd, setSelectedToAdd] = useState('');

  const handleAddProduct = (e) => {
    const id = Number(e.target.value);
    if (!id) return;
    const found = allProducts.find(p => p.id === id);
    if (found) {
      addToCompare(found);
    }
    setSelectedToAdd('');
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn min-w-0">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-3xl p-6 md:p-8 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
            <BarChart2 className="w-3.5 h-3.5 text-emerald-200" />
            AI Taqqoslash Markazi
          </div>
          <h1 className="text-2xl md:text-3xl font-black">
            Mahsulotlarni parametrlar bo'yicha taqqoslang
          </h1>
          <p className="text-xs md:text-sm text-emerald-100 max-w-xl">
            Narxlar, xususiyatlar, sun'iy intellekt ballari va do'konlar takliflarini yonma-yon solishtiring.
          </p>
        </div>

        {/* Add product dropdown */}
        <div className="flex items-center gap-2 bg-white/15 p-2 rounded-2xl backdrop-blur-md">
          <select
            value={selectedToAdd}
            onChange={handleAddProduct}
            className="px-3 py-2 bg-white text-slate-800 text-xs font-bold rounded-xl outline-none shadow-sm cursor-pointer"
          >
            <option value="">+ Mahsulot qo'shish...</option>
            {allProducts
              .filter(p => !compareList.some(c => c.id === p.id))
              .map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.price} so'm)</option>
              ))}
          </select>
        </div>
      </div>

      {compareList.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm space-y-3">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <BarChart2 className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">Taqqoslash uchun mahsulot tanlanmagan</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Yuqoridagi ro'yxatdan yoki mahsulot kartasidan "Taqqoslash" tugmasini bosing.
          </p>
          <button
            onClick={() => {
              addToCompare(allProducts[0]);
              addToCompare(allProducts[1]);
            }}
            className="btn-green px-5 py-2.5 text-xs font-bold rounded-xl shadow-sm"
          >
            Namuna sifatida iPhone va Samsung ni taqqoslash
          </button>
        </div>
      ) : (
        /* Comparison Table / Grid */
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            {/* Header row: Product images & titles */}
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="p-4 w-48 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Parametrlar ({compareList.length} ta)
                </th>
                {compareList.map(p => (
                  <th key={p.id} className="p-4 min-w-[220px] align-top">
                    <div className="relative bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col items-center text-center">
                      <button
                        onClick={() => removeFromCompare(p.id)}
                        className="absolute top-2 right-2 p-1 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-slate-50 transition-colors"
                        title="Olib tashlash"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="w-24 h-24 p-2 bg-slate-50 rounded-xl mb-2 flex items-center justify-center">
                        <img src={p.img} alt={p.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">{p.brand}</div>
                      <h4 className="font-bold text-slate-800 text-xs truncate max-w-full">{p.name}</h4>
                      <div className="text-sm font-black text-emerald-600 mt-1">{p.price} so'm</div>

                      <div className="grid grid-cols-2 gap-1.5 w-full mt-3">
                        <button
                          onClick={() => {
                            setCheckoutProduct(p);
                            setCheckoutModalOpen(true);
                          }}
                          className="btn-green py-1.5 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" /> Sotib olish
                        </button>
                        <button
                          onClick={() => addToCart(p)}
                          className="py-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200/60 transition-colors flex items-center justify-center gap-1"
                        >
                          <ShoppingCart className="w-3 h-3" /> Savatga
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Spec rows */}
            <tbody className="divide-y divide-slate-100 text-xs">
              
              {/* Do'kon va Yetkazib berish */}
              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/30">Do'kon va narx</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-4">
                    <span className="font-bold text-slate-800">{p.shop}</span>
                    <span className="block text-[11px] text-emerald-600 font-medium">Yetkazib berish: Bepul</span>
                  </td>
                ))}
              </tr>

              {/* AI Reytingi */}
              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/30">Sun'iy Intellekt bahosi</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-emerald-600">{p.overallScore || '9.2'}</span>
                      <span className="text-[10px] text-slate-400">/ 10 ball</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Protsessor va Tezlik */}
              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/30">Tezlik va Unumdorlik</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-4">
                    <div className="font-bold text-slate-800">{p.scores?.performance || 9.0} / 10</div>
                    <div className="h-1.5 rounded-full bg-slate-100 mt-1 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(p.scores?.performance || 9.0) * 10}%` }} />
                    </div>
                  </td>
                ))}
              </tr>

              {/* Batareya quvvati */}
              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/30">Batareya quvvati</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-4">
                    <div className="font-bold text-slate-800">{p.scores?.battery || 8.5} / 10</div>
                    <div className="h-1.5 rounded-full bg-slate-100 mt-1 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(p.scores?.battery || 8.5) * 10}%` }} />
                    </div>
                  </td>
                ))}
              </tr>

              {/* Ekran sifati */}
              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/30">Ekran va Dizayn</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-4">
                    <div className="font-bold text-slate-800">{p.scores?.display || 9.2} / 10</div>
                    <div className="h-1.5 rounded-full bg-slate-100 mt-1 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(p.scores?.display || 9.2) * 10}%` }} />
                    </div>
                  </td>
                ))}
              </tr>

              {/* Afzalliklari */}
              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/30 align-top">Asosiy afzalliklari</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-4 align-top">
                    <ul className="space-y-1 text-[11px] text-slate-600">
                      {p.pros?.slice(0, 3).map((pro, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* AI Xulosasi */}
              <tr className="bg-emerald-50/30">
                <td className="p-4 font-bold text-emerald-950 align-top">AI Tavsiyasi</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-4 align-top text-[11px] text-emerald-900 leading-relaxed font-medium">
                    {p.aiVerdict}
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      )}

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
