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
    title: `Royal Crest Hotels | ${room.name} `,
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

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 w-[1550]">
        <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-5xl w-full grid md:grid-cols-2 gap-10">
       
          <div>
            <div className="w-full h-[500px] bg-gray-200 rounded-2xl overflow-hidden">
              <Image
                src={room.image}
                alt="Product"
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
                ${room.price}
              </span>
              <span className="line-through text-gray-400 ml-3">
                ${(Number(room.price) + 20).toFixed(2)}
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
      </div>
    </div>
  );
};

export default page;
