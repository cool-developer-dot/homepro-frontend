"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BadgeDollarSign, ShieldCheck, Timer, UserCheck } from "lucide-react";

const highlights = [
  {
    title: "Trusted Professionals",
    description: "Background-checked specialists with proven ratings.",
    icon: ShieldCheck,
    tone: "text-blue-600 bg-blue-50 ring-blue-100",
  },
  {
    title: "Fast Service",
    description: "Book instantly and get help at your preferred time.",
    icon: Timer,
    tone: "text-emerald-600 bg-emerald-50 ring-emerald-100",
  },
  {
    title: "Affordable Pricing",
    description: "Transparent pricing with no hidden surprises.",
    icon: BadgeDollarSign,
    tone: "text-amber-600 bg-amber-50 ring-amber-100",
  },
  {
    title: "Verified Experts",
    description: "Skilled, vetted teams for every home service category.",
    icon: UserCheck,
    tone: "text-violet-600 bg-violet-50 ring-violet-100",
  },
];

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about-us"
      ref={sectionRef}
      className="relative py-14 md:py-20 bg-gradient-to-b from-slate-50 to-white scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-2xl shadow-slate-900/10">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/bg-img.png"
                  alt="Home service team at work"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent" />
              <div className="absolute left-4 bottom-4 rounded-xl bg-white/90 backdrop-blur-md px-4 py-3 ring-1 ring-white/80 shadow-lg">
                <p className="text-xs font-medium text-slate-500">Serving homeowners daily</p>
                <p className="text-lg font-bold text-slate-900">10,000+ jobs completed</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="text-sm font-semibold tracking-wide text-orange-600 uppercase">About HomePro</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Reliable Home Services, Built for Modern Living
            </h2>
            <p className="mt-4 text-slate-600 leading-7">
              HomePro connects households with top-rated professionals for cleaning, plumbing,
              electrical, and handyman services. We focus on trust, speed, and transparent pricing so
              you can book with complete confidence.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white ring-1 ring-slate-200 p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start gap-3">
                    <div className={`h-10 w-10 rounded-xl ring-8 grid place-items-center ${item.tone}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

