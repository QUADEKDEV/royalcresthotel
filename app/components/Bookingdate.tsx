"use client";
import { useState, useEffect } from "react";
import { createHistory } from "../utils/actions";
import toast from "react-hot-toast";

export default function BookingDates({ roomId, price }: { roomId: string; price: number }) {
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [days, setDays] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
  if (days.length > 0) {
    setTotalPrice(days.length * price);
  } else {
    setTotalPrice(0);
  }
}, [days, price]);



  type PageProps = {
    params: {
      _id: string;
    };
  };

  // const handleBooking = async (bookingData: {
  //   roomId: string;
  //   days: string[];
  //   email: string;
  // }) => {
  //   let historyData = {
  //     roomId: bookingData.roomId,
  //     days: bookingData.days,
  //     email: bookingData.email,
  //   };
  //   let result = await createHistory(historyData);
  //   if (!result.success) {
  //     toast.error("somethig went wrong");
  //   }
  //   toast.success("Success");
  // };

  const handleBooking = async () => {
    if (days.length === 0) {
      toast.error("Please select booking dates");
      return;
    }

    const result = await createHistory({
      roomId,
      days,
    });

    if (!result.success) {
      toast.error(result.message || "Something went wrong");
      return;
    }

    toast.success("Room reserved successfully");
  };

  const today = new Date().toISOString().split("T")[0];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (!checkIn || !checkOut) return;

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const now = new Date(today);

    if (start < now) {
      alert("Check-in date cannot be earlier than today");
      setCheckIn("");
      setDays([]);
      return;
    }

    if (start > end) {
      alert("Check-in date cannot be greater than check-out date");
      setCheckOut("");
      setDays([]);
      return;
    }

    const dates: string[] = [];
    let current = new Date(start);

    while (current <= end) {
      dates.push(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }

    setDays(dates);
  }, [checkIn, checkOut, today]);

  return (
    <div className="space-y-4">
      <input
        type="date"
        value={checkIn}
        min={today}
        onChange={(e) => setCheckIn(e.target.value)}
        className="border p-2"
      />

      <input
        type="date"
        value={checkOut}
        min={checkIn || today}
        onChange={(e) => setCheckOut(e.target.value)}
        className="border p-2"
      />
      {days.length > 0 && (
        <div className="mt-4 p-4 bg-gray-100 rounded-xl">
          <p className="text-lg font-semibold text-gray-700">
            {days.length} night{days.length > 1 ? "s" : ""}
          </p>

          <p className="text-2xl font-bold text-green-600 mt-1">
            ₦{totalPrice.toLocaleString()}
          </p>
        </div>
      )}
      <div className="mt-6 flex gap-4">
        <button
          className="px-8 py-4 bg-[#F46700] text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition w-full"
          onClick={handleBooking}
        >
          Confirm Reservation
        </button>
      </div>
    </div>
  );
}
