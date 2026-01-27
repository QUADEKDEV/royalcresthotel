"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  ArrowRight, 
  Loader2, 
  ChevronLeft,
  KeyRound,
  CheckCircle2
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to send reset link
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-amber-50 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-slate-100 rounded-full blur-[100px] opacity-60" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        {/* Brand Header */}
        <div className="text-center mb-12">
          <div className="text-2xl font-serif font-bold tracking-[0.2em] text-slate-900 mb-2">
            LUMINA<span className="text-amber-500">.</span>
          </div>
          <div className="h-0.5 w-12 bg-amber-500 mx-auto rounded-full" />
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="request-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="mb-8">
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
                  <KeyRound size={24} />
                </div>
                <h1 className="text-2xl font-serif font-bold text-slate-900 mb-3">Forgot password?</h1>
                <p className="text-slate-500 text-sm leading-relaxed">
                  No worries, it happens to the best of us. Enter your email and we'll send you a link to reset your access.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-slate-300" size={18} />
                    <input 
                      type="email" 
                      required
                      value={email}
                      placeholder="alexander@lumina.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 transition-all placeholder:text-slate-300 text-slate-700"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-slate-200 disabled:opacity-70"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      Send Reset Link <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-50 text-center">
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium"
                >
                  <ChevronLeft size={16} /> Back to login
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                  <CheckCircle2 size={32} />
                </div>
              </div>
              <h1 className="text-2xl font-serif font-bold text-slate-900 mb-3">Check your inbox</h1>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                We've sent an email to <span className="text-slate-900 font-semibold">{email}</span> with instructions to reset your password.
              </p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                >
                  Return to Login
                </button>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-sm text-slate-400 hover:text-slate-600 transition-colors font-medium underline underline-offset-4"
                >
                  Didn't receive email? Try again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-12 text-center text-slate-400 text-[10px] uppercase tracking-[0.2em]">
          &copy; 2024 Lumina Hotels & Resorts • Private Collection
        </p>
      </motion.div>
    </div>
  );
}