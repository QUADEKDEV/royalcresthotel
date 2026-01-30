"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { logout,addRoom } from "../utils/actions";
import {
  LayoutDashboard,
  Plus,
  BedDouble,
  Tag,
  Maximize,
  Users,
  Image as ImageIcon,
  Save,
  Trash2,
  X,
  Search,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Menu,
  LogOut,
  Camera,
} from "lucide-react";
import toast from "react-hot-toast";

// Mock initial data
const initialRooms = [
  {
    id: 1,
    name: "Royal Ocean Penthouse",
    price: 1250,
    category: "Signature",
    status: "Available",
    guests: 4,
  },
];

export default function AdminDashboard() {
  const [rooms, setRooms] = useState(initialRooms);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: "",
    price: "",
    description: "",
    capacity: "",
    size: "",
    image: "",
    roomNumber: "",
    category: "",
    amenities: [],
  });

  const handleLogout = async () => {
    const response = await logout();
    if (!response) {
      toast.error("Something went wrong");
    }
    toast.success(response.message);
    window.location.href = "/login";
  };

  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await addRoom(newRoom);

    if (response?.status == false) {
      toast.error(response?.message || "error");
      return;
    }
    toast.success(response?.message || "success");

    setIsModalOpen(false);
  };

  const deleteRoom = (id: number) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between mb-12">
        <div className="text-xl font-serif font-bold tracking-widest text-white">
          Royal Crest<span className="text-amber-500">.</span>
        </div>
        <button
          className="lg:hidden text-white"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X size={24} />
        </button>
      </div>

      <nav className="space-y-2 flex-1">
        <a
          href="#"
          className="flex items-center gap-3 bg-amber-500 text-white p-3 rounded-xl transition-all"
        >
          <LayoutDashboard size={20} />{" "}
          <span className="font-medium">Dashboard</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 text-slate-400 p-3 rounded-xl hover:bg-white/5 transition-all"
        >
          <BedDouble size={20} />{" "}
          <span className="font-medium">Manage Rooms</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 text-slate-400 p-3 rounded-xl hover:bg-white/5 transition-all"
        >
          <Users size={20} /> <span className="font-medium">Guests</span>
        </a>
      </nav>

      <div className="mt-auto p-4 bg-white/5 rounded-2xl border border-white/10">
        <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-bold">
          Admin Account
        </p>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-white">Alexander Vance</p>
          <LogOut
            onClick={handleLogout}
            size={14}
            className="text-slate-500 cursor-pointer hover:text-white"
          />
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-slate-900 flex-col p-6 fixed h-full z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[50] lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-slate-900 p-6 z-[60] flex flex-col lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-8 md:p-12 transition-all duration-300">
        {/* Mobile Header Toggle */}
        <div className="flex lg:hidden items-center justify-between mb-8">
          <div className="text-lg font-serif font-bold tracking-widest text-slate-900">
            Royal Crest<span className="text-amber-500">.</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-white rounded-xl shadow-sm border border-slate-100"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Property Overview
            </h1>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Manage your luxury inventory and daily operations.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 md:py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 w-full md:w-auto"
          >
            <Plus size={20} /> Add New Suite
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {[
            {
              label: "Total Revenue",
              value: "$42,850",
              icon: <TrendingUp className="text-emerald-500" />,
              trend: "+12%",
            },
            {
              label: "Occupancy Rate",
              value: "84%",
              icon: <CheckCircle2 className="text-blue-500" />,
              trend: "+5%",
            },
            {
              label: "Pending Requests",
              value: "12",
              icon: <AlertCircle className="text-amber-500" />,
              trend: "Active",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`bg-white p-6 rounded-3xl border border-slate-100 shadow-sm ${i === 2 ? "sm:col-span-2 xl:col-span-1" : ""}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-50 rounded-2xl">{stat.icon}</div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                  {stat.trend}
                </span>
              </div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold mt-1">
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Inventory List */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-serif font-bold text-xl">Current Inventory</h2>
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-2.5 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search rooms..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] uppercase tracking-widest font-bold text-slate-400">
                  <th className="px-6 py-4">Suite Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Nightly Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rooms.map((room) => (
                  <tr
                    key={room.id}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 flex-shrink-0">
                          <BedDouble size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">
                            {room.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {room.guests} Guests Max
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg uppercase tracking-wider">
                        {room.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-slate-700">
                      ₦{room.price}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${room.status === "Available" ? "bg-emerald-500" : "bg-slate-300"}`}
                        />
                        <span className="text-xs font-medium text-slate-600">
                          {room.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => deleteRoom(room.id)}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Table Footer Helper */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center lg:hidden">
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
              Swipe left to view full table details
            </p>
          </div>
        </section>
      </main>

      {/* Add Room Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto"
            >
              <div className="flex justify-between items-center p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-xl sm:text-2xl font-serif font-bold">
                  New Room Specification
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white rounded-full transition-colors"
                >
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <form
                onSubmit={handleAddRoom}
                className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[80vh] overflow-y-auto md:overflow-visible"
              >
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                    Room Name
                  </label>
                  <div className="relative">
                    <BedDouble
                      className="absolute left-4 top-3.5 text-slate-300"
                      size={18}
                    />
                    <input
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 text-sm sm:text-base"
                      placeholder="e.g. Presidential Horizon Suite"
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, name: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                    Description
                  </label>
                  <div className="relative">
                    <BedDouble
                      className="absolute left-4 top-3.5 text-slate-300"
                      size={18}
                    />
                    <input
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 text-sm sm:text-base"
                      placeholder="e.g. Designed for royalty"
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, description: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                    Nightly Rate (NGN)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-slate-300">
                      ₦
                    </span>
                    <input
                      type="number"
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 text-sm sm:text-base"
                      placeholder="0.00"
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, price: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                    Category
                  </label>
                  <div className="relative">
                    <Tag
                      className="absolute left-4 top-3.5 text-slate-300"
                      size={18}
                    />
                    <select
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-amber-500/20 appearance-none text-sm sm:text-base"
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, category: e.target.value })
                      }
                    >
                      <option>Classic</option>
                      <option>Signature</option>
                      <option>Wellness</option>
                      <option>Penthouse</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                    Max Guests
                  </label>
                  <div className="relative">
                    <Users
                      className="absolute left-4 top-3.5 text-slate-300"
                      size={18}
                    />
                    <input
                      type="number"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 text-sm sm:text-base"
                      defaultValue="2"
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, capacity: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                    Size (m²)
                  </label>
                  <div className="relative">
                    <Maximize
                      className="absolute left-4 top-3.5 text-slate-300"
                      size={18}
                    />
                    <input
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 text-sm sm:text-base"
                      placeholder="e.g. 120"
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, size: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                    Room Number
                  </label>
                  <div className="relative">
                    <Users
                      className="absolute left-4 top-3.5 text-slate-300"
                      size={18}
                    />
                    <input
                      type="number"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 text-sm sm:text-base"
                      placeholder="e.g. 2"
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, roomNumber: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                    Image
                  </label>
                  <div className="relative">
                    <Camera
                      className="absolute left-4 top-3.5 text-slate-300"
                      size={18}
                    />
                    <input
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 text-sm sm:text-base"
                      placeholder="image link"
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, image: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                    Amenities
                  </label>
                  <div className="relative">
                    <Maximize
                      className="absolute left-4 top-3.5 text-slate-300"
                      size={18}
                    />
                    <input
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 text-sm sm:text-base"
                      placeholder="e.g. 120"
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, amenities: e.target.value })
                      }
                    />
                  </div>
                </div> */}

                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
                  >
                    <Save size={20} /> Save to Collection
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
