"use client"
import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

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
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  capacity: number;
  size: string;
  amenities: string[];
}

// --- Mock Data ---
const ROOMS: Room[] = [
  {
    id: "1",
    name: "The Royal Ocean Suite",
    description:
      "Experience unparalleled luxury with panoramic ocean views, a private infinity pool, and dedicated butler service.",
    price: 150000,
    capacity: 2,
    size: "85m²",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Ocean View", "Private Pool", "Butler Service", "King Bed"],
  },
  {
    id: "2",
    name: "Executive Garden Villa",
    description:
      "Nestled in our tropical gardens, this villa offers tranquility, an outdoor rain shower, and spacious living areas.",
    price: 85000,
    capacity: 4,
    size: "120m²",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop",
    amenities: ["Garden View", "Rain Shower", "Living Room", "2 Queen Beds"],
  },
  {
    id: "3",
    name: "Skyline Penthouse",
    description:
      "Perched on the top floor, enjoy the city lights from your jacuzzi. Modern design meets ultimate comfort.",
    price: 200000,
    capacity: 2,
    size: "95m²",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
    amenities: ["City View", "Jacuzzi", "Smart Home", "King Bed"],
  },
  
];

// --- Components ---
const Navbar = ({ onOpenBooking }: { onOpenBooking: () => void }) => {
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
          <a href="#" className="hover:text-amber-500 transition-colors">
            Suites
          </a>
          <a href="#" className="hover:text-amber-500 transition-colors">
            Dining
          </a>
          <a href="#" className="hover:text-amber-500 transition-colors">
            Experiences
          </a>
     
          <button
            className={`px-6 py-2 rounded-full transition-all ${
              scrolled
                ? "bg-slate-900 text-white hover:bg-slate-800"
                : "bg-white text-slate-900 hover:bg-slate-100"
            }`}
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
              <a href="#">Suites</a>
              <a href="#">Dining</a>
              <a href="#">Experiences</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onExplore }: { onExplore: () => void }) => {
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
            onClick={onExplore}
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

const RoomCard = ({
  room,
  onBook,
}: {
  room: Room;
  onBook: (r: Room) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-amber-600 uppercase tracking-wider">
          Premium
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-serif text-slate-900 mb-1">
              {room.name}
            </h3>
            <div className="flex items-center text-slate-500 text-sm gap-4">
              <span className="flex items-center gap-1">
                <Users size={14} /> {room.capacity} Guests
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {room.size}
              </span>
            </div>
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2">
          {room.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {room.amenities.map((am, i) => (
            <span
              key={i}
              className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full"
            >
              {am}
            </span>
          ))}
        </div>

        <div className="flex items-end justify-between border-t pt-6 border-slate-100">
          <div>
            <p className="text-slate-400 text-xs mb-1 uppercase tracking-wider">
              Price per night
            </p>
            <p className="text-3xl font-bold text-slate-900">
              ₦{room.price.toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => onBook(room)}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Payment Modal (Simulated Paystack) ---
const PaymentModal = ({
  room,
  isOpen,
  onClose,
}: {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState<"details" | "processing" | "success">(
    "details"
  );
  const [email, setEmail] = useState("");

  // Reset state when opening
  useEffect(() => {
    if (isOpen) setStep("details");
  }, [isOpen]);


const payWithPaystack=async()=> {
    const handler = (window as any).PaystackPop.setup({
      key: "pk_test_xxxxx"
      ,
      email: "customer@email.com",
      amount: 500000,
      currency: "NGN",
      callback: function (response: any) {
        alert("Payment successful: " + response.reference);
      },
    });

    handler.openIframe();
  };



  const handlePay = () => {
    payWithPaystack()
    // if (!email) return;
    // setStep("processing");

    // // Simulate API Call to GraphQL -> Paystack
    // setTimeout(() => {
    //   setStep("success");
    // }, 2500);
  };

  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden z-10"
      >
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
          <h3 className="font-serif text-xl">
            {step === "success" ? "Booking Confirmed" : "Complete Booking"}
          </h3>
          <button
            onClick={onClose}
            className="hover:text-amber-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          {step === "details" && (
            <div className="space-y-6">
              <div className="flex gap-4">
                <img
                  src={room.image}
                  alt=""
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{room.name}</h4>
                  <p className="text-amber-600 font-bold mt-1">
                    ₦{room.price.toLocaleString()}{" "}
                    <span className="text-slate-400 font-normal text-sm">
                      /night
                    </span>
                  </p>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-2">
                    <Check size={12} className="text-green-500" /> Instant
                    Confirmation
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Check-in
                    </label>
                    <div className="relative">
                      <Calendar
                        size={16}
                        className="absolute left-3 top-3.5 text-slate-400"
                      />
                      <input
                        type="text"
                        value="Oct 24, 2025"
                        readOnly
                        className="w-full pl-10 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Check-out
                    </label>
                    <div className="relative">
                      <Calendar
                        size={16}
                        className="absolute left-3 top-3.5 text-slate-400"
                      />
                      <input
                        type="text"
                        value="Oct 26, 2025"
                        readOnly
                        className="w-full pl-10 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-500">Total (2 nights)</p>
                  <p className="text-xl font-bold text-slate-900">
                    ₦{(room.price * 2).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={handlePay}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  Pay Securely <CreditCard size={18} />
                </button>
              </div>
            </div>
          )}

          {step === "processing" && (
            <div className="py-10 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-6" />
              <h4 className="text-xl font-bold text-slate-900 mb-2">
                Processing Payment
              </h4>
              <p className="text-slate-500 text-sm">
                Please wait while we connect to Paystack...
              </p>
            </div>
          )}

          {step === "success" && (
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">
                You're All Set!
              </h4>
              <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">
                Your booking for <strong>{room.name}</strong> has been
                confirmed. A receipt has been sent to {email}.
              </p>
              <button
                onClick={onClose}
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-slate-800"
              >
                Close Receipt
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBook = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleScrollToRooms = () => {
    const el = document.getElementById("suites");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-100 selection:text-amber-900">
      <Navbar onOpenBooking={handleScrollToRooms} />

      <Hero onExplore={handleScrollToRooms} />

      <section id="suites" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-medium tracking-widest uppercase text-sm">
            Accommodation
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-3 mb-6">
            Curated for Comfort
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light">
            Each suite is designed with a unique philosophy in mind, ensuring a
            stay that resonates with your personal style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROOMS.map((room) => (
            <RoomCard key={room.id} room={room} onBook={handleBook} />
          ))}
        </div>
      </section>

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
<Footer/>
     
      {/* Logic Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <PaymentModal
            room={selectedRoom}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
