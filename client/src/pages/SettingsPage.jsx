import React, { useState } from 'react';
import { 
  User, Bell, Shield, MapPin, Globe, CreditCard, 
  Package, Check, Save, Sparkles, Moon, Smartphone, 
  Mail, Phone, Lock, Eye, EyeOff, AlertCircle, Trash2, 
  ExternalLink, LogOut, RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

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

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const { orders, showToast } = useCart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profil');
  const [saveSuccess, setSaveSuccess] = useState('');

  // Profile Form State
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('smartsavdo_profile');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      fullName: user?.user_metadata?.full_name || 'Sardor Aliyev',
      email: user?.email || 'user@smartsavdo.uz',
      phone: user?.user_metadata?.phone || '+998 90 123 45 67',
      region: 'Toshkent shahri',
      address: 'Chilonzor 19-mavze, 12-uy',
      bio: 'SmartSavdo AI orqali eng foydali narxlarda xarid qilishni yoqtiraman.'
    };
  });

  // Notification Preferences
  const [notifications, setNotifications] = useState({
    priceDropAlert: true,
    telegramBot: true,
    emailDigest: false,
    orderStatusSms: true,
    aiRecommendations: true
  });

  // App Preferences
  const [preferences, setPreferences] = useState({
    language: 'uz',
    currency: 'UZS',
    aiEngine: 'balanced', // saving, balanced, premium
    autoCompare: true
  });

  // Security form
  const [passForm, setPassForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleProfileSave = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('smartsavdo_profile', JSON.stringify(profile));
    } catch {}
    setSaveSuccess('Profil ma\'lumotlari muvaffaqiyatli saqlandi! ✓');
    showToast('Profil ma\'lumotlari saqlandi! ✓');
    setTimeout(() => setSaveSuccess(''), 3500);
  };

  const handleNotificationsSave = () => {
    showToast('Xabarnoma sozlamalari yangilandi! ✓');
  };

  const handlePreferencesSave = () => {
    showToast('Tizim afzalliklari saqlandi! ✓');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passForm.newPassword !== passForm.confirmPassword) {
      alert("Yangi parollar bir-biriga mos kelmadi!");
      return;
    }
    if (passForm.newPassword.length < 6) {
      alert("Parol kamida 6 ta belgidan iborat bo'lishi kerak!");
      return;
    }
    showToast('Parol muvaffaqiyatli yangilandi! ✓');
    setPassForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const tabs = [
    { id: 'profil', label: 'Profil sozlamalari', icon: User },
    { id: 'buyurtmalar', label: 'Buyurtmalar tarixi', icon: Package, badge: orders.length },
    { id: 'bildirishnomalar', label: 'Narx xabarnomalari', icon: Bell },
    { id: 'manzillar', label: 'Yetkazib berish manzili', icon: MapPin },
    { id: 'tizim', label: 'Ilova va AI afzalliklari', icon: Globe },
    { id: 'xavfsizlik', label: 'Xavfsizlik va Parol', icon: Shield },
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 animate-fadeIn min-w-0">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-5 relative z-10 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-white text-emerald-700 flex items-center justify-center font-black text-3xl shadow-md border-4 border-white/20">
            {profile.fullName?.charAt(0)?.toUpperCase() || 'S'}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold mb-1 backdrop-blur-xs">
              <Sparkles className="w-3 h-3 text-emerald-200" />
              SmartSavdo Foydalanuvchisi
            </div>
            <h1 className="text-2xl font-black">{profile.fullName}</h1>
            <p className="text-xs text-emerald-100 mt-0.5">{profile.email} • {profile.phone}</p>
          </div>
        </div>

        <div className="flex gap-2 relative z-10 w-full sm:w-auto justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            Bosh sahifaga qaytish
          </button>
          <button
            onClick={async () => {
              await signOut();
              navigate('/login');
            }}
            className="px-4 py-2.5 bg-rose-500/80 hover:bg-rose-500 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            Chiqish
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Navigation Tabs (Sidebar on desktop, horizontal scroll on mobile) */}
        <div className="lg:col-span-1 space-y-1 bg-white p-3 rounded-2xl border border-slate-100 shadow-xs h-fit">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
            Bo'limlar
          </div>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white text-emerald-700' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm min-h-[450px]">
          
          {saveSuccess && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-500/20 animate-fadeIn">
              <Check className="w-4 h-4" />
              <span>{saveSuccess}</span>
            </div>
          )}

          {/* 1. PROFIL SOZLAMALARI */}
          {activeTab === 'profil' && (
            <form onSubmit={handleProfileSave} className="space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-800">Shaxsiy profil ma'lumotlari</h3>
                  <p className="text-xs text-slate-400">Buyurtma va hisobingiz uchun ma'lumotlarni yangilang</p>
                </div>
                <button
                  type="submit"
                  className="btn-green px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" /> Saqlash
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">To'liq ism va familiya</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Elektron pochta (Email)</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Telefon raqam</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Viloyat / Shahar</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                    <select
                      value={profile.region}
                      onChange={(e) => setProfile({ ...profile, region: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white transition-all appearance-none cursor-pointer"
                    >
                      {REGIONS.map(reg => (
                        <option key={reg} value={reg}>{reg}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Yetkazib berish manzili</label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  placeholder="Ko'cha, uy, xonadon raqami"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">O'zingiz haqingizda (Status)</label>
                <textarea
                  rows={2}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full p-3 text-xs border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="btn-green px-6 py-2.5 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/25"
                >
                  <Save className="w-4 h-4" />
                  O'zgarishlarni saqlash
                </button>
              </div>
            </form>
          )}

          {/* 2. BUYURTMALAR TARIXI */}
          {activeTab === 'buyurtmalar' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-800">Buyurtmalar tarixi</h3>
                  <p className="text-xs text-slate-400">SmartSavdo orqali rasmiylashtirilgan barcha xaridlar</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                  {orders.length} ta buyurtma
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                    <Package className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-700">Hozircha buyurtmalar yo'q</h4>
                  <p className="text-xs max-w-sm mx-auto">
                    Bosh sahifadagi mahsulotlarni ko'rib chiqing va "Sotib olish" orqali eng yaxshi narxlarda xarid qiling!
                  </p>
                  <button
                    onClick={() => navigate('/')}
                    className="mt-3 px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl hover:bg-emerald-100 transition-colors"
                  >
                    Xarid qilishni boshlash
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 space-y-3">
                  {orders.map((ord, idx) => (
                    <div key={ord.id || idx} className="pt-3 pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl p-1 flex items-center justify-center flex-shrink-0">
                          <img src={ord.product?.img} alt={ord.product?.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                              #{ord.id}
                            </span>
                            <span className="text-[11px] text-slate-400">{ord.date}</span>
                          </div>
                          <div className="font-bold text-slate-800 text-xs mt-0.5">{ord.product?.name}</div>
                          <div className="text-[11px] text-slate-500">
                            {ord.shop} • {ord.quantity || 1} dona • To'lov: <span className="capitalize font-semibold">{ord.paymentMethod}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-left sm:text-right flex-shrink-0">
                        <div className="text-sm font-black text-slate-900">{ord.total || ord.price} so'm</div>
                        <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full mt-1">
                          ✓ {ord.status || 'Qabul qilindi'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. BILDIRISHNOMALAR VA NARX MONITORINGI */}
          {activeTab === 'bildirishnomalar' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-800">Xabarnomalar va Narx monitoringi</h3>
                <p className="text-xs text-slate-400">Narxlar tushishi va yangi chegirmalar haqida xabardor bo'ling</p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    key: 'priceDropAlert',
                    title: 'Narx tushganda tezkor bildirishnoma',
                    desc: 'Kuzatuvga qo\'shilgan mahsulot narxi pasayganda birinchilardan bo\'lib bilasiz'
                  },
                  {
                    key: 'telegramBot',
                    title: 'Telegram bot orqali xabarnoma',
                    desc: 'SmartSavdo rasmiy telegram boti orqali shaxsiy takliflarni qabul qilish'
                  },
                  {
                    key: 'orderStatusSms',
                    title: 'SMS orqali buyurtma holati',
                    desc: 'Kuryer yo\'lga chiqqanda va yetkazilganda telefoningizga bepul SMS yuboriladi'
                  },
                  {
                    key: 'aiRecommendations',
                    title: 'Sun\'iy intellekt shaxsiy maslahatlari',
                    desc: 'Siz qiziqqan toifadagi eng foydali narxlar tahlili haqida bildirishnomalar'
                  },
                  {
                    key: 'emailDigest',
                    title: 'Haftalik tejamkorlik hisoboti (Email)',
                    desc: 'Hafta davomida tejalgan mablag\' va top takliflar xulosasi'
                  }
                ].map((item) => (
                  <div
                    key={item.key}
                    onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                    className="p-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <div className="pr-4">
                      <div className="text-xs font-bold text-slate-800">{item.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                    </div>
                    <div className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 flex-shrink-0 ${
                      notifications[item.key] ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                        notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNotificationsSave}
                  className="btn-green px-5 py-2 text-xs font-bold rounded-xl shadow-sm"
                >
                  Xabarnoma sozlamalarini saqlash
                </button>
              </div>
            </div>
          )}

          {/* 4. YETKAZIB BERISH MANZILLARI */}
          {activeTab === 'manzillar' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-800">Yetkazib berish manzillari</h3>
                  <p className="text-xs text-slate-400">Buyurtma tez rasmiylashtirilishi uchun manzillarni saqlang</p>
                </div>
                <button
                  onClick={() => showToast('Yangi manzil kiritish oynasi ochildi')}
                  className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  + Yangi manzil
                </button>
              </div>

              <div className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/30 flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800">Asosiy manzil (Uy)</span>
                    <span className="bg-emerald-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                      Standart
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 font-medium">{profile.region}, {profile.address}</div>
                  <div className="text-[11px] text-slate-400">Qabul qiluvchi: {profile.fullName} ({profile.phone})</div>
                </div>
                <span className="text-xs font-bold text-emerald-700">Faol ✓</span>
              </div>
            </div>
          )}

          {/* 5. ILOVA VA AI AFZALLIKLARI */}
          {activeTab === 'tizim' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-800">Ilova va AI sozlamalari</h3>
                <p className="text-xs text-slate-400">Til, valyuta va sun'iy intellekt xarid strategiyasini boshqaring</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Tizim tili</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'uz', label: 'O\'zbekcha (Lotin)' },
                      { id: 'uz-cyr', label: 'Ўзбекча (Кирилл)' },
                      { id: 'ru', label: 'Русский язык' },
                    ].map(lang => (
                      <button
                        key={lang.id}
                        type="button"
                        onClick={() => setPreferences({ ...preferences, language: lang.id })}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                          preferences.language === lang.id
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Asosiy valyuta</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'UZS', label: 'So\'m (UZS)' },
                      { id: 'USD', label: 'AQSH Dollari ($ USD)' },
                    ].map(cur => (
                      <button
                        key={cur.id}
                        type="button"
                        onClick={() => setPreferences({ ...preferences, currency: cur.id })}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                          preferences.currency === cur.id
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {cur.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    SmartSavdo Sun'iy Intellekt strategiyasi
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'saving', label: 'Maksimal tejash', desc: 'Eng past narxlarni birinchi o\'ringa qo\'yadi' },
                      { id: 'balanced', label: 'Muvozanatli (Tavsiya)', desc: 'Narx va sifat nisbati optimal darajada' },
                      { id: 'premium', label: 'Premium sifat', desc: 'Rasmiy kafolat va eng yuqori reyting' },
                    ].map(eng => (
                      <div
                        key={eng.id}
                        onClick={() => setPreferences({ ...preferences, aiEngine: eng.id })}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          preferences.aiEngine === eng.id
                            ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="font-bold text-xs">{eng.label}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{eng.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handlePreferencesSave}
                  className="btn-green px-5 py-2 text-xs font-bold rounded-xl shadow-sm"
                >
                  Afzalliklarni saqlash
                </button>
              </div>
            </div>
          )}

          {/* 6. XAVFSIZLIK VA PAROL */}
          {activeTab === 'xavfsizlik' && (
            <form onSubmit={handlePasswordChange} className="space-y-4 animate-fadeIn max-w-md">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-800">Xavfsizlik va Parol</h3>
                <p className="text-xs text-slate-400">Profilingiz xavfsizligi uchun kuchli paroldan foydalaning</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Joriy parol</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passForm.oldPassword}
                    onChange={(e) => setPassForm({ ...passForm, oldPassword: e.target.value })}
                    required
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Yangi parol</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passForm.newPassword}
                  onChange={(e) => setPassForm({ ...passForm, newPassword: e.target.value })}
                  required
                  placeholder="Kamida 6 ta belgi"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Yangi parolni tasdiqlash</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passForm.confirmPassword}
                  onChange={(e) => setPassForm({ ...passForm, confirmPassword: e.target.value })}
                  required
                  placeholder="Yangi parolni qayta kiriting"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-green px-5 py-2.5 text-xs font-bold rounded-xl shadow-sm"
                >
                  Parolni yangilash
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
