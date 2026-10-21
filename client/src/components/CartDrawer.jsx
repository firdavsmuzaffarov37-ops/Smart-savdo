import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ onCheckoutProduct }) {
  const { 
    cartItems, 
    cartDrawerOpen, 
    setCartDrawerOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useCart();

  if (!cartDrawerOpen) return null;

  const totalSum = cartItems.reduce((acc, item) => {
    const rawPrice = parseInt(String(item.price).replace(/\D/g, ''), 10) || 0;
    return acc + rawPrice * item.quantity;
  }, 0);

  const formattedTotal = totalSum.toLocaleString('uz-UZ').replace(/,/g, ' ');

  const handleStartCheckout = (item) => {
    setCartDrawerOpen(false);
    if (onCheckoutProduct) {
      onCheckoutProduct(item, { name: item.shop, price: item.price });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-slate-800 text-base">Xarid Savati</h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {cartItems.length} ta mahsulot
              </span>
            </div>
            <button
              onClick={() => setCartDrawerOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="text-base font-bold text-slate-700">Savatingiz hozircha bo'sh</div>
                <p className="text-xs text-slate-400 max-w-xs mt-1">
                  Mahsulotlarni ko'rib chiqing va "Sotib olish" yoki "Savatga qo'shish" tugmasini bosing!
                </p>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="mt-4 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors"
                >
                  Xarid qilishni boshlash
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div 
                  key={`${item.id}-${item.shop}-${idx}`}
                  className="p-3 bg-white border border-slate-100 rounded-2xl shadow-xs flex items-center gap-3 hover:border-slate-200 transition-colors"
                >
                  <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 p-1 flex items-center justify-center flex-shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{item.brand}</div>
                    <div className="text-xs font-bold text-slate-800 truncate">{item.name}</div>
                    <div className="text-[11px] text-emerald-600 font-semibold">{item.shop}</div>
                    <div className="text-xs font-black text-slate-900 mt-1">{item.price} so'm</div>
                  </div>

                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <button
                      onClick={() => removeFromCart(item.id, item.shop)}
                      className="text-slate-300 hover:text-rose-500 p-1 transition-colors"
                      title="Olib tashlash"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.shop, -1)}
                        className="w-5 h-5 flex items-center justify-center text-slate-600 hover:bg-white rounded text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-slate-800">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.shop, 1)}
                        className="w-5 h-5 flex items-center justify-center text-slate-600 hover:bg-white rounded text-xs font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleStartCheckout(item)}
                      className="text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-lg transition-colors flex items-center gap-1"
                    >
                      Sotib olish →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Yetkazib berish:</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> Bepul
                </span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-slate-800">
                <span>Jami to'lov:</span>
                <span className="text-lg font-black text-emerald-600">{formattedTotal} so'm</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={clearCart}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Savatni tozalash
                </button>
                <button
                  onClick={() => handleStartCheckout(cartItems[0])}
                  className="btn-green py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
                >
                  Hammasini rasmiylashtirish
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
