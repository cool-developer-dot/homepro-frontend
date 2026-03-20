export default function ServiceDetailsLoading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 animate-pulse">
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-[4/3] rounded-2xl bg-slate-200" />
            <div className="rounded-2xl bg-white p-6 space-y-3">
              <div className="h-6 w-2/3 bg-slate-200 rounded" />
              <div className="h-4 w-full bg-slate-200 rounded" />
              <div className="h-4 w-5/6 bg-slate-200 rounded" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white p-6 space-y-3">
              <div className="h-8 w-1/2 bg-slate-200 rounded" />
              <div className="h-4 w-2/3 bg-slate-200 rounded" />
              <div className="h-12 w-full bg-slate-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

