"use client"
import {MapPin,Users,}from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


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

export default RoomCard;