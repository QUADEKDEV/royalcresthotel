import React, { useState} from "react";
// import NavBar from "./components/NavBar";
import LandingNav from "./components/LandingNav"
import Footer from "./components/Footer";
import { fetchroom } from "./utils/actions";
import Hero from "./components/Hero";
import RoomCard from "./components/RoomCard";
import PaymentModal from "./components/PaymentModal";

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

//  const ROOMS = await fetchroom();
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
      <LandingNav onOpenBooking={handleScrollToRooms}/>
      {/* <Navbar onOpenBooking={handleScrollToRooms} /> */}
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
      <Footer />
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
