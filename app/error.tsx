"use client"
import React from "react";
import { motion } from "framer-motion";
import { RefreshCw, Home, ArrowLeft, Mail } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col lg:flex-row font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Visual Side (Top on mobile, Left on Desktop) */}
      <div className="relative w-full lg:w-1/2 h-64 lg:h-auto overflow-hidden bg-slate-200">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
            alt="Minimalist Architecture"
            className="w-full h-full object-cover"
          />
          {/* Subtle Overlay for mood */}
          <div className="absolute inset-0 bg-slate-900/10" />
        </motion.div>

        {/* Floating Brand Mark (Mobile only) */}
        <div className="absolute top-6 left-6 lg:hidden z-10">
          <span className="text-xl font-serif font-bold text-white tracking-widest drop-shadow-md">
            Royal Crest Hotel<span className="text-amber-400">.</span>
          </span>
        </div>
      </div>

      {/* Content Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 relative bg-[#FDFBF7]">
        {/* Desktop Brand Mark */}
        <div className="absolute top-8 right-8 hidden lg:block">
          <span className="text-2xl font-serif font-bold text-slate-900 tracking-widest">
            Royal Crest Hotel<span className="text-amber-600">.</span>
          </span>
        </div>

        <div className="max-w-lg w-full relative">
          {/* Background '500' watermark */}
          <div className="absolute -top-20 -left-10 select-none pointer-events-none opacity-5">
            <span className="font-serif text-[10rem] md:text-[14rem] leading-none text-slate-900 font-bold">
              500
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative z-10"
          >
            {/* Decorative Line */}
            <div className="w-12 h-1.5 bg-amber-500 mb-8 rounded-full" />

            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 leading-tight">
              Unexpected <br /> Interruption.
            </h2>

            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              Our digital concierge has encountered a momentary pause. Rest
              assured, our engineering team is already attending to the matter
              with the highest priority to ensure your experience remains
              seamless.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 font-medium shadow-lg shadow-slate-200"
              >
                <RefreshCw size={18} /> Refresh Page
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 font-medium"
              >
                <ArrowLeft size={18} /> Return to Lobby
              </button>
            </div>

            {/* Footer Note */}
            <div className="mt-16 pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-400 gap-4">
              <p className="font-mono">
                ERROR REF: <span className="text-slate-600">ID-500-ERR</span>
              </p>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-amber-600 transition-colors font-medium"
              >
                <Mail size={14} /> Contact Priority Support
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
