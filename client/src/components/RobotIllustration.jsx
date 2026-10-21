import React from 'react';
import { ShoppingBag, ShoppingCart, Percent, Sparkles } from 'lucide-react';

export default function RobotIllustration() {
  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center select-none">
      {/* Soft background radial glows */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200/40 via-emerald-100/30 to-transparent rounded-full blur-2xl -z-10" />
      <div className="absolute w-40 h-40 bg-emerald-400/20 rounded-full blur-xl -z-10" />

      {/* Floating Discount Tag Badge */}
      <div className="absolute top-2 left-3 bg-emerald-500 text-white rounded-xl p-2 shadow-lg shadow-emerald-500/30 transform -rotate-12 animate-bounce duration-1000 z-10">
        <Percent className="w-5 h-5 text-white stroke-[2.5]" />
      </div>

      {/* Floating Sparkle Badge */}
      <div className="absolute bottom-6 left-1 bg-white/95 border border-emerald-200 text-emerald-600 rounded-lg p-1.5 shadow-md transform rotate-6 z-10">
        <Sparkles className="w-4 h-4 fill-emerald-400 text-emerald-500" />
      </div>

      {/* Floating Shopping Cart Badge */}
      <div className="absolute top-4 right-2 bg-white/90 border border-emerald-100 text-emerald-600 rounded-xl p-2 shadow-lg shadow-emerald-500/10 transform rotate-12 z-10">
        <ShoppingCart className="w-5 h-5 stroke-[2.2]" />
      </div>

      {/* Robot image container */}
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden flex items-center justify-center">
        <img
          src="/robot.jpg"
          alt="SmartSavdo AI Shopping Assistant Robot"
          className="w-full h-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback SVG if image not found
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Floating Shopping Bag Mini Badge */}
      <div className="absolute bottom-2 right-4 bg-emerald-600 text-white rounded-xl p-2 shadow-lg shadow-emerald-600/30 transform -rotate-6 z-10">
        <ShoppingBag className="w-4 h-4" />
      </div>
    </div>
  );
}
