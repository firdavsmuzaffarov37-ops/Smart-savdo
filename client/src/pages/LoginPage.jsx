import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, resetPassword, user } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // If already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await signIn({
        email: form.email.trim(),
        password: form.password,
      });
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      if (err.message?.includes('Invalid login credentials')) {
        setErrorMsg('Email yoki parol noto\'g\'ri kiritildi.');
      } else if (err.message?.includes('Email not confirmed')) {
        setErrorMsg('Email manzilingiz hali tasdiqlanmagan. Iltimos, pochtangizni tekshiring.');
      } else {
        setErrorMsg(err.message || 'Kirishda xatolik yuz berdi. Qayta urinib ko\'ring.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error('Google login error:', err);
      setErrorMsg(err.message || 'Google orqali kirishda xatolik.');
    }
  };

  const handleForgotPassword = async () => {
    if (!form.email) {
      setErrorMsg('Parolni tiklash uchun avval email manzilingizni kiriting.');
      return;
    }
    setErrorMsg('');
    try {
      await resetPassword(form.email.trim());
      setSuccessMsg('Parolni tiklash havolasi emailingizga yuborildi!');
    } catch (err) {
      setErrorMsg(err.message || 'Parolni tiklashda xatolik yuz berdi.');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f6f8f7] overflow-hidden">
      {/* ── Left panel (illustration) ── */}
      <div className="hidden lg:flex flex-col flex-1 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/3 -right-16 w-56 h-56 bg-emerald-300/20 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col h-full px-14 py-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-6 h-6 text-white" strokeWidth={2.2} />
            </div>
            <div>
              <div className="text-white font-extrabold text-xl">SmartSavdo</div>
              <div className="text-emerald-100 text-xs font-medium">AI yordamchi savdo</div>
            </div>
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            {/* Robot / AI illustration */}
            <div className="relative w-56 h-56 mb-8">
              <div className="absolute inset-0 bg-white/15 rounded-full blur-2xl" />
              {/* Floating badges */}
              <div className="absolute top-2 left-0 bg-white text-emerald-600 rounded-2xl px-3 py-2 shadow-xl text-[11px] font-bold flex items-center gap-1.5 animate-float">
                <Sparkles className="w-3.5 h-3.5 fill-emerald-400" />
                AI tahlil
              </div>
              <div className="absolute bottom-8 right-0 bg-white text-slate-700 rounded-2xl px-3 py-2 shadow-xl text-[11px] font-bold animate-float2">
                💰 Tejash
              </div>
              <div className="absolute bottom-0 left-4 bg-emerald-400/90 text-white rounded-xl px-2.5 py-1.5 shadow-lg text-[10px] font-semibold animate-float">
                -25% chegirma
              </div>
              {/* Robot face SVG */}
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl" fill="none">
                <circle cx="100" cy="100" r="80" fill="rgba(255,255,255,0.2)" />
                {/* Robot head */}
                <rect x="52" y="55" width="96" height="80" rx="22" fill="white" opacity="0.95" />
                {/* Antenna */}
                <line x1="100" y1="55" x2="100" y2="38" stroke="white" strokeWidth="4" strokeLinecap="round" />
                <circle cx="100" cy="34" r="7" fill="white" opacity="0.9" />
                <circle cx="100" cy="34" r="4" fill="#22c55e" />
                {/* Eyes */}
                <rect x="68" y="80" width="24" height="16" rx="8" fill="#22c55e" />
                <rect x="108" y="80" width="24" height="16" rx="8" fill="#22c55e" />
                <circle cx="80" cy="88" r="5" fill="white" />
                <circle cx="120" cy="88" r="5" fill="white" />
                {/* Smile */}
                <path d="M74 112 Q100 128 126 112" stroke="#22c55e" strokeWidth="4" fill="none" strokeLinecap="round" />
                {/* Cheeks */}
                <circle cx="64" cy="108" r="8" fill="#86efac" opacity="0.6" />
                <circle cx="136" cy="108" r="8" fill="#86efac" opacity="0.6" />
                {/* Body */}
                <rect x="70" y="135" width="60" height="40" rx="14" fill="white" opacity="0.9" />
                <circle cx="88" cy="155" r="6" fill="#22c55e" opacity="0.8" />
                <circle cx="100" cy="155" r="6" fill="#22c55e" opacity="0.6" />
                <circle cx="112" cy="155" r="6" fill="#22c55e" opacity="0.4" />
              </svg>
            </div>

            <h2 className="text-white text-3xl font-extrabold leading-tight mb-3">
              Aqlli xarid,<br />katta tejash!
            </h2>
            <p className="text-emerald-100 text-[14px] max-w-xs leading-relaxed">
              Sun'iy intellekt yordamida mahsulotlarni tahlil qiling va eng yaxshi narxda xarid qiling.
            </p>

            {/* Stats row */}
            <div className="flex gap-6 mt-8">
              {[['50+', "Do'kon"], ['200K+', 'Mahsulot'], ['4.9★', 'Reyting']].map(([val, lbl]) => (
                <div key={lbl} className="text-center">
                  <div className="text-white font-extrabold text-xl">{val}</div>
                  <div className="text-emerald-100 text-[11px] font-medium">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="flex-1 lg:max-w-md flex flex-col items-center justify-center px-6 py-10">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <ShoppingCart className="w-5 h-5 text-white" strokeWidth={2.2} />
          </div>
          <div>
            <div className="font-bold text-slate-800 text-[15px]">SmartSavdo</div>
            <div className="text-[10px] text-emerald-600 font-medium">AI yordamchi savdo</div>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-extrabold text-slate-800 mb-1">Kirish</h1>
          <p className="text-slate-400 text-[13px] mb-7">
            Hisobingiz yo'qmi?{' '}
            <Link to="/register" className="text-emerald-600 font-semibold hover:underline">
              Ro'yxatdan o'tish
            </Link>
          </p>

          {/* Feedback messages */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[12px] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-[12px] flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
                Email
              </label>
              <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:border-emerald-400 focus-within:shadow-[0_0_0_3px_rgba(52,211,153,0.12)] transition-all">
                <Mail className="w-4 h-4 text-slate-300 flex-shrink-0" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="email@example.com"
                  required
                  className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder-slate-300 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
                Parol
              </label>
              <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:border-emerald-400 focus-within:shadow-[0_0_0_3px_rgba(52,211,153,0.12)] transition-all">
                <Lock className="w-4 h-4 text-slate-300 flex-shrink-0" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                  className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder-slate-300 outline-none"
                />
                <button type="button" onClick={() => setShowPass(s => !s)} className="text-slate-300 hover:text-slate-500 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex justify-end mt-1.5">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[11px] text-emerald-600 hover:underline font-medium"
                >
                  Parolni unutdingizmi?
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-green w-full py-3 flex items-center justify-center gap-2 text-[14px] mt-2 disabled:opacity-70"
            >
              {loading ? (
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <>Kirish <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-[#f6f8f7] text-[11px] text-slate-400 font-medium">yoki</span>
            </div>
          </div>

          {/* Google OAuth */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-xl py-2.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-[0.99]"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google orqali kirish
          </button>
        </div>
      </div>
    </div>
  );
}
