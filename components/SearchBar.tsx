import { Clock, MapPin, Search, ChevronDown } from 'lucide-react';

type Option = { label: string; value: string };

const services: Option[] = [
  { label: 'Home Cleaning', value: 'home-cleaning' },
  { label: 'Deep Cleaning', value: 'deep-cleaning' },
  { label: 'Move‑In/Out', value: 'move' },
  { label: 'Plumbing', value: 'plumbing' },
  { label: 'Electrical', value: 'electrical' },
  { label: 'Handyman', value: 'handyman' },
  { label: 'AC Repair', value: 'ac' },
  { label: 'Appliance Repair', value: 'appliance' },
  { label: 'Pest Control', value: 'pest' },
  { label: 'Gardening', value: 'garden' },
];

const times: Option[] = [
  { label: 'Today', value: 'today' },
  { label: 'Tomorrow', value: 'tomorrow' },
  { label: 'Next 3 Days', value: '3days' },
  { label: 'This Week', value: 'week' },
  { label: 'Next Week', value: 'next-week' },
  { label: 'Weekend', value: 'weekend' },
];

const whenOptions: Option[] = [
  { label: 'Now', value: 'now' },
  { label: 'In 30 Minutes', value: '30m' },
  { label: 'In 1 Hour', value: '1h' },
  { label: 'This Afternoon', value: 'afternoon' },
  { label: 'This Evening', value: 'evening' },
  { label: 'Tomorrow Morning', value: 'tomorrow-am' },
  { label: 'Next Week', value: 'nw' },
  { label: 'Schedule a Date', value: 'custom' },
];

export default function SearchBar() {
  return (
    <div className="rounded-2xl p-3 sm:p-4 md:p-5 shadow-2xl bg-gradient-to-br from-white/95 via-[#f8fbff]/95 to-[#eef6ff]/95 backdrop-blur-md ring-1 ring-white/70">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        <div className="group relative">
          <div className="flex items-center gap-3 rounded-xl border border-sky-100 bg-gradient-to-b from-white to-sky-50/70 px-4 h-12 shadow-sm hover:border-sky-200 transition">
            <Search className="h-5 w-5 text-sky-600" />
            <select
              className="w-full bg-transparent outline-none appearance-none text-slate-800 font-medium"
              defaultValue=""
              aria-label="Select Service"
            >
              <option value="" disabled>
                Select Service
              </option>
              {services.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-sky-600" />
          </div>
        </div>

        <div className="group relative">
          <div className="flex items-center gap-3 rounded-xl border border-sky-100 bg-gradient-to-b from-white to-sky-50/70 px-4 h-12 shadow-sm hover:border-sky-200 transition">
            <Clock className="h-5 w-5 text-sky-600" />
            <select
              className="w-full bg-transparent outline-none appearance-none text-slate-800 font-medium"
              defaultValue=""
              aria-label="Choose Time"
            >
              <option value="" disabled>
                Choose Time
              </option>
              {times.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-sky-600" />
          </div>
        </div>

        <div className="group relative">
          <div className="flex items-center gap-3 rounded-xl border border-sky-100 bg-gradient-to-b from-white to-sky-50/70 px-4 h-12 shadow-sm hover:border-sky-200 transition">
            <MapPin className="h-5 w-5 text-sky-600" />
            <select
              className="w-full bg-transparent outline-none appearance-none text-slate-800 font-medium"
              defaultValue="now"
              aria-label="When"
            >
              {whenOptions.map((w) => (
                <option key={w.value} value={w.value}>
                  {w.label}
                </option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-sky-600" />
          </div>
        </div>

        <div className="flex">
          <button
            className="btn-primary w-full h-12 rounded-xl shadow-lg shadow-orange-500/30"
            aria-label="Find a Pro"
          >
            Find a Pro
          </button>
        </div>
      </div>
    </div>
  );
}

