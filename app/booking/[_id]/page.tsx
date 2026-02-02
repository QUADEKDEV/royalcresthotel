import { dbConnect } from "@/app/utils/dbConnect";
import RoomModel from "@/models/room";
import { Metadata } from "next";
import Image from "next/image";
import {Calendar} from "lucide-react";
import BookingDates from "@/app/components/Bookingdate";
import { createHistory } from "@/app/utils/actions";



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

const page = async ({ params }: { params: Promise<{ _id: string }> }) => {
  const { _id } = await params;
  await dbConnect();
  const room = await RoomModel.findById(_id);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 w-screen selection:bg-amber-100">
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-5xl w-full grid md:grid-cols-2 gap-10">
        <div>
          <div className="w-full h-[500px] bg-gray-200 rounded-2xl overflow-hidden">
            <img
              src={room.image}
              alt={room.name}
              width={600}
              height={600}
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            ></img>
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
            <span className="text-2xl font-bold text-gray-900">
              ₦{room.price.toLocaleString()}
            </span>
          </div>
          <BookingDates roomId={room._id.toString()} price={room.price}/>
        </div>
      </div>
    </div>
  );
};

export default page;
