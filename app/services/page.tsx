import Navbar from "@/components/Navbar";
import ServicesExplorer from "@/components/services-list/ServicesExplorer";
import { fetchServices } from "@/lib/services-api";

export default async function ServicesListingPage() {
  const services = await fetchServices();

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Discover Home Services
          </h1>
          <p className="mt-2 text-slate-600 max-w-2xl">
            Browse trusted professionals, compare prices, and book the right service in minutes.
          </p>
        </div>

        <ServicesExplorer initialServices={services} />
      </section>
    </main>
  );
}

