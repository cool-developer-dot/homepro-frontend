"use client";

import { useDeferredValue, useMemo, useState } from "react";
import type { ServiceDetails } from "@/lib/services-data";
import ServicesFilters from "@/components/services-list/ServicesFilters";
import ServiceCard from "@/components/services-list/ServiceCard";

type Category = "All" | "Cleaning" | "Plumbing" | "Electrical";

type Props = {
  initialServices: ServiceDetails[];
};

export default function ServicesExplorer({ initialServices }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return initialServices.filter((service) => {
      const categoryMatch = category === "All" ? true : service.category === category;
      const searchMatch =
        q.length === 0
          ? true
          : service.title.toLowerCase().includes(q) ||
            service.description.toLowerCase().includes(q) ||
            service.category.toLowerCase().includes(q);
      return categoryMatch && searchMatch;
    });
  }, [initialServices, category, deferredQuery]);

  return (
    <div className="space-y-5">
      <ServicesFilters
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-900">{filtered.length}</span> services
        </p>
      </div>

      {filtered.length ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </section>
      ) : (
        <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-8 text-center">
          <h3 className="text-lg font-semibold text-slate-900">No services found</h3>
          <p className="mt-2 text-sm text-slate-600">
            Try changing your search or category filter.
          </p>
        </div>
      )}
    </div>
  );
}

