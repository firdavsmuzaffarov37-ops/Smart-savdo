import React, { useState } from 'react';
import { 
  Heart, ShoppingBag, ShoppingCart, Trash2, ArrowRight, 
  Sparkles, Star, Search 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import CheckoutModal from '../components/CheckoutModal';

export default function FavoritesPage() {
  const { favorites, toggleFavorite, addToCart } = useCart();
  const navigate = useNavigate();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState(null);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 animate-fadeIn min-w-0">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-3xl p-6 md:p-8 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
            <Heart className="w-3.5 h-3.5 text-rose-200 fill-rose-200" />
            Mening Sevimlilarim
          </div>
          <h1 className="text-2xl md:text-3xl font-black">
            Sizga yoqqan va saqlangan mahsulotlar
          </h1>
          <p className="text-xs md:text-sm text-emerald-100 max-w-xl">
            O'zingizga ma'qul kelgan takliflarni saqlang, narxlar o'zgarishini kuzating va bir klikda xarid qiling.
          </p>
        </div>

        <div className="bg-white/15 px-5 py-3 rounded-2xl backdrop-blur-md text-center flex-shrink-0">
          <div className="text-2xl font-black">{favorites.length} ta</div>
          <div className="text-[11px] text-emerald-100 font-medium">Saqlangan mahsulot</div>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm space-y-3">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">Sevimlilar ro'yxati bo'sh</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Bosh sahifa yoki qidiruv bo'limidagi yurakcha belgisini bosib, o'zingizga yoqqan mahsulotlarni saqlang.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-green px-5 py-2.5 text-xs font-bold rounded-xl shadow-sm"
          >
            Mahsulotlarni ko'rish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map(product => (
            <div
              key={product.id}
              className="app-card app-card-hover bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col relative group"
            >
              {/* Remove button */}
              <button
                onClick={() => toggleFavorite(product)}
                className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-100 transition-colors shadow-xs"
                title="Sevimlilardan o'chirish"
              >
                <Heart className="w-4 h-4 fill-rose-500" />
              </button>

              {/* Product Image */}
              <div className="h-44 p-4 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
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

                {/* Actions */}
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
          ))}
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
