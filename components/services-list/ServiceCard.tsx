import Image from "next/image";
import Link from "next/link";
import type { ServiceDetails } from "@/lib/services-data";

type Props = {
  service: ServiceDetails;
};

export default function ServiceCard({ service }: Props) {
  return (
    <article className="group rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-900/10 transition overflow-hidden">
      <Link href={`/services/${service.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={service.images[0]}
            alt={service.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-2.5 py-1 text-xs font-medium">
              {service.category}
            </p>
            <p className="text-base font-bold text-slate-900">${service.priceFrom}</p>
          </div>

          <h3 className="mt-3 text-lg font-semibold text-slate-900 leading-6">{service.title}</h3>

          <p className="mt-2 text-sm text-slate-600 leading-6 [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden">
            {service.description}
          </p>
        </div>
      </Link>
    </article>
  );
}

