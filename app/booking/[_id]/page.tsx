import { dbConnect } from "@/app/utils/dbConnect";
import RoomModel from "@/models/room";
import { Metadata } from "next";
import Image from "next/image";

type PageProps = {
  params: {
    _id: string;
  };
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ _id: string }>;
}): Promise<Metadata> => {
  const { _id } = await params;
  const room = await RoomModel.findById(_id);

  return {
    title: `Royal Crest Hotel | ${room.name} `,
    description: room.description,
    openGraph: {
      images: {
        url: room.image,
      },
    },
  };
};

const page = async ({ params }: { params: Promise<{_id: string }> }) => {
  const { _id} = await params;
  await dbConnect();
  const room = await RoomModel.findById(_id);
  return (
    <div>
      {/* this is a single product({_id})page */}

      {/* <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 w-[1550]">
        <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-5xl w-full grid md:grid-cols-2 gap-10">
          <div>
            <div className="w-full h-[500px] bg-gray-200 rounded-2xl overflow-hidden">
              <Image
                src={room.image}
                alt="Room Picture"
                width={600}
                height={600}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              ></Image>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {room.name}
            </h1>

            <p className="text-gray-500 mt-4 text-lg">
              Experience unmatched comfort with the Nike Air Max Vision, built
              with premium materials and Air cushioning for maximum support.
            </p>

            <div className="mt-6">
              <span className="text-3xl font-bold text-gray-900">
                ₦{room.price.toLocaleString()}
              </span>
            </div>

            <div className="mt-6 flex gap-4">
              <button className="px-8 py-4 bg-[#F46700] text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition">
                Add to Cart
              </button>
              <button className="px-8 py-4 border border-gray-300 rounded-xl text-lg font-semibold hover:bg-gray-100 transition">
                Wishlist
              </button>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Product Features</h2>
              <ul className="text-gray-600 space-y-2">
                <li>✔ Breathable mesh upper</li>
                <li>✔ Lightweight structure</li>
                <li>✔ Durable rubber outsole</li>
                <li>✔ Available in multiple colors</li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}

      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center p-6 font-serif selection:bg-[#C5A059]/20">
        {/* Main Container - Minimalist & Airy */}
        <div className="bg-white shadow-[0_20px_80px_rgba(0,0,0,0.05)] rounded-none p-10 max-w-6xl w-full grid md:grid-cols-2 gap-16 relative overflow-hidden border border-[#E5E1DA]">
          {/* Subtle Light Flare (Top Right) */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C5A059] opacity-[0.07] blur-[100px] pointer-events-none"></div>

          {/* Image Section - Framed with Space */}
          <div className="relative group flex items-center justify-center bg-[#FDFCFB] p-4 border border-[#F2EEE9]">
            <div className="w-full h-[600px] overflow-hidden">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
              />
            </div>
            {/* Subtle overlay that lightens on hover */}
            <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors duration-700"></div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center">
            <header className="mb-8">
              <span className="text-[#C5A059] uppercase tracking-[0.5em] text-[10px] font-sans font-bold block mb-4">
                Private Collection
              </span>
              <h1 className="text-6xl font-extralight text-[#1A1A1A] leading-[1.1] tracking-tight">
                {room.name}
              </h1>
            </header>

            <p className="text-[#706C61] text-lg leading-relaxed font-sans font-light mb-8">
              Immerse yourself in a space defined by clarity. The Horizon Suite
              features minimalist architecture that invites the morning light to
              play across hand-selected natural stone and soft silk textiles.
            </p>

            <div className="flex items-baseline gap-2 mb-10 border-b border-[#F2EEE9] pb-6">
              <span className="text-3xl font-light text-[#1A1A1A]">
                ₦{room.price.toLocaleString()}
              </span>
              <span className="text-[#C5A059] text-[10px] uppercase tracking-widest font-sans font-bold">
                / Nightly Rate
              </span>
            </div>

            {/* Luxury Action Buttons */}
            <div className="flex flex-col gap-4">
              <button className="w-full py-5 bg-[#1A1A1A] text-white uppercase tracking-[0.3em] text-xs font-medium hover:bg-[#C5A059] transition-all duration-500 shadow-lg shadow-black/5">
                Confirm Reservation
              </button>
              <button className="w-full py-5 border border-[#1A1A1A]/10 text-[#1A1A1A] uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-[#F9F8F6] transition-all">
                Explore Suite Details
              </button>
            </div>

            {/* Amenities - Clean Grid */}
            <div className="mt-12">
              <ul className="grid grid-cols-2 gap-y-5 text-[#8A8475] text-[11px] uppercase tracking-widest font-sans font-medium">
                <li className="flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-[#C5A059]/40"></span>
                  Floor-to-Ceiling Glass
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-[#C5A059]/40"></span>
                  Stone Bathing Pool
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-[#C5A059]/40"></span>
                  Morning Butler Service
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-[#C5A059]/40"></span>
                  Organic Linen Linens
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
