import type { Booking } from "@/components/dashboard/types";

const now = new Date();

function daysFromNow(days: number) {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export const mockBookings: Booking[] = [
  {
    id: "b1",
    serviceName: "Deep Home Cleaning",
    dateTimeISO: daysFromNow(1),
    status: "pending",
    price: 129,
    duration: "2-4 hours",
    address: "12 Riverside Ave, Springfield",
  },
  {
    id: "b2",
    serviceName: "Electrical Repair & Installation",
    dateTimeISO: daysFromNow(0),
    status: "pending",
    price: 89,
    duration: "1-3 hours",
    address: "78 Oak Street, Springfield",
  },
  {
    id: "b3",
    serviceName: "Handyman Service",
    dateTimeISO: daysFromNow(-8),
    status: "completed",
    price: 79,
    duration: "1-2 hours",
    address: "33 Pinecrest Blvd, Springfield",
  },
  {
    id: "b4",
    serviceName: "Plumbing Repair & Installation",
    dateTimeISO: daysFromNow(-16),
    status: "cancelled",
    price: 74,
    duration: "1-3 hours",
    address: "9 Market Road, Springfield",
  },
];

