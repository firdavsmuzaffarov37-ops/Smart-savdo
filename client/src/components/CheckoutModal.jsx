import React, { useState } from 'react';
import { 
  X, Check, ShoppingBag, Truck, ShieldCheck, CreditCard, 
  Sparkles, Store, Phone, User, MapPin, ArrowRight, Clock,
  Smartphone, Wallet
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const REGIONS = [
  'Toshkent shahri',
  'Toshkent viloyati',
  'Samarqand viloyati',
  'Farg\'ona viloyati',
  'Andijon viloyati',
  'Namangan viloyati',
  'Buxoro viloyati',
  'Xorazm viloyati',
  'Qashqadaryo viloyati',
  'Surxondaryo viloyati',
  'Navoiy viloyati',
  'Jizzax viloyati',
  'Sirdaryo viloyati',
  'Qoraqalpog\'iston Respublikasi'
];

export default function CheckoutModal({ product, initialShop, isOpen, onClose }) {
  const { user } = useAuth();
  const { addOrder, showToast } = useCart();

  const [selectedShop, setSelectedShop] = useState(() => {
    if (initialShop) return initialShop;
    if (product?.shops && product.shops.length > 0) {
      const best = product.shops.find(s => s.isBest) || product.shops[0];
      return best;
    }
    return { name: product?.shop || 'SmartSavdo Hamkor do\'koni', price: product?.price || '' };
  });

  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || '',
    phone: user?.user_metadata?.phone || '+998 ',
    region: 'Toshkent shahri',
    address: '',
    comment: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('payme');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  if (!isOpen || !product) return null;

  const priceNum = product.priceNum || parseInt(String(selectedShop.price || product.price).replace(/\D/g, ''), 10) || 0;
  const totalPrice = priceNum * quantity;
  const formattedTotal = totalPrice.toLocaleString('uz-UZ').replace(/,/g, ' ');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Iltimos, ismingizni kiriting!");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      alert("Iltimos, telefon raqamingizni to'liq kiriting!");
      return;
    }
    if (!formData.address.trim()) {
      alert("Iltimos, yetkazib berish manzilini kiriting!");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `SS-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder = {
        id: orderNumber,
        product: {
          id: product.id,
          name: product.name,
          img: product.img,
          brand: product.brand
        },
        shop: selectedShop.name,
        price: selectedShop.price || product.price,
        quantity: quantity,
        total: formattedTotal,
        customer: formData,
        paymentMethod: paymentMethod,
        date: new Date().toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' }),
        status: 'Qabul qilindi'
      };

      addOrder(newOrder);
      setIsSubmitting(false);
      setOrderSuccess(newOrder);
      showToast(`Buyurtma #${orderNumber} muvaffaqiyatli rasmiylashtirildi! ✓`);
    }, 1200);
  };

  const handleClose = () => {
    setOrderSuccess(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl relative max-h-[92vh] flex flex-col overflow-hidden my-auto">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight">
                {orderSuccess ? 'Buyurtma tasdiqlandi!' : 'Mahsulotni sotib olish'}
              </h2>
              <p className="text-[11px] text-emerald-100">
                {orderSuccess ? 'Xaridingiz uchun rahmat' : 'Rasmiy kafolat va tezkor yetkazib berish'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {orderSuccess ? (
            /* SUCCESS VIEW */
            <div className="text-center py-6 space-y-5 animate-fadeIn">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-lg shadow-emerald-500/20">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 font-extrabold text-xs rounded-full border border-emerald-200 mb-2">
                  Buyurtma #{orderSuccess.id}
                </span>
                <h3 className="text-2xl font-black text-slate-800">
                  Buyurtmangiz muvaffaqiyatli qabul qilindi!
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
                  SmartSavdo tizimi orqali eng qulay narxda buyurtma berdingiz. Operatorimiz 15 daqiqa ichida <span className="font-semibold text-slate-700">{orderSuccess.customer.phone}</span> raqamingizga qo'ng'iroq qilib, buyurtmani tasdiqlaydi.
                </p>
              </div>

              {/* Order Summary Box */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200/60">
                  <div className="w-14 h-14 bg-white rounded-xl border border-slate-200 p-1 flex items-center justify-center flex-shrink-0">
                    <img src={orderSuccess.product.img} alt={orderSuccess.product.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-800 text-sm truncate">{orderSuccess.product.name}</div>
                    <div className="text-xs text-slate-500">{orderSuccess.shop} • {orderSuccess.quantity} dona</div>
                    <div className="text-xs font-extrabold text-emerald-600">{orderSuccess.total} so'm</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">Qabul qiluvchi:</span>
                    <span className="font-semibold text-slate-700">{orderSuccess.customer.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Yetkazib berish:</span>
                    <span className="font-semibold text-slate-700">{orderSuccess.customer.region}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">To'lov usuli:</span>
                    <span className="font-semibold text-slate-700 capitalize">{orderSuccess.paymentMethod}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Kutilayotgan muddat:</span>
                    <span className="font-semibold text-emerald-600">Bugun / 24 soat</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="btn-green w-full py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  Xaridni yakunlash (Bosh sahifaga qaytish)
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM VIEW */
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              
              {/* Product preview card */}
              <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3.5 flex items-center gap-3.5">
                <div className="w-16 h-16 bg-white rounded-xl border border-emerald-100 p-1 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <img src={product.img} alt={product.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">{product.brand}</div>
                  <h4 className="text-sm font-bold text-slate-800 truncate">{product.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-black text-emerald-600">
                      {selectedShop.price || product.price} so'm
                    </span>
                    {product.oldPrice && (
                      <span className="text-[11px] text-slate-400 line-through">
                        {product.oldPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-xs text-slate-800">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Shop selection if multiple shops exist */}
              {product.shops && product.shops.length > 0 && (
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Store className="w-4 h-4 text-emerald-600" />
                      Qaysi do'kondan xarid qilasiz?
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                      AI narx taqqoslash
                    </span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.shops.map((shop, idx) => {
                      const isSelected = selectedShop.name === shop.name;
                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedShop(shop)}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-slate-800 flex items-center gap-1">
                              {shop.name}
                              {shop.isBest && (
                                <span className="bg-emerald-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                                  Eng arzon
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400">{shop.delivery} yetkazish</div>
                          </div>
                          <div className="text-right">
                            <div className="font-extrabold text-slate-900">{shop.price}</div>
                            <div className="text-[10px] text-emerald-600 font-medium">Kafolat bor</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Customer info form */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-emerald-600" />
                  Buyurtmachi ma'lumotlari
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Ism va familiya *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Masalan: Sardor Aliyev"
                        required
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Telefon raqamingiz *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+998 90 123 45 67"
                        required
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Viloyat / Shahar *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                      <select
                        name="region"
                        value={formData.region}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white transition-all appearance-none cursor-pointer"
                      >
                        {REGIONS.map(reg => (
                          <option key={reg} value={reg}>{reg}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      To'liq manzil (Ko'cha, xonadon) *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Masalan: Chilonzor 19-mavze, 12-uy, 45-xonadon"
                      required
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Payment methods */}
              <div>
                <label className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  To'lov usulini tanlang
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'payme', label: 'Payme', icon: Smartphone, badge: 'Tezkor' },
                    { id: 'click', label: 'Click', icon: CreditCard, badge: 'Onlayn' },
                    { id: 'cash', label: 'Qabulda naqd', icon: Wallet, badge: 'Eshikda' },
                    { id: 'nasiya', label: 'Uzum Nasiya', icon: Sparkles, badge: '0% muddatli' },
                  ].map(method => {
                    const isSelected = paymentMethod === method.id;
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-600' : 'text-slate-500'}`} />
                        <span className="text-[11px] font-bold text-slate-800">{method.label}</span>
                        <span className="text-[9px] text-slate-400 font-medium">{method.badge}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Delivery info & guarantees */}
              <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between text-[11px] text-slate-600 border border-slate-200/70">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Yetkazib berish: <strong className="text-emerald-700">Bepul (1 kun)</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Rasmiy kafolat</span>
                </div>
              </div>

              {/* Price total calculation */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400">Jami to'lov miqdori:</div>
                  <div className="text-xl font-black text-emerald-600">
                    {formattedTotal} so'm
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-green px-6 py-3 text-sm font-bold flex items-center gap-2 rounded-xl shadow-lg shadow-emerald-500/25 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-emerald-500/40 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Buyurtma qilinmoqda...
                    </>
                  ) : (
                    <>
                      Sotib olishni tasdiqlash
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
