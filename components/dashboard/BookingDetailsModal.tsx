"use client";

import { X } from "lucide-react";
import type { Booking } from "@/components/dashboard/types";

type Props = {
  booking: Booking | null;
  onClose: () => void;
};

export default function BookingDetailsModal({ booking, onClose }: Props) {
  if (!booking) return null;

  const date = new Date(booking.dateTimeISO);
  const formattedDate = date.toLocaleString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const status =
    booking.status === "pending"
      ? "Pending"
      : booking.status === "completed"
        ? "Completed"
        : "Cancelled";

  return (
    <div className="fixed inset-0 z-[90]">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-x-0 top-10 sm:top-20 px-4">
        <div className="mx-auto w-full max-w-2xl rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Booking Details</p>
              <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-slate-900 truncate">
                {booking.serviceName}
              </h3>
              <p className="mt-2 text-sm text-slate-600">Status: <span className="font-semibold">{status}</span></p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="h-10 w-10 rounded-xl bg-slate-100 hover:bg-slate-200 inline-flex items-center justify-center"
            >
              <X className="h-5 w-5 text-slate-700" />
            </button>
          </div>

          <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase">When</p>
              <p className="mt-2 text-sm text-slate-800">{formattedDate}</p>
              <p className="mt-1 text-sm text-slate-600">Duration: {booking.duration}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase">Where</p>
              <p className="mt-2 text-sm text-slate-800">{booking.address}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-4 sm:col-span-2">
              <p className="text-xs font-semibold text-slate-500 uppercase">Price</p>
              <p className="mt-2 text-2xl font-extrabold text-slate-900">${booking.price}</p>
              <p className="mt-1 text-sm text-slate-600">Includes scheduled time and verified professional work.</p>
            </div>
          </div>

          <div className="p-5 sm:p-6 border-t border-slate-100 flex items-center justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl px-5 font-semibold bg-slate-900 text-white hover:bg-slate-800 transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

