import { Clock3, CreditCard } from "lucide-react";
import Link from "next/link";

type Props = {
  serviceId: string;
  priceFrom: number;
  duration: string;
};

export default function BookingCard({ serviceId, priceFrom, duration }: Props) {
  return (
    <aside className="rounded-2xl bg-white ring-1 ring-slate-200 p-5 sm:p-6 shadow-sm md:sticky md:top-20">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-slate-500">Starting from</p>
          <p className="text-3xl font-bold tracking-tight text-slate-900">${priceFrom}</p>
        </div>

        <div className="space-y-3 text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-slate-500" />
            <span>Estimated Duration: {duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-slate-500" />
            <span>Secure payment, no hidden fees</span>
          </div>
        </div>

        <Link
          href={`/booking?service=${serviceId}`}
          className="w-full h-12 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 transition inline-flex items-center justify-center"
        >
          Book Now
        </Link>
      </div>
    </aside>
  );
}

