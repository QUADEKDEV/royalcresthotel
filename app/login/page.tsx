"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { signIn } from '../utils/actions';
import { useRouter} from 'next/router';

import {
  Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');


 const getRedirectPath = (role: string) => {
   switch (role) {
     case "admin":
       return "/admindashboard";
     case "staff":
       return "/staffdashboard";
     case "guest":
     default:
       return "/userdashboard";
   }
 };

  // const handleLogin =async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError("");
  //   let response = await signIn({email,password});
  //   if (!response.success) {
  //      setError(response.message as string);
  //      setIsLoading(false);
  //   } else {
  //     toast.success(response.message as string);
  //       window.location.href = '/admindashboard';
  //     // route.push("/admindashboard");
  //   }
  // };
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  try {
    const response = await signIn({ email, password });

    if (!response.success) {
      const msg =
        typeof response.message === "string"
          ? response.message
          : "Login failed";

      setError(msg);
      toast.error(msg);
      setIsLoading(false);
      return;
    }

    toast.success(
      typeof response.message === "string"
        ? response.message
        : "Login successful",
    );
   window.location.href = getRedirectPath(response.role)

    // window.location.href = "/admindashboard";
  } catch (err) {
    toast.error("Something went wrong");
    setError("Something went wrong");
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-900 flex font-sans selection:bg-amber-500 selection:text-white">
      
      {/* Left Side: Visual / Brand */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-900 items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop" 
            alt="Luxury Hotel Lobby" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        {/* Floating Content */}
        <div className="relative z-10 p-12 text-center max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-serif font-bold text-white mb-6">Welcome Back to Paradise</h2>
            <p className="text-lg text-slate-300 font-light leading-relaxed">
              "Travel is the only thing you buy that makes you richer."
            </p>
            <div className="mt-8 flex justify-center gap-2">
              <div className="w-12 h-1 bg-amber-500 rounded-full" />
              <div className="w-2 h-1 bg-slate-600 rounded-full" />
              <div className="w-2 h-1 bg-slate-600 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 relative">
        {/* Mobile Header Image (Only visible on small screens) */}
        <div className="lg:hidden absolute top-0 left-0 right-0 h-48 bg-slate-900 z-0 overflow-hidden">
          <img 
             src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop" 
             className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="mb-10 text-center lg:text-left">
            <a href="/" className="inline-block text-3xl font-serif font-bold tracking-tighter text-slate-900 mb-2">
              Royal Crest<span className="text-amber-500">.</span>
            </a>
            <h1 className="text-2xl font-bold text-slate-900 mt-4">Sign in to your account</h1>
            <p className="text-slate-500 text-sm mt-2">
              Access your bookings, rewards, and exclusive offers.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="guest@royalcrest.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-slate-900"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <a href="/forgotpassword" className="text-xs font-medium text-amber-600 hover:text-amber-700">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-slate-900"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error && <p className="text-red-500 text-xs mt-1 animate-pulse">{error}</p>}
            </div>

            
            

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-slate-900 text-white font-medium py-4 rounded-xl hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Signing In...
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-amber-600 hover:text-amber-500 transition-colors">
              Create an account
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}