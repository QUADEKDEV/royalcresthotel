"use client"
import { useState,useEffect } from "react";
import {Menu,X,}
 from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const LandingNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div
          className={`text-2xl font-serif font-bold tracking-tighter ${
            scrolled ? "text-slate-900" : "text-white"
          }`}
        >
          Royal Crest Hotel<span className="text-amber-500">.</span>
        </div>

        {/* Desktop Links */}
        <div
          className={`hidden md:flex items-center space-x-8 font-medium ${
            scrolled ? "text-slate-600" : "text-white/90"
          }`}
        >
          <a href="/" className="hover:text-amber-500 transition-colors">
            Home
          </a>
          <a href="/suites" className="hover:text-amber-500 transition-colors">
            Suites
          </a>
          <a
            href="/contactus"
            className="hover:text-amber-500 transition-colors"
          >
            Contact Us
          </a>
          <a href="/about" className="hover:text-amber-500 transition-colors">
            About Us
          </a>
          <a
            href="/userdashboard"
            className="hover:text-amber-500 transition-colors"
          >
            Dashboard
          </a>
          <button
            className={`px-6 py-2 rounded-full transition-all ${
              scrolled
                ? "bg-slate-900 text-white hover:bg-slate-800"
                : "bg-white text-slate-900 hover:bg-slate-100"
            }`}
            onClick={() => (window.location.href = "/login")}
          >
            Sign In
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className={scrolled ? "text-slate-900" : "text-white"} />
          ) : (
            <Menu className={scrolled ? "text-slate-900" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="flex flex-col p-6 space-y-4 text-slate-900 font-medium">
              <a href="/">Home</a>
              <a href="/suites">Suites</a>
              <a href="/about">About Us</a>
              <a href="/contactus">Contact Us</a>
              <a href="/userdashboard">Dashboard</a>
              <button
                className={`px-6 py-2 rounded-full transition-all ${"bg-slate-900 text-white hover:bg-slate-800"}`}
                onClick={() => (window.location.href = "/login")}
              >
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default LandingNav