"use client"
import { div } from 'framer-motion/client';
import React, { useState} from 'react'
import {
  Star,
  Wifi,
  Coffee,
  MapPin,
  Calendar,
  Users,
  Check,
  ArrowRight,
  Menu,
  X,
  CreditCard,
  Loader2,
} from "lucide-react";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div
            className="text-2xl font-serif font-bold tracking-tighter text-slate-900 cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            Royal Crest Hotels<span className="text-amber-500">.</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 font-medium text-slate-600">
            <a href="/" className="hover:text-amber-500 transition-colors">
              Home
            </a>
            <a href="/suites" className="hover:text-amber-500 transition-colors">
              Suites
            </a>
            <a href="/contactus" className="hover:text-amber-500 transition-colors">
              Contact Us
            </a>
            <a href="/about" className="text-amber-600">
              About Us
            </a>
            <button className="bg-slate-900 text-white px-6 py-2 rounded-full hover:bg-slate-800 transition-all">
              Book Now
            </button>
          </div>
          <button
            className="md:hidden text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t p-6 space-y-4">
            <a href="#" className="block font-medium text-slate-900">
              Suites
            </a>
            <a href="#" className="block font-medium text-slate-900">
              Contact
            </a>
          </div>
        )}
      </nav>
    </div>
  );
}

export default NavBar





