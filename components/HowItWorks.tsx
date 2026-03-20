"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Clock, MapPin, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose Service",
    description: "Pick the right service and preview what’s included—fast and transparent.",
    icon: Sparkles,
    tone: "text-blue-600 bg-blue-50 ring-blue-100",
  },
  {
    number: "02",
    title: "Book Instantly",
    description: "Select a time window and confirm in seconds. No unnecessary steps.",
    icon: Clock,
    tone: "text-emerald-600 bg-emerald-50 ring-emerald-100",
  },
  {
    number: "03",
    title: "Get Professional at Your Doorstep",
    description: "A vetted specialist arrives ready with the right tools and expertise.",
    icon: MapPin,
    tone: "text-indigo-600 bg-indigo-50 ring-indigo-100",
  },
  {
    number: "04",
    title: "Enjoy Quality Service",
    description: "Receive reliable work and leave with confidence—backed by reviews.",
    icon: CheckCircle2,
    tone: "text-amber-600 bg-amber-50 ring-amber-100",
  },
] as const;

export default function HowItWorks() {
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
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-14 md:py-20 bg-white/70 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-orange-600 uppercase">
            How It Works
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Everything you need to book confidently
          </h2>
          <p className="mt-3 text-slate-600 leading-7">
            A simple, modern flow designed for real life—choose a service, book instantly, get verified pros,
            and enjoy quality results.
          </p>
        </div>

        <div className="relative mt-10">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute left-[9%] right-[9%] top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-full" />

          <ol className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const active = visible;

              return (
                <li
                  key={step.number}
                  className={[
                    "relative",
                    active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                    "transition-all duration-700 ease-out",
                  ].join(" ")}
                >
                  <div className="rounded-3xl bg-gradient-to-b from-white to-slate-50 ring-1 ring-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 transition-shadow h-full">
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        <div className={`h-12 w-12 rounded-2xl ring-8 grid place-items-center ${step.tone}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center h-7 px-2 rounded-full bg-slate-900 text-white text-xs font-bold">
                              {step.number}
                            </span>
                          </div>
                          <h3 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h3>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-slate-600 leading-6">
                        {step.description}
                      </p>

                      {/* Connector dot (mobile/desktop) */}
                      <div className="md:hidden mt-5 flex items-center justify-start">
                        <span className="h-2 w-2 rounded-full bg-orange-500/70" />
                      </div>
                    </div>
                  </div>

                  {/* Connector dot on desktop */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="h-3 w-3 rounded-full bg-white ring-2 ring-orange-500/60 shadow-sm" />
                  </div>

                  {/* For last item, remove extra dot impact on small layout */}
                  {idx === steps.length - 1 ? null : null}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

