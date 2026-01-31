"use client"
import React, { useState} from "react";
// import NavBar from "./components/NavBar";
import LandingNav from "./components/LandingNav"
import Footer from "./components/Footer";
import { fetchroom } from "./utils/actions";
import Hero from "./components/Hero";
import RoomCard from "./components/RoomCard";
import PaymentModal from "./components/PaymentModal";
import {AnimatePresence } from "framer-motion";
import Dining from "./components/Dining";
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
