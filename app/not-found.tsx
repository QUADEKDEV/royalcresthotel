"use client"
import React from "react";
import { motion } from "framer-motion";
import { Home, Search, Phone, ArrowLeft, Map } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-slate-900 flex items-center justify-center overflow-hidden font-sans selection:bg-amber-500 selection:text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Abstract"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-900" />
      </div>

      {/* Decorative Circles (Animated) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] border border-amber-500/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] border border-white/5 rounded-full"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Brand Logo Small */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-10 left-0 right-0 flex justify-center"
        >
          <span className="text-xl font-serif font-bold text-white tracking-widest">
             Royal Crest Hotel<span className="text-amber-500">.</span>
          </span>
        </motion.div>

        {/* 404 Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto"
        >
          {/* Large 404 Number */}
          <h1 className="text-[10rem] md:text-[14rem] leading-none font-serif font-bold text-transparent bg-clip-text bg-linear-to-b from-amber-200 to-amber-700 opacity-80 select-none">
            404
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
              You Seem a Little Lost
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              The suite you are looking for is currently unoccupied... or
              perhaps it never existed. Let us guide you back to the comfort of
              our lobby.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button
                onClick={() => (window.location.href = "/")}
                className="w-full md:w-auto bg-amber-500 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-amber-600 transition-all flex items-center justify-center gap-2 group"
              >
                <ArrowLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Return to Lobby
              </button>

              <button className="w-full md:w-auto bg-white/10 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-full font-medium text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                <Phone size={20} />
                Contact Us
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-8 text-sm text-slate-500"
        >
          <a
            href="#"
            className="hover:text-amber-400 transition-colors flex items-center gap-2"
          >
            <Search size={14} /> Search Suites
          </a>
          <a
            href="#"
            className="hover:text-amber-400 transition-colors flex items-center gap-2"
          >
            <Map size={14} /> Resort Map
          </a>
          <a
            href="#"
            className="hover:text-amber-400 transition-colors flex items-center gap-2"
          >
            <Home size={14} /> Guest Services
          </a>
        </motion.div>
      </div>
    </div>
  );
}
