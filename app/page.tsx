import LandingNav from "./components/LandingNav";
import Footer from "./components/Footer";
import { fetchroom } from "./utils/actions";
import Hero from "./components/Hero";
import RoomCard from "./components/RoomCard";
import PaymentModal from "./components/PaymentModal";
import Dining from "./components/Dining";
import Accommodation from "./components/Accommodation";

const ROOMS = await fetchroom();
export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-100 selection:text-amber-900">
      <LandingNav />
      <Hero />
      <section id="suites" className="py-24 px-6 max-w-7xl mx-auto">
        <Accommodation />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROOMS.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>
      <Dining />
      <Footer />
    </div>
  );
}
