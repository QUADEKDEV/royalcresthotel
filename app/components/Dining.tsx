import { Star, Coffee } from "lucide-react";

const Dining = () => {
  return (
    <div>
      <section className="bg-slate-900 text-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">
              Dining
            </span>
            <h2 className="text-4xl font-serif font-bold mt-3 mb-6">
              The Taste of Elegance
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              From our rooftop lounge to the garden bistro, our culinary team
              uses only the freshest local ingredients to craft dishes that are
              as visually stunning as they are delicious.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Coffee className="text-amber-400" />
                <span>24/7 Room Service</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="text-amber-400" />
                <span>Michelin Chefs</span>
              </div>
            </div>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
              alt="Dining"
              className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dining;
