"use client"
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import LandingNav from "../components/LandingNav";
import { SendMessage } from "../utils/actions";
import toast from "react-hot-toast";


import {
  MapPin,
  Phone,
  Mail,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Menu,
  X,
} from "lucide-react";


declare global {
  interface Window {
    L: any;
  }
}














const LeafletMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const loadLeaflet = () => {
      // 1. Load CSS if not present
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      // 2. Check if Script exists
      if (document.getElementById("leaflet-script")) {
        // If script exists, wait for window.L to be ready
        const checkL = setInterval(() => {
          if (window.L) {
            initMap();
            clearInterval(checkL);
          }
        }, 100);
        return;
      }

      
      const script = document.createElement("script");
      script.id = "leaflet-script";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.async = true;
      script.onload = () => initMap(); 
      document.body.appendChild(script);
    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const initMap = () => {
    if (!mapContainerRef.current || !window.L || mapInstanceRef.current) return;

    const hotelCoords = [7.757748, 4.529033];

    // Initialize Map
    const map = window.L.map(mapContainerRef.current, {
      center: hotelCoords,
      zoom: 13,
      scrollWheelZoom: false, // Disable scroll zoom for better page UX
    });

    mapInstanceRef.current = map;

    // Add Dark/Contrast Tile Layer for luxury feel
     
    window.L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    // Custom Icon
    const customIcon = window.L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    // Add Marker & Popup
    window.L.marker(hotelCoords, { icon: customIcon })
      .addTo(map)
      .bindPopup(
        `
        <div style="font-family: serif; text-align: center; padding: 5px;">
          <b style="font-size: 16px; color: #0f172a;">Royal Crest Resort</b><br>
          <span style="color: #d97706; font-size: 14px;">★★★★★</span><br>
          <span style="color: #64748b; font-size: 12px;">Ogo-oluwa, Osogbo</span>
        </div>
      `
      )
      .openPopup();
  };

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full min-h-[450px] bg-slate-200 relative z-0"
    />
  );
};
const ContactForm=()=>{
   const [loading, setLoading] = useState(false);
   const [feedback, setFeedback] = useState<null | "success" | "error">(null);

   const [form, setForm] = useState({
     firstname: "",
     lastname: "",
     email: "",
     subject: "General Inquiry",
     message: "",
   });

   const handleChange = (
     e: React.ChangeEvent<
       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
     >,
   ) => {
     setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setLoading(true);
     setFeedback(null);

     const res = await SendMessage(form);

     setLoading(false);

     if (res?.status) {
       setFeedback("success");
       setForm({
         firstname: "",
         lastname: "",
         email: "",
         subject: "General Inquiry",
         message: "",
       });
     } else {
       setFeedback("error");
     }
   };

   return (
     <form className="space-y-6" onSubmit={handleSubmit}>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="space-y-2">
           <label className="text-sm font-medium text-slate-700">
             First Name
           </label>
           <input
             type="text"
             name="firstname"
             value={form.firstname}
             onChange={handleChange}
             placeholder="First Name"
             required
             className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
           />
         </div>

         <div className="space-y-2">
           <label className="text-sm font-medium text-slate-700">
             Last Name
           </label>
           <input
             type="text"
             name="lastname"
             value={form.lastname}
             onChange={handleChange}
             placeholder="Last Name"
             required
             className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
           />
         </div>
       </div>

       <div className="space-y-2">
         <label className="text-sm font-medium text-slate-700">
           Email Address
         </label>
         <input
           type="email"
           name="email"
           value={form.email}
           onChange={handleChange}
           placeholder="quadek@example.com"
           required
           className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
         />
       </div>

       <div className="space-y-2">
         <label className="text-sm font-medium text-slate-700">Subject</label>
         <select
           name="subject"
           value={form.subject}
           onChange={handleChange}
           className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
         >
           <option>General Inquiry</option>
           <option>Reservation Assistance</option>
           <option>Event Planning</option>
           <option>Press & Media</option>
         </select>
       </div>

       <div className="space-y-2">
         <label className="text-sm font-medium text-slate-700">Message</label>
         <textarea
           name="message"
           value={form.message}
           onChange={handleChange}
           rows={4}
           placeholder="How can we make your stay exceptional?"
           required
           className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
         />
       </div>

       <button
         disabled={loading}
         className="w-full bg-slate-900 text-white font-medium py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group disabled:opacity-60"
       >
         {loading ? "Sending..." : "Send Message"}
         <Send
           size={18}
           className="group-hover:translate-x-1 transition-transform"
         />
       </button>

       {feedback === "success" && (
         <p className="text-green-600 text-sm text-center">
           Message sent successfully ✅
         </p>
       )}

       {feedback === "error" && (
         <p className="text-red-600 text-sm text-center">
           Something went wrong ❌
         </p>
       )}
     </form>
   );

}
// const ContactForm = () => {

// const [loading, setLoading] = useState(false);
// const [form, setForm] = useState({
//   firstname: "",
//   lastname: "",
//   email: "",
//   subject: "General Inquiry",
//   message: "",
// });

// const handleChange = (
//   e: React.ChangeEvent<
//     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//   >,
// ) => {
//   setForm({ ...form, [e.target.name]: e.target.value });
// };

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setLoading(true);

