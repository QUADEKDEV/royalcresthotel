"use client";
import { useState, useEffect } from "react";
import { createHistory } from "../utils/actions";
import { usePaystackPayment } from "react-paystack";
import toast from "react-hot-toast";

export default function BookingDates({
  roomId,
  price,
}: {
  roomId: string;
  price: number;
}) {
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [days, setDays] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  useEffect(() => {
    setTotalPrice(days.length > 0 ? days.length * price : 0);
  }, [days, price]);

  // --- PAYSTACK CONFIGURATION ---
  const config = {
    reference: new Date().getTime().toString(),
    email: "adejumobiquadri@gmail.com",
    amount: totalPrice * 100,
    publicKey:process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = async (reference: any) => {
    // 1. Payment was successful, now save to database
    const result = await createHistory({
      roomId,
      days,
      paymentReference: reference.reference,
    });

    if (result.success) {
      setReceiptData({
        id: reference.reference,
        date: new Date().toLocaleDateString(),
        checkIn,
        checkOut,
        nights: days.length,
        total: totalPrice,
      });
      setShowReceipt(true);
      toast.success("Payment Successful & Room Reserved!");
    }
  };

  const onClose = () => {
    toast.error("Payment cancelled");
  };


const handleBooking = () => {
  if (days.length === 0 || totalPrice <= 0) {
    toast.error("Please select valid booking dates");
    return;
  }
  toast.error(days.length.toString())
  toast.error(totalPrice.toString());
  initializePayment({ onSuccess, onClose });
};


  // const handleBooking = () => {
  //   if (days.length === 0) {
  //     toast.error("Please select booking dates");
  //     return;
  //   }

  //   // Pass a single object instead of two arguments
  //   initializePayment({ onSuccess, onClose });
  // };

  const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
      if (!checkIn || !checkOut) return;
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      if (start < new Date(today)) {
        setCheckIn("");
        return;
      }
      if (start > end) {
        setCheckOut("");
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
  // ... (Keep your existing date logic and today constant here) ...

  return (
    <div className="space-y-4">
        <div className="flex flex-col gap-4">
//         <label className="text-sm font-medium">Check-in</label>
//         <input
          type="date"
          value={checkIn}
          min={today}
          onChange={(e) => setCheckIn(e.target.value)}
          className="border p-2 rounded"
        />
        <label className="text-sm font-medium">Check-out</label>
        <input
          type="date"
          value={checkOut}
          min={checkIn || today}
          onChange={(e) => setCheckOut(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      {/* Date inputs go here (same as previous code) */}

      {days.length > 0 && (
        <div className="mt-4 p-4 bg-gray-100 rounded-xl">
          <p className="text-2xl font-bold text-green-600">
            Total: ₦{totalPrice.toLocaleString()}
          </p>
        </div>
      )}

      <button
        className="px-8 py-4 bg-[#F46700] text-white rounded-xl w-full"
        onClick={handleBooking}
      >
        Pay Now & Reserve
      </button>

      {/* --- RECEIPT MODAL --- */}
      {showReceipt && receiptData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 print:p-0 print:bg-white">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full">
            <h2 className="text-xl font-bold border-b pb-2">Payment Receipt</h2>
            <div className="mt-4 space-y-2">
              <p>Ref: {receiptData.id}</p>
              <p>Nights: {receiptData.nights}</p>
              <p className="font-bold">
                Paid: ₦{receiptData.total.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="mt-4 bg-orange-500 text-white p-2 w-full rounded"
            >
              Print Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// "use client";
// import { useState, useEffect, useRef } from "react";
// import { createHistory } from "../utils/actions";
// import toast from "react-hot-toast";

// export default function BookingDates({
//   roomId,
//   price,
// }: {
//   roomId: string;
//   price: number;
// }) {
//   const [checkIn, setCheckIn] = useState<string>("");
//   const [checkOut, setCheckOut] = useState<string>("");
//   const [days, setDays] = useState<string[]>([]);
//   const [totalPrice, setTotalPrice] = useState<number>(0);
//   const [showReceipt, setShowReceipt] = useState(false);
//   const [receiptData, setReceiptData] = useState<any>(null);

//   useEffect(() => {
//     setTotalPrice(days.length > 0 ? days.length * price : 0);
//   }, [days, price]);

//   const handleBooking = async () => {
//     if (days.length === 0) {
//       toast.error("Please select booking dates");
//       return;
//     }

//     const result = await createHistory({ roomId, days });

//     if (!result.success) {
//       toast.error(result.message || "Something went wrong");
//       return;
//     }

//     // Prepare data for the receipt
//     setReceiptData({
//       id: Math.random().toString(36).substr(2, 9).toUpperCase(), // Mock ID
//       date: new Date().toLocaleDateString(),
//       checkIn,
//       checkOut,
//       nights: days.length,
//       total: totalPrice,
//       roomId: roomId,
//     });

//     toast.success("Room reserved successfully");
//     setShowReceipt(true);
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const today = new Date().toISOString().split("T")[0];

//   useEffect(() => {
//     if (!checkIn || !checkOut) return;
//     const start = new Date(checkIn);
//     const end = new Date(checkOut);
//     if (start < new Date(today)) {
//       setCheckIn("");
//       return;
//     }
//     if (start > end) {
//       setCheckOut("");
//       return;
//     }
//     const dates: string[] = [];
//     let current = new Date(start);
//     while (current <= end) {
//       dates.push(current.toISOString().split("T")[0]);
//       current.setDate(current.getDate() + 1);
//     }
//     setDays(dates);
//   }, [checkIn, checkOut, today]);

//   return (
//     <div className="space-y-4">
//       {/* Input Section */}
//       <div className="flex flex-col gap-4">
//         <label className="text-sm font-medium">Check-in</label>
//         <input
//           type="date"
//           value={checkIn}
//           min={today}
//           onChange={(e) => setCheckIn(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <label className="text-sm font-medium">Check-out</label>
//         <input
//           type="date"
//           value={checkOut}
//           min={checkIn || today}
//           onChange={(e) => setCheckOut(e.target.value)}
//           className="border p-2 rounded"
//         />
//       </div>

//       {days.length > 0 && (
//         <div className="mt-4 p-4 bg-gray-100 rounded-xl">
//           <p className="text-lg font-semibold text-gray-700">
//             {days.length} nights
//           </p>
//           <p className="text-2xl font-bold text-green-600">
//             ₦{totalPrice.toLocaleString()}
//           </p>
//         </div>
//       )}

//       <button
//         className="px-8 py-4 bg-[#F46700] text-white rounded-xl text-lg font-semibold hover:bg-orange-600 transition w-full"
//         onClick={handleBooking}
//       >
//         Confirm Reservation
//       </button>

//       {/* --- RECEIPT MODAL --- */}
//       {showReceipt && receiptData && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 print:p-0 print:bg-white">
//           <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-2xl print:shadow-none print:w-full">
//             <div className="text-center border-b pb-4 mb-4">
//               <h2 className="text-2xl font-bold uppercase">Booking Receipt</h2>
//               <p className="text-gray-500">Thank you for your stay!</p>
//             </div>

//             <div className="space-y-3 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Receipt No:</span>
//                 <span className="font-mono font-bold">#{receiptData.id}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Date:</span>
//                 <span>{receiptData.date}</span>
//               </div>
//               <hr />
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Check-in:</span>
//                 <span className="font-semibold">{receiptData.checkIn}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Check-out:</span>
//                 <span className="font-semibold">{receiptData.checkOut}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Duration:</span>
//                 <span>{receiptData.nights} Night(s)</span>
//               </div>
//               <div className="flex justify-between text-lg font-bold pt-4 border-t">
//                 <span>Total Paid:</span>
//                 <span className="text-green-600">
//                   ₦{receiptData.total.toLocaleString()}
//                 </span>
//               </div>
//             </div>

//             <div className="mt-8 flex gap-3 print:hidden">
//               <button
//                 onClick={handlePrint}
//                 className="flex-1 bg-gray-800 text-white py-2 rounded-lg font-medium"
//               >
//                 Print PDF
//               </button>
//               <button
//                 onClick={() => setShowReceipt(false)}
//                 className="flex-1 border border-gray-300 py-2 rounded-lg font-medium"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

