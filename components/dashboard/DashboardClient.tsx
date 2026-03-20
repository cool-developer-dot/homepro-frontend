"use client";

import { useMemo, useState } from "react";
import { useAuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { mockBookings } from "@/components/dashboard/mock-data";
import type { Booking, BookingStatus } from "@/components/dashboard/types";
import StatsCard from "@/components/dashboard/StatsCard";
import BookingCard from "@/components/dashboard/BookingCard";
import EmptyState from "@/components/dashboard/EmptyState";
import BookingDetailsModal from "@/components/dashboard/BookingDetailsModal";

const tabs = ["Active", "Completed", "Cancelled"] as const;

function mapTabToStatus(tab: (typeof tabs)[number]): BookingStatus | "all" {
  if (tab === "Active") return "pending";
  if (tab === "Completed") return "completed";
  return "cancelled";
}

export default function DashboardClient() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Active");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const stats = useMemo(() => {
    const total = mockBookings.length;
    const pending = mockBookings.filter((b) => b.status === "pending").length;
    const completed = mockBookings.filter((b) => b.status === "completed").length;
    const cancelled = mockBookings.filter((b) => b.status === "cancelled").length;

    return { total, pending, completed, cancelled };
  }, []);

  const filtered = useMemo(() => {
    const status = mapTabToStatus(tab);
    if (status === "all") return mockBookings;
    return mockBookings.filter((b) => b.status === status);
  }, [tab]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
      <div className="rounded-3xl bg-gradient-to-b from-white to-slate-50 ring-1 ring-slate-200 shadow-sm p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-wide text-orange-600 uppercase">
              User Dashboard
            </p>
            <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Welcome{user?.fullName ? `, ${user.fullName.split(" ")[0]}` : ""} 👋
            </h1>
            <p className="mt-2 text-slate-600">
              Manage your bookings, track progress, and revisit history in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            <StatsCard label="Total" value={stats.total} tone="slate" />
            <StatsCard label="Completed" value={stats.completed} tone="emerald" />
            <StatsCard label="Pending" value={stats.pending} tone="orange" />
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Your bookings</h2>
            <p className="text-sm text-slate-600">{filtered.length} shown</p>
          </div>

          <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-2 sm:p-3">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map((t) => {
                const active = tab === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={[
                      "shrink-0 px-4 h-10 rounded-xl text-sm font-semibold transition",
                      active
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-white text-slate-700 hover:bg-slate-100 ring-1 ring-slate-200",
                    ].join(" ")}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 sm:mt-5">
            {filtered.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {filtered.map((b) => (
                  <BookingCard
                    key={b.id}
                    booking={b}
                    onViewDetails={(booking) => setSelectedBooking(booking)}
                  />
                ))}
              </div>
            ) : tab === "Active" ? (
              <EmptyState
                title="No active bookings yet"
                description="When you book a service, it will show up here with status and details."
                actionLabel="Book a Service"
                onAction={() => router.push("/services")}
              />
            ) : tab === "Completed" ? (
              <EmptyState
                title="No completed bookings"
                description="Your completed history will appear once you finish a service."
                actionLabel="Explore Services"
                onAction={() => router.push("/services")}
              />
            ) : (
              <EmptyState
                title="No cancelled bookings"
                description="Cancelled bookings will show up here for your reference."
              />
            )}
          </div>
        </div>
      </div>

      <BookingDetailsModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
    </section>
  );
}

