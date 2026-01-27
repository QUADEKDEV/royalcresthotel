"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Maximize,
  BedDouble,
  Wifi,
  Waves,
  Wind,
  Coffee,
  ArrowRight,
  Filter,
  Star,
  ChevronRight,
} from "lucide-react";

const suites = [
  {
    id: 1,
    name: "Royal Ocean Penthouse",
    category: "Signature",
    price: 1250,
    size: "185 m²",
    guests: "2-4 Adults",
    beds: "1 King, 1 Sofa",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Private Infinity Pool",
      "24/7 Butler Service",
      "Panoramic View",
    ],
    tag: "Most Popular",
  },
  {
    id: 2,
    name: "Azure Garden Suite",
    category: "Classic",
    price: 750,
    size: "95 m²",
    guests: "2 Adults",
    beds: "1 King Bed",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
    features: ["Private Garden", "Outdoor Rainfall Shower", "Wine Cellar"],
    tag: null,
  },
  {
    id: 3,
    name: "Luminary Duplex",
    category: "Signature",
    price: 2100,
    size: "320 m²",
    guests: "4-6 Adults",
    beds: "2 King, 2 Queen",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
    features: ["Private Terrace", "In-Suite Cinema", "Chef on Request"],
    tag: "Exclusive",
  },
  {
    id: 4,
    name: "Sanctuary Spa Villa",
    category: "Wellness",
    price: 980,
    size: "120 m²",
    guests: "2 Adults",
    beds: "1 California King",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop",
    features: ["Private Sauna", "Yoga Deck", "Organic Mini Bar"],
    tag: "New Arrival",
  },
];

export default function SuitesPage() {
  const [filter, setFilter] = useState("All");

  const filteredSuites =
    filter === "All" ? suites : suites.filter((s) => s.category === filter);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Suites Background"
          />
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-amber-400 font-medium tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            The Art of Living
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight"
          >
            Suites & Residences
          </motion.h1>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
            {["All", "Signature", "Classic", "Wellness"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  filter === cat
                    ? "bg-slate-900 text-white shadow-lg"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Filter size={14} /> Compare All
            </span>
            <span className="flex items-center gap-2 text-amber-600 font-medium cursor-pointer hover:underline underline-offset-4">
              Best Rate Guarantee
            </span>
          </div>
        </div>
      </section>

      {/* Suites Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredSuites.map((suite, index) => (
              <motion.div
                key={suite.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl shadow-slate-200 mb-8">
                  <img
                    src={suite.image}
                    alt={suite.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Overlay Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {suite.tag && (
                      <span className="bg-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                        {suite.tag}
                      </span>
                    )}
                    <span className="bg-white/90 backdrop-blur text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                      {suite.category}
                    </span>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-0 right-0 p-8">
                    <div className="bg-slate-900/80 backdrop-blur-xl text-white p-6 rounded-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">
                        Starting from
                      </p>
                      <p className="text-2xl font-serif font-bold text-amber-400">
                        ${suite.price}
                        <span className="text-sm text-white font-sans font-normal">
                          {" "}
                          /night
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Container */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                  <div className="flex-1">
                    <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4 group-hover:text-amber-600 transition-colors">
                      {suite.name}
                    </h3>

                    {/* Quick Specs */}
                    <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm mb-6">
                      <span className="flex items-center gap-2">
                        <Maximize size={16} /> {suite.size}
                      </span>
                      <span className="flex items-center gap-2">
                        <Users size={16} /> {suite.guests}
                      </span>
                      <span className="flex items-center gap-2">
                        <BedDouble size={16} /> {suite.beds}
                      </span>
                    </div>

                    {/* Amenities Icons */}
                    <div className="flex items-center gap-4 text-slate-300">
                      <Wifi size={18} />
                      <Waves size={18} />
                      <Wind size={18} />
                      <Coffee size={18} />
                      <div className="w-px h-4 bg-slate-200 mx-2" />
                      <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
                        +12 More
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <button className="flex items-center gap-2 text-slate-900 font-bold border-b-2 border-slate-900 pb-1 hover:text-amber-600 hover:border-amber-600 transition-all uppercase tracking-widest text-xs">
                      View Details <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Comparison Preview / CTA */}
      <section className="bg-slate-900 text-white py-24 px-6 overflow-hidden relative">
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <Star
            className="text-amber-500 mx-auto mb-8"
            size={40}
            fill="currentColor"
          />
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
            Bespoke Guest Experience
          </h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            All our residences include complimentary airport transfers, daily
            breakfast in our signature restaurant, and a dedicated curator to
            design your itinerary.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-10 py-5 bg-amber-500 text-white rounded-full font-bold hover:bg-amber-600 transition-all flex items-center justify-center gap-3 group">
              Book Your Suite{" "}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold hover:bg-white/20 transition-all">
              Compare All Rooms
            </button>
          </div>
        </div>

        {/* Background Decals */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* Trust Footer */}
      <footer className="py-16 border-t border-slate-200">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-2xl font-serif font-bold text-slate-900">
              4.9/5
            </p>
            <p className="text-xs uppercase tracking-widest text-slate-400 mt-2">
              Guest Rating
            </p>
          </div>
          <div>
            <p className="text-2xl font-serif font-bold text-slate-900">24/7</p>
            <p className="text-xs uppercase tracking-widest text-slate-400 mt-2">
              Butler Support
            </p>
          </div>
          <div>
            <p className="text-2xl font-serif font-bold text-slate-900">100%</p>
            <p className="text-xs uppercase tracking-widest text-slate-400 mt-2">
              Organic Linens
            </p>
          </div>
          <div>
            <p className="text-2xl font-serif font-bold text-slate-900">Free</p>
            <p className="text-xs uppercase tracking-widest text-slate-400 mt-2">
              Cancellations
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