//   const res = await SendMessage(form);

//   setLoading(false);

//   if (res.status) {
//     toast.success("Message sent successfully 🎉");
//     setForm({
//       firstname: "",
//       lastname: "",
//       email: "",
//       subject: "General Inquiry",
//       message: "",
//     });
//   } else {
//     toast.error(res.message);
//   }
// };

// return (
//   <form className="space-y-6" onSubmit={handleSubmit}>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <input
//         name="firstname"
//         value={form.firstname}
//         onChange={handleChange}
//         placeholder="First Name"
//         className="input"
//         required
//       />
//       <input
//         name="lastname"
//         value={form.lastname}
//         onChange={handleChange}
//         placeholder="Last Name"
//         className="input"
//         required
//       />
//     </div>

//     <input
//       type="email"
//       name="email"
//       value={form.email}
//       onChange={handleChange}
//       placeholder="quadek@example.com"
//       className="input"
//       required
//     />

//     <select
//       name="subject"
//       value={form.subject}
//       onChange={handleChange}
//       className="input"
//     >
//       <option>General Inquiry</option>
//       <option>Reservation Assistance</option>
//       <option>Event Planning</option>
//       <option>Press & Media</option>
//     </select>

//     <textarea
//       name="message"
//       value={form.message}
//       onChange={handleChange}
//       rows={4}
//       placeholder="How can we make your stay exceptional?"
//       className="input"
//       required
//     />

//     <button
//       disabled={loading}
//       className="w-full bg-slate-900 text-white py-4 rounded-xl"
//     >
//       {loading ? "Sending..." : "Send Message"}
//     </button>
//   </form>
// );

  




//   // return (
//   //   <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
//   //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//   //       <div className="space-y-2">
//   //         <label className="text-sm font-medium text-slate-700">
//   //           First Name
//   //         </label>
//   //         <input
//   //           type="text"
//   //           placeholder="First Name"
//   //           className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
//   //         />
//   //       </div>
//   //       <div className="space-y-2">
//   //         <label className="text-sm font-medium text-slate-700">
//   //           Last Name
//   //         </label>
//   //         <input
//   //           type="text"
//   //           placeholder="Last Name"
//   //           className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
//   //         />
//   //       </div>
//   //     </div>

//   //     <div className="space-y-2">
//   //       <label className="text-sm font-medium text-slate-700">
//   //         Email Address
//   //       </label>
//   //       <input
//   //         type="email"
//   //         placeholder="quadek@example.com"
//   //         className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
//   //       />
//   //     </div>

//   //     <div className="space-y-2">
//   //       <label className="text-sm font-medium text-slate-700">Subject</label>
//   //       <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all">
//   //         <option>General Inquiry</option>
//   //         <option>Reservation Assistance</option>
//   //         <option>Event Planning</option>
//   //         <option>Press & Media</option>
//   //       </select>
//   //     </div>

//   //     <div className="space-y-2">
//   //       <label className="text-sm font-medium text-slate-700">Message</label>
//   //       <textarea
//   //         rows={4}
//   //         placeholder="How can we make your stay exceptional?"
//   //         className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
//   //       />
//   //     </div>

//   //     <button className="w-full bg-slate-900 text-white font-medium py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
//   //       Send Message
//   //       <Send
//   //         size={18}
//   //         className="group-hover:translate-x-1 transition-transform"
//   //       />
//   //     </button>
//   //   </form>
//   // );
// };
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-100 selection:text-amber-900 pt-20">
     <LandingNav/>
      <div className="bg-slate-900 text-white py-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-500 font-medium tracking-widest uppercase text-sm">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mt-4 mb-6">
              We're Here for You
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
              Whether you're planning a romantic getaway or a corporate retreat,
              our dedicated concierge team is ready to assist with every detail.
            </p>
          </motion.div>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl px-4 md:px-6 -mt-10 mb-20 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
          {/* Left: Contact Form */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">
              Send us a Message
            </h2>
            <ContactForm />

            {/* Social Links */}
            <div className="mt-12 flex items-center gap-6 text-slate-400">
              <span className="text-xs uppercase tracking-widest font-medium">
                Follow Us
              </span>
              <div className="h-px w-10 bg-slate-200"></div>
              <a href="#" className="hover:text-amber-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Right: Map & Info */}
          <div className="w-full lg:w-1/2 relative bg-slate-100">
            {/* Map Component Container */}
            <div className="absolute inset-0 z-0">
              <LeafletMap />
            </div>

            {/* Floating Info Card */}
            <div className="absolute bottom-6 left-6 right-6 md:left-12 md:right-auto md:w-80 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-100 z-10">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-50 rounded-lg text-amber-600 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Visit Us</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mt-1">
                      Opposite Jaiz bank, <br />
                      ogo-oluwa, Osogbo
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-50 rounded-lg text-amber-600 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Call Us</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      +234 703 313 7268
                    </p>
                    <p className="text-xs text-slate-400">Mon-Sun, 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-50 rounded-lg text-amber-600 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Email Us</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      quadek@royalcrest.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Footer/>
    </div>
  );
}
