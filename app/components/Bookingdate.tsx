"use client";
import { useState, useEffect } from "react";

export default function BookingDates() {
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [days, setDays] = useState<string[]>([]);

  useEffect(() => {
    if (!checkIn || !checkOut) return;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (start > end) {
      alert("Check-in date cannot be greater than check-out date");
      setCheckOut("");
      setDays([]);
      return;
    }

    const dates: string[] = []; // ✅ declared properly
    let current = new Date(start);

    while (current <= end) {
      dates.push(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }

    setDays(dates); // ✅ works
  }, [checkIn, checkOut]);

  return (
    <div className="space-y-4">
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className="border p-2"
      />

      <input
        type="date"
        value={checkOut}
        min={checkIn}
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
