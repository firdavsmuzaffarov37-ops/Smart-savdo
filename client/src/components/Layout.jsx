import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  Home, Search, BarChart2, Calculator, TrendingDown, Heart, Settings,
  Bell, ShoppingCart, Menu, X, LogOut, LogIn, User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import CheckoutModal from './CheckoutModal';

const navItems = [
  { icon: Home, label: 'Bosh sahifa', to: '/' },
  { icon: Search, label: 'Mahsulot qidirish', to: '/search' },
  { icon: BarChart2, label: 'Taqqoslash', to: '/compare' },
  { icon: Calculator, label: 'Byudjet maslahatchi', to: '/budget' },
  { icon: TrendingDown, label: 'Narx tarixi', to: '/price-history' },
  { icon: Heart, label: 'Sevimlilar', to: '/favorites' },
  { icon: Settings, label: 'Sozlamalar', to: '/settings' },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartCheckoutState, setCartCheckoutState] = useState({ isOpen: false, product: null, shop: null });
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { cartCount, setCartDrawerOpen, toastMessage, setToastMessage } = useCart();

  const handleLogout = async (e) => {
    e.stopPropagation();
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Mehmon';
  const displayEmail = user?.email || 'Tizimga kiring';

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f8f7]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-[220px] bg-white border-r border-slate-100
          flex flex-col py-5 px-3 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-3 mb-7 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <ShoppingCart className="w-5 h-5 text-white" strokeWidth={2.2} />
          </div>
          <div>
            <div className="font-bold text-slate-800 text-[15px] leading-tight">SmartSavdo</div>
            <div className="text-[10px] text-emerald-600 font-medium">AI yordamchi savdo</div>
          </div>
          <button
            className="ml-auto lg:hidden text-slate-400 hover:text-slate-600"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5">
          {navItems.map(({ icon: Icon, label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] transition-all duration-200 group
                ${isActive
                  ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 font-semibold'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all
                    ${isActive ? 'bg-emerald-500 shadow-md shadow-emerald-500/30' : 'bg-slate-100 group-hover:bg-slate-200'}`}>
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} strokeWidth={2} />
                  </div>
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Profile bottom */}
        {user ? (
          <div className="mt-4 px-2.5 py-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs uppercase flex-shrink-0">
              {displayName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-slate-700 truncate">{displayName}</div>
              <div className="text-[10px] text-emerald-600 font-medium truncate">Supabase Auth ✓</div>
            </div>
            <button
              onClick={handleLogout}
              title="Chiqish"
              className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="mt-4 w-full py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-700 font-semibold text-[13px] hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 border border-emerald-200"
          >
            <LogIn className="w-4 h-4" />
            Kirish / Ro'yxat
          </button>
        )}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-slate-100 flex items-center px-4 gap-3 flex-shrink-0">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <button className="relative p-2 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
          </button>
          <button
            onClick={() => setCartDrawerOpen(true)}
            className="relative p-2 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors cursor-pointer group"
            title="Savatni ko'rish"
          >
            <ShoppingCart className="w-5 h-5 group-hover:text-emerald-600 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-2 pl-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                {displayName.charAt(0)}
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="text-[12px] font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              Kirish
            </button>
          )}
        </header>

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-fadeIn border border-slate-700/50">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage('')} className="ml-2 text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">
          <Outlet />
        </main>

        {/* Cart Drawer & Checkout from Cart */}
        <CartDrawer
          onCheckoutProduct={(product, shop) => {
            setCartCheckoutState({ isOpen: true, product, shop });
          }}
        />

        {cartCheckoutState.isOpen && (
          <CheckoutModal
            isOpen={cartCheckoutState.isOpen}
            product={cartCheckoutState.product}
            initialShop={cartCheckoutState.shop}
            onClose={() => setCartCheckoutState({ isOpen: false, product: null, shop: null })}
          />
        )}
      </div>

      {/* ── MOBILE BOTTOM NAV BAR ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-slate-100 flex items-center justify-around px-1 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        {[
          { icon: Home, label: 'Bosh', to: '/' },
          { icon: Search, label: 'Qidirish', to: '/search' },
          { icon: BarChart2, label: 'Taqqos', to: '/compare' },
          { icon: Heart, label: 'Sevimli', to: '/favorites' },
          { icon: Settings, label: 'Sozlama', to: '/settings' },
        ].map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all min-w-[52px] ${
                isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                  isActive ? 'bg-emerald-50' : ''
                }`}>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[9px] font-semibold leading-none ${
                  isActive ? 'text-emerald-600' : 'text-slate-400'
                }`}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
        {/* Cart button in bottom nav */}
        <button
          onClick={() => setCartDrawerOpen(true)}
          className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all min-w-[52px] text-slate-400 hover:text-slate-600 relative"
        >
          <div className="w-8 h-8 rounded-xl flex items-center justify-center">
            <ShoppingCart className="w-4 h-4" strokeWidth={2} />
          </div>
          {cartCount > 0 && (
            <span className="absolute top-0.5 right-2 w-4 h-4 bg-emerald-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
          <span className="text-[9px] font-semibold leading-none">Savat</span>
        </button>
      </nav>
    </div>
  );
}
