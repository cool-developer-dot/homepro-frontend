import Navbar from "@/components/Navbar";
import BookingFlow from "@/components/booking/BookingFlow";
import { Suspense } from "react";

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        <Suspense fallback={<div className="py-10 text-center text-slate-600">Loading booking...</div>}>
          <BookingFlow />
        </Suspense>
      </section>
    </main>
  );
}

