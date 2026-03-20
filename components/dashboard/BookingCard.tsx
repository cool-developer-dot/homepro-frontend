"use client";

import { Clock3, MapPin, Receipt, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { Booking } from "@/components/dashboard/types";

type Props = {
  booking: Booking;
  onViewDetails: (booking: Booking) => void;
};

function statusBadgeClasses(status: Booking["status"]) {
  switch (status) {
    case "pending":
      return "bg-amber-50 text-amber-800 ring-amber-100";
    case "completed":
      return "bg-emerald-50 text-emerald-800 ring-emerald-100";
    case "cancelled":
      return "bg-rose-50 text-rose-800 ring-rose-100";
    default:
      return "bg-slate-50 text-slate-800 ring-slate-100";
  }
}

export default function BookingCard({ booking, onViewDetails }: Props) {
  const [hovered, setHovered] = useState(false);

  const date = useMemo(() => new Date(booking.dateTimeISO), [booking.dateTimeISO]);
  const isDueSoon = useMemo(() => {
    if (booking.status !== "pending") return false;
    const now = Date.now();
    const diff = date.getTime() - now;
    return diff >= 0 && diff <= 36 * 60 * 60 * 1000; // within 36 hours
  }, [booking.status, date]);
  const formattedDate = useMemo(() => {
    return date.toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [date]);

  return (
    <div
      className={[
        "rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm transition-all",
        hovered ? "shadow-lg shadow-slate-900/5 -translate-y-0.5" : "",
      ].join(" ")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-wide uppercase text-slate-500">
              Booking
            </p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900 truncate">
              {booking.serviceName}
            </h3>
          </div>

          <div className="shrink-0">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ring-1 ${statusBadgeClasses(
                  booking.status,
                )}`}
              >
                {booking.status === "pending"
                  ? "Pending"
                  : booking.status === "completed"
                    ? "Completed"
                    : "Cancelled"}
              </span>
              {isDueSoon && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 ring-1 ring-orange-200">
                  Due soon
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Clock3 className="h-4 w-4 text-slate-500" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <MapPin className="h-4 w-4 text-slate-500" />
            <span className="truncate">{booking.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Receipt className="h-4 w-4 text-slate-500" />
            <span>
              ${booking.price} · {booking.duration}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            {booking.status === "cancelled" ? (
              <Trash2 className="h-4 w-4 text-rose-500" />
            ) : (
              <span className="h-4 w-4" />
            )}
            <span className="text-slate-500">{booking.status === "cancelled" ? "Cancelled by user" : " "}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onViewDetails(booking)}
            className="inline-flex items-center justify-center gap-2 h-10 rounded-xl px-4 font-semibold text-slate-900 bg-slate-50 hover:bg-slate-100 ring-1 ring-slate-200 transition"
          >
            View Details
          </button>
          <span className="text-sm font-semibold text-slate-900">${booking.price}</span>
        </div>
      </div>
    </div>
  );
}

