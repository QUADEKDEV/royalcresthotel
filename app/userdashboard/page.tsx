"use client";
import React, { useState ,useEffect} from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "../utils/actions";
import { getUserDashboardData } from "../utils/actions";


import {
  Home,
  Calendar,
  Compass,
  Heart,
  User,
  LogOut,
  Search,
  MapPin,
  Star,
  Clock,
  CreditCard,
  ChevronRight,
  Menu,
  X,
  Bell,
} from "lucide-react";

// Mock data for the user experience
const upcomingBookings = [
  {
    id: 1,
    property: "Royalcrest Night",
    room: "Royal Ocean Penthouse",
    dates: "Mar 12 -Mar 18",
    status: "Upcoming",
    img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop",
  },

  {
    id: 2,
    property: "Mufasa Monday",
    room: "Zen Garden Suite",
    dates: "Feb 02 ",
    status: "Upcoming",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=200",
  },
];

export default function UserDashboard() {


const [user, setUser] = useState<null | {
  firstname: string;
  lastname: string;
  email: string;
}>(null);

const [history, setHistory] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchData = async () => {
    const data = await getUserDashboardData();
    if (data) {
      setUser(data.user);
      setHistory(data.history);
    }
    setLoading(false);
  };

  fetchData();
}, []);





  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

   const handleLogout = async () => {
      const response = await logout();
      if (!response) {
        toast.error("Something went wrong");
      }
      toast.success(response.message);
      window.location.href = "/login";
    };

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between mb-12">
        <div className="text-xl font-serif font-bold tracking-widest text-slate-900">
          Royal Crest<span className="text-amber-500">.</span>
        </div>
        <button
          className="lg:hidden text-slate-900"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X size={24} />
        </button>
      </div>

      <nav className="space-y-2 flex-1">
        {[
          { name: "Overview", icon: <Home size={20} /> },
          { name: "Reservations", icon: <Calendar size={20} /> },
          { name: "Explore", icon: <Compass size={20} /> },
          { name: "Favorites", icon: <Heart size={20} /> },
          // { name: "Membership", icon: <Star size={20} /> },
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => {
              setActiveTab(item.name);
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
              activeTab === item.name
                ? "bg-amber-500 text-white shadow-lg shadow-amber-200"
                : "text-slate-400 hover:bg-slate-50"
            }`}
          >
            {item.icon} <span className="font-medium text-sm">{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold">
            {user?.firstname?.[0]}
            {user?.lastname?.[0]}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-slate-900 truncate">
              {user?.firstname} {user?.lastname}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-amber-600 font-bold">
              Gold Member
            </p>
          </div>
          <LogOut
            onClick={handleLogout}
            size={16}
            className="text-slate-300 cursor-pointer hover:text-slate-900"
          />
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex font-sans text-slate-900">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 bg-white flex-col p-8 border-r border-slate-100 fixed h-full z-40">
        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[50] lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white p-8 z-[60] flex flex-col lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 p-6 sm:p-10 transition-all duration-300">
        {/* Top Navbar */}
        <header className="flex items-center justify-between mb-12">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 bg-white rounded-xl shadow-sm border border-slate-100"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border-2 border-[#FDFBF7]" />
            </button>
            <div className="h-10 w-px bg-slate-200 mx-2 hidden sm:block" />
            <div className="hidden sm:block text-right">
              <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
                Royal crest bonus
              </p>
              <p className="text-sm font-bold text-slate-900"> ₦5,000</p>
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                Welcome back, {user?.firstname}
              </h1>
              <p className="text-slate-500 mt-2 flex items-center gap-2">
                <MapPin size={16} /> Currently browsing.
              </p>
            </div>
          </motion.div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* Main Feed */}
          <div className="xl:col-span-2 space-y-12">
            {/* Upcoming Stays */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-bold">New packages</h2>
                <button className="text-sm font-bold text-amber-600 hover:text-amber-700">
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {upcomingBookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    whileHover={{ y: -5 }}
                    className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm group cursor-pointer"
                  >
                    <div className="relative h-40 w-full overflow-hidden rounded-2xl mb-4">
                      <img
                        src={booking.img}
                        alt={booking.property}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-sm">
                        {booking.status}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg">{booking.property}</h3>
                    <p className="text-sm text-slate-500">{booking.room}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                        <Calendar size={14} /> {booking.dates}
                      </div>
                      <ChevronRight
                        size={18}
                        className="text-slate-300 group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Loyalty Progress */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-amber-500 rounded-full blur-[100px] opacity-20" />
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h2 className="text-2xl font-serif font-bold mb-2">
                    Royal Crest Bonus
                  </h2>
                  <p className="text-slate-400 text-sm mb-6">
                    4 more nights to go, enjoy up to 25% percent bonus on your
                    stay.
                  </p>
                  <div className="w-full bg-white/10 h-2 rounded-full mb-2">
                    <div className="bg-amber-500 h-full rounded-full w-[75%]" />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <span>11 Nights</span>
                    <span className="text-amber-500">15 Nights Target</span>
                  </div>
                </div>
                <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors whitespace-nowrap">
                  View Benefits
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Panel */}
          <div className="space-y-8">
            {/* Past Experiences */}

            {loading && <p className="text-sm text-slate-400">Loading...</p>}

            {!loading && history.length === 0 && (
              <p className="text-sm text-slate-400">No history yet</p>
            )}

            {history.map((item, i) => (
              <div key={i} className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {item.subject}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">
                    {new Date(item.createdAt).toDateString()}
                  </p>
                </div>

                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={10} fill="currentColor" />
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-lg font-serif font-bold mb-6">
                Recent Stays
              </h2>
              <div className="space-y-6">
                {[
                  { name: "Lumina Paris", date: "August 2023", rating: 5 },
                  { name: "Lumina London", date: "June 2023", rating: 5 },
                ].map((stay, i) => (
                  <div key={i} className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {stay.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">
                        {stay.date}
                      </p>
                    </div>
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(stay.rating)].map((_, j) => (
                        <Star key={j} size={10} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                Download History
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
