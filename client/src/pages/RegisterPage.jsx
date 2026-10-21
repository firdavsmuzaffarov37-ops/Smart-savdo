import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Check, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const benefits = [
  'AI yordamida mahsulot tahlili',
  '50+ do\'kon narxlarini solishtirish',
  'Narx pasayganda xabar olish',
  'Shaxsiy byudjet maslahatchi',
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, user } = useAuth();
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleNext = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg('Iltimos, barcha maydonlarni to\'ldiring.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setErrorMsg('Parol kamida 6 ta belgidan iborat bo\'lishi kerak.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setErrorMsg('Kiritilgan parollar mos kelmadi.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const data = await signUp({
        email: form.email.trim(),
        password: form.password,
        name: form.name.trim(),
        phone: form.phone.trim(),
      });

      // If Supabase requires email verification
      if (data?.user && !data?.session) {
        setSuccessMsg('Muvaffaqiyatli ro\'yxatdan o\'tdingiz! Email manzilingizga tasdiqlash havolasi yuborildi.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setSuccessMsg('Muvaffaqiyatli ro\'yxatdan o\'tdingiz!');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.message?.includes('already registered')) {
        setErrorMsg('Bu email allaqachon ro\'yxatdan o\'tgan. Iltimos, kiring.');
      } else {
        setErrorMsg(err.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setErrorMsg('');
    try {
      await signInWithGoogle();
    } catch (err) {
      setErrorMsg(err.message || 'Google orqali ro\'yxatdan o\'tishda xatolik.');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f6f8f7] overflow-hidden">
      {/* ── Left panel ── */}
      <div className="hidden lg:flex flex-col flex-1 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

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
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Robot Illustration */}
            <div className="relative w-56 h-56 mb-6">
              <div className="absolute inset-0 bg-white/15 rounded-full blur-2xl" />
              <img
                src="/robot.jpg"
                alt="SmartSavdo AI Robot"
                className="w-full h-full object-contain rounded-3xl drop-shadow-2xl"
              />
              <div className="absolute -top-2 right-0 bg-white rounded-2xl px-3 py-1.5 shadow-xl text-[11px] font-bold text-emerald-600 flex items-center gap-1.5 animate-float">
                <Sparkles className="w-3.5 h-3.5 fill-emerald-400" />
                100% Bepul!
              </div>
              <div className="absolute -bottom-2 left-0 bg-white/95 rounded-xl px-2.5 py-1.5 shadow-lg text-[10px] font-semibold text-slate-700 animate-float2">
                🎉 Xush kelibsiz
              </div>
            </div>

            <h2 className="text-white text-2xl font-extrabold leading-tight text-center mb-3">
              Bugun qo'shiling<br />va tejashni boshlang!
            </h2>

            {/* Benefits list */}
            <ul className="space-y-2.5 mt-4 w-full max-w-xs">
              {benefits.map(b => (
                <li key={b} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-emerald-50 text-[12.5px]">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom tagline */}
          <div className="text-center text-emerald-100/70 text-[11px] font-handwriting text-lg mt-4">
            Aqlli xarid — katta tejash! ✨
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
          <h1 className="text-2xl font-extrabold text-slate-800 mb-1">Ro'yxatdan o'tish</h1>
          <p className="text-slate-400 text-[13px] mb-5">
            Hisobingiz bormi?{' '}
            <Link to="/login" className="text-emerald-600 font-semibold hover:underline">
              Kirish
            </Link>
          </p>

          {/* Messages */}
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

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2].map(s => (
              <React.Fragment key={s}>
                <div className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold transition-all ${
                  step >= s ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30' : 'bg-slate-100 text-slate-400'
                }`}>{s}</div>
                {s < 2 && (
                  <div className={`flex-1 h-0.5 rounded-full transition-all ${step > s ? 'bg-emerald-400' : 'bg-slate-100'}`} />
                )}
              </React.Fragment>
            ))}
            <span className="text-[11px] text-slate-400 ml-1">{step === 1 ? 'Shaxsiy ma\'lumot' : 'Parol yaratish'}</span>
          </div>

          {step === 1 ? (
            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Ism va familiya</label>
                <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:border-emerald-400 focus-within:shadow-[0_0_0_3px_rgba(52,211,153,0.12)] transition-all">
                  <User className="w-4 h-4 text-slate-300 flex-shrink-0" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Ali Valiyev"
                    required
                    className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder-slate-300 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Telefon raqam</label>
                <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:border-emerald-400 focus-within:shadow-[0_0_0_3px_rgba(52,211,153,0.12)] transition-all">
                  <Phone className="w-4 h-4 text-slate-300 flex-shrink-0" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="+998 90 123 45 67"
                    required
                    className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder-slate-300 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Email</label>
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
              <button type="submit" className="btn-green w-full py-3 flex items-center justify-center gap-2 text-[14px]">
                Davom etish <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Parol</label>
                <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:border-emerald-400 focus-within:shadow-[0_0_0_3px_rgba(52,211,153,0.12)] transition-all">
                  <Lock className="w-4 h-4 text-slate-300 flex-shrink-0" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    placeholder="Kamida 6 ta belgi"
                    required minLength={6}
                    className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder-slate-300 outline-none"
                  />
                  <button type="button" onClick={() => setShowPass(s => !s)} className="text-slate-300 hover:text-slate-500">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.password && (
                  <div className="flex gap-1 mt-1.5">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${
                        form.password.length > i * 2
                          ? form.password.length >= 10 ? 'bg-emerald-500' : form.password.length >= 6 ? 'bg-amber-400' : 'bg-rose-400'
                          : 'bg-slate-100'
                      }`} />
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Parolni tasdiqlang</label>
                <div className={`flex items-center gap-2.5 bg-white border rounded-xl px-3.5 py-2.5 transition-all focus-within:shadow-[0_0_0_3px_rgba(52,211,153,0.12)]
                  ${form.confirmPassword && form.password !== form.confirmPassword ? 'border-rose-300 focus-within:border-rose-400' : 'border-slate-200 focus-within:border-emerald-400'}`}>
                  <Lock className="w-4 h-4 text-slate-300 flex-shrink-0" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                    placeholder="Parolni qaytaring"
                    required
                    className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder-slate-300 outline-none"
                  />
                  {form.confirmPassword && form.password === form.confirmPassword && (
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  )}
                </div>
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <p className="text-[11px] text-rose-500 mt-1">Parollar mos kelmadi</p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 text-[13px] font-semibold text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
                >
                  Orqaga
                </button>
                <button
                  type="submit"
                  disabled={loading || form.password !== form.confirmPassword}
                  className="btn-green flex-[2] py-3 flex items-center justify-center gap-2 text-[14px] disabled:opacity-60"
                >
                  {loading ? (
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                  ) : (
                    <>Ro'yxatdan o'tish <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-[#f6f8f7] text-[11px] text-slate-400 font-medium">yoki</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-xl py-2.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-[0.99]"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google orqali ro'yxatdan o'tish
          </button>
        </div>
      </div>
    </div>
  );
}
