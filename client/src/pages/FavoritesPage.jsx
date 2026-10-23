import React, { useState } from 'react';
import { 
  Heart, ShoppingBag, ShoppingCart, Trash2, ArrowRight, 
  Sparkles, Star, Search 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage, localizeProduct } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import CheckoutModal from '../components/CheckoutModal';

export default function FavoritesPage() {
  const { favorites, toggleFavorite, addToCart } = useCart();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState(null);

  return (
    <div className="p-3 sm:p-5 md:p-8 max-w-6xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn min-w-0">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] sm:text-xs font-bold backdrop-blur-xs">
            <Heart className="w-3.5 h-3.5 text-rose-200 fill-rose-200" />
            {t('nav_favorites')}
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight">
            {t('favorites_title')}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
            {t('favorites_subtitle')}
          </p>
        </div>

        <div className="bg-white/15 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl backdrop-blur-md text-center flex-shrink-0">
          <div className="text-xl sm:text-2xl font-black">{favorites.length}</div>
          <div className="text-[10px] sm:text-[11px] text-emerald-100 font-medium">Saqlangan mahsulot</div>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-100 shadow-sm space-y-3">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">{t('favorites_empty')}</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Bosh sahifa yoki qidiruv bo'limidagi yurakcha belgisini bosib, o'zingizga yoqqan mahsulotlarni saqlang.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-green px-5 py-2.5 text-xs font-bold rounded-xl shadow-sm"
          >
            {t('btn_show_all_products')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
          {favorites.map(rawProduct => {
            const product = localizeProduct(rawProduct, language);
            return (
              <div
                key={product.id}
                className="app-card app-card-hover bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col relative group"
              >
                {/* Remove button */}
                <button
                  onClick={() => toggleFavorite(rawProduct)}
                  className="absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-100 transition-colors shadow-xs"
                  title="Sevimlilardan o'chirish"
                >
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-rose-500" />
                </button>

                {/* Product Image */}
                <div className="h-32 sm:h-44 p-2 sm:p-4 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
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
                      <span className="text-[10px] sm:text-xs text-slate-400 line-through">{product.oldPrice}</span>
                    )}
                  </div>

                  {/* Actions */}
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
