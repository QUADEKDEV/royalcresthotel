"use client"
import React, { useState,useEffect} from "react";
import {Calendar,Check,X,CreditCard,Loader2,} from "lucide-react";
import { motion} from "framer-motion";


interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  capacity: number;
  size: string;
  amenities: string[];
}
const PaymentModal = ({
  room,
  isOpen,
  onClose,
}: {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState<"details" | "processing" | "success">(
    "details",
  );
  const [email, setEmail] = useState("");

  // Reset state when opening
  useEffect(() => {
    if (isOpen) setStep("details");
  }, [isOpen]);

  const payWithPaystack = async () => {
    const handler = (window as any).PaystackPop.setup({
      key: "pk_test_xxxxx",
      email: "customer@email.com",
      amount: 500000,
      currency: "NGN",
      callback: function (response: any) {
        alert("Payment successful: " + response.reference);
      },
    });

    handler.openIframe();
  };

  const handlePay = () => {
    payWithPaystack();
    // if (!email) return;
    // setStep("processing");

    // // Simulate API Call to GraphQL -> Paystack
    // setTimeout(() => {
    //   setStep("success");
    // }, 2500);
  };

  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden z-10"
      >
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
          <h3 className="font-serif text-xl">
            {step === "success" ? "Booking Confirmed" : "Complete Booking"}
          </h3>
          <button
            onClick={onClose}
            className="hover:text-amber-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          {step === "details" && (
            <div className="space-y-6">
              <div className="flex gap-4">
                <img
                  src={room.image}
                  alt=""
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{room.name}</h4>
                  <p className="text-amber-600 font-bold mt-1">
                    ₦{room.price.toLocaleString()}{" "}
                    <span className="text-slate-400 font-normal text-sm">
                      /night
                    </span>
                  </p>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-2">
                    <Check size={12} className="text-green-500" /> Instant
                    Confirmation
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Check-in
                    </label>
                    <div className="relative">
                      <Calendar
                        size={16}
                        className="absolute left-3 top-3.5 text-slate-400"
                      />
                      <input
                        type="text"
                        value="Oct 24, 2025"
                        readOnly
                        className="w-full pl-10 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Check-out
                    </label>
                    <div className="relative">
                      <Calendar
                        size={16}
                        className="absolute left-3 top-3.5 text-slate-400"
                      />
                      <input
                        type="text"
                        value="Oct 26, 2025"
                        readOnly
                        className="w-full pl-10 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-500">Total (2 nights)</p>
                  <p className="text-xl font-bold text-slate-900">
                    ₦{(room.price * 2).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={handlePay}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  Pay Securely <CreditCard size={18} />
                </button>
              </div>
            </div>
          )}

          {step === "processing" && (
            <div className="py-10 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-6" />
              <h4 className="text-xl font-bold text-slate-900 mb-2">
                Processing Payment
              </h4>
              <p className="text-slate-500 text-sm">
                Please wait while we connect to Paystack...
              </p>
            </div>
          )}

          {step === "success" && (
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">
                You're All Set!
              </h4>
              <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">
                Your booking for <strong>{room.name}</strong> has been
                confirmed. A receipt has been sent to {email}.
              </p>
              <button
                onClick={onClose}
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-slate-800"
              >
                Close Receipt
              </button>
            </div>
          )}
        </div>
      </motion.div>




      
    </div>
  );
};

export default PaymentModal