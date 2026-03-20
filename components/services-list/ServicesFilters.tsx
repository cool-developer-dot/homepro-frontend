"use client";

import { Search } from "lucide-react";

const categories = ["All", "Cleaning", "Plumbing", "Electrical"] as const;

type Category = (typeof categories)[number];

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  category: Category;
  onCategoryChange: (value: Category) => void;
};

export default function ServicesFilters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
}: Props) {
  return (
    <section className="rounded-2xl bg-white ring-1 ring-slate-200 p-4 sm:p-5 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-7 relative">
          <Search className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search services (e.g., cleaning, plumbing, electrical)"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div className="md:col-span-5">
          {/* Mobile select */}
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value as Category)}
            className="md:hidden h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Desktop segmented controls */}
          <div className="hidden md:flex rounded-xl border border-slate-200 p-1 gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={`h-9 px-3 rounded-lg text-sm font-medium transition ${
                  category === cat
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

