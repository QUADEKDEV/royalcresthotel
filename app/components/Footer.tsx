import { div } from 'framer-motion/client';
import React from 'react'

const Footer = () => {
  return (
    <div className="bg-white py-12 px-6 border-t border-slate-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-2xl font-serif font-bold text-slate-900">
                    Royal Crest Hotel<span className="text-amber-500">.</span>
                  </div>
                  <p className="text-slate-500 text-sm">
                    © 2025 Royal Crest Hotels & Resorts. All rights reserved.
                  </p>
                  <div className="flex gap-6 text-slate-400">
                    <a href="#" className="hover:text-slate-900">
                      Privacy
                    </a>
                    <a href="#" className="hover:text-slate-900">
                      Terms
                    </a>
                  </div>
                </div>
    </div>
  );
}

export default Footer
