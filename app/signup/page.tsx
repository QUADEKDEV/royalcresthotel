"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import {Mail,Lock,User,Phone,ArrowRight,Loader2,Eye,EyeOff,CheckCircle2,ChevronLeft,
} from "lucide-react";
import { signUp } from "../utils/actions";
import toast from "react-hot-toast";

export default function SignUpPage() {

  const [formData, setFormData] = useState({
     firstname:"",
  lastname: "",
  email: "",
  phone: "",
  password: "",

    // firstName: "",
    // lastName: "",
    // email: "",
    // phone: "",
    // password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await signUp(formData);
    if (!response.success) {
       toast.success('hi');
      alert(response.message);
    } else {
       toast.success("hi");
      alert(response.message);
      setIsSuccess(true);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500">
              <CheckCircle2 size={48} />
            </div>
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">
            Welcome to the Collection
          </h1>
          <p className="text-slate-500 leading-relaxed">
            Your Royal Crest account has been created. A verification link has been
            sent to <strong>{formData.email}</strong>.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            Go to Login
          </button>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Left Side: Brand Narrative */}
      <div className="hidden lg:flex w-5/12 relative bg-slate-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop"
          alt="Luxury Bedroom View"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

        <div className="relative z-10 p-16 flex flex-col justify-between w-full">
          <div className="text-2xl font-serif font-bold tracking-widest text-white">
            ROYAL CREST<span className="text-amber-500">.</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-4xl font-serif font-bold text-white mb-6 leading-tight">
              Unlock a World of <br /> Exclusive Benefits.
            </h2>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                Member-only rates & hidden offers
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                Early check-in & late check-out
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                Complimentary spa access
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Sign Up Form */}
      <div className="flex-1 bg-[#FDFBF7] flex flex-col items-center justify-center p-8 md:p-16 relative">
       

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="mb-10">
            <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">
              Create your account
            </h1>
            <p className="text-slate-500">
              Begin your journey with Royal Crest Hotels & Resorts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                  First Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-3.5 text-slate-300"
                    size={18}
                  />
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    onChange={(e) =>
                      setFormData({ ...formData, firstname: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                  Last Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-3.5 text-slate-300"
                    size={18}
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    onChange={(e) =>
                      setFormData({ ...formData, lastname: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-3.5 text-slate-300"
                  size={18}
                />
                <input
                  type="email"
                  required
                  placeholder="royalcrest@example.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                Phone (Optional)
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-4 top-3.5 text-slate-300"
                  size={18}
                />
                <input
                  type="tel"
                  placeholder="+234 703 313 7268"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-3.5 text-slate-300"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-sm text-slate-500 leading-relaxed">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-slate-900 font-medium hover:text-amber-600"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-slate-900 font-medium hover:text-amber-600"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-slate-200 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Create Account{" "}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-slate-900 font-bold hover:text-amber-600 transition-colors"
            >
              Sign In
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
