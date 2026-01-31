import LandingNav from "./components/LandingNav"
import Footer from "./components/Footer";
import { fetchroom } from "./utils/actions";
import Hero from "./components/Hero";
import RoomCard from "./components/RoomCard";
import PaymentModal from "./components/PaymentModal";
import Dining from "./components/Dining";


  const ROOMS = await fetchroom();
export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-100 selection:text-amber-900">
      <LandingNav/>
      <Hero/>
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
            <RoomCard key={room.id} room={room}/>
          ))}
        </div>
      </section>
      <Dining />
      <Footer />
    </div>
  );
}
