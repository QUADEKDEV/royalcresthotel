"use client"
import {ArrowRight,} from "lucide-react";
import { motion} from "framer-motion";

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
          alt="Hotel Hero"
          className="w-full h-full object-cover brightness-[0.6]"
        />
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="uppercase tracking-[0.3em] text-sm font-medium text-amber-400 mb-4 block">
            Welcome to Paradise
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Redefining Luxury <br /> & Comfort
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 font-light max-w-2xl mx-auto">
            Experience an unforgettable stay at Royal Crest, where modern
            elegance meets timeless nature.
          </p>
          <button
            // onClick={onExplore}
            className="group bg-amber-500 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-amber-600 transition-all flex items-center gap-2 mx-auto"
          >
            Explore Suites{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
