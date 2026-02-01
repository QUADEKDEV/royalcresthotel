"use client";
import { useState, useEffect } from "react";

export default function BookingDates() {
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [days, setDays] = useState<string[]>([]);

  const today = new Date().toISOString().split("T")[0];

  // format date → DD Month YYYY
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

      <div>
        <strong>Days booked:</strong>
        <ul>
          {days.map((day, index) => (
            <li key={index}>{formatDate(day)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
