import ServiceCardSkeleton from "@/components/services-list/ServiceCardSkeleton";

export default function ServicesLoading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        <div className="mb-6 space-y-3 animate-pulse">
          <div className="h-10 w-80 max-w-full rounded bg-slate-200" />
          <div className="h-5 w-[34rem] max-w-full rounded bg-slate-200" />
        </div>

        <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-5 mb-5 animate-pulse">
          <div className="h-11 w-full rounded-xl bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}

