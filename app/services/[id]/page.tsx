import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ServiceGallery from "@/components/services/ServiceGallery";
import RatingsReviews from "@/components/services/RatingsReviews";
import BookingCard from "@/components/services/BookingCard";
import { getAverageRating, getServiceById } from "@/lib/services-data";

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = getServiceById(params.id);

  if (!service) {
    return {
      title: "Service Not Found | HomePro",
      description: "The requested service could not be found.",
    };
  }

  const shortDescription = service.description.slice(0, 140);

  return {
    title: `${service.title} | HomePro Services`,
    description: shortDescription,
    openGraph: {
      title: `${service.title} | HomePro`,
      description: shortDescription,
      images: [
        {
          url: service.images[0],
          alt: service.title,
        },
      ],
      type: "website",
    },
  };
}

export default function ServiceDetailsPage({ params }: PageProps) {
  const service = getServiceById(params.id);

  if (!service) notFound();

  const averageRating = getAverageRating(service.reviews);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-7 space-y-6">
            <ServiceGallery title={service.title} images={service.images} />

            <article className="rounded-2xl bg-white ring-1 ring-slate-200 p-5 sm:p-6 shadow-sm">
              <p className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 px-3 py-1 text-xs font-medium">
                {averageRating.toFixed(1)} average rating
              </p>
              <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {service.title}
              </h1>
              <p className="mt-4 text-slate-700 leading-7">{service.description}</p>
            </article>

            <RatingsReviews
              reviews={service.reviews}
              reviewKey={`booking_${service.id}`}
            />
          </div>

          <div className="lg:col-span-5 space-y-4">
            <BookingCard
              serviceId={service.id}
              priceFrom={service.priceFrom}
              duration={service.duration}
            />

            {/* Mobile sticky CTA */}
            <div className="fixed bottom-4 left-4 right-4 md:hidden z-40">
              <Link
                href={`/booking?service=${service.id}`}
                className="w-full h-12 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 shadow-xl shadow-orange-500/35 inline-flex items-center justify-center"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

