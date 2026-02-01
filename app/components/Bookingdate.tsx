"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
export default function BookingDates() {
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [days, setDays] = useState<string[]>([]);

  // today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!checkIn || !checkOut) return;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const now = new Date(today);
    if (start < now) {
      toast.error("Check-in date cannot be earlier than today");
      setCheckIn("");
      setDays([]);
      return;
    }

    
    if (start > end) {
      toast.error("Check-in date cannot be greater than check-out date");
      setCheckOut("");
      setDays([]);
      return;
    }

    // ✅ generate date array
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
        min={today} // ✅ prevents selecting past dates
        onChange={(e) => setCheckIn(e.target.value)}
        className="border p-2"
      />

      <input
        type="date"
        value={checkOut}
        min={checkIn || today} // ✅ prevents invalid checkout
        onChange={(e) => setCheckOut(e.target.value)}
        className="border p-2"
      />

      <div>
        <strong>Days booked:</strong>
        <ul>
          {days.map((day, index) => (
            <li key={index}>{day}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
