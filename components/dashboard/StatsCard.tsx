type Props = {
  label: string;
  value: number | string;
  tone: "slate" | "orange" | "emerald" | "rose";
};

const toneMap = {
  slate: {
    chip: "bg-slate-100 text-slate-700 ring-slate-200",
    icon: "text-slate-700",
  },
  orange: {
    chip: "bg-orange-50 text-orange-700 ring-orange-100",
    icon: "text-orange-700",
  },
  emerald: {
    chip: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    icon: "text-emerald-700",
  },
  rose: {
    chip: "bg-rose-50 text-rose-700 ring-rose-100",
    icon: "text-rose-700",
  },
} as const;

export default function StatsCard({ label, value, tone }: Props) {
  const t = toneMap[tone];
  return (
    <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
      <p className={`text-xs font-semibold tracking-wide uppercase ${t.chip} inline-flex items-center rounded-full px-2 py-1 ring-1`}>
        {label}
      </p>
      <p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">{value}</p>
    </div>
  );
}

