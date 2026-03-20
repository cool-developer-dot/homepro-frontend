"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Phone, Send, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(60, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

type ContactValues = z.infer<typeof contactSchema>;

export default function ContactUs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  const [submitState, setSubmitState] = useState<
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; message: string }
    | { status: "error"; message: string }
  >({ status: "idle" });

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values: ContactValues) => {
    setSubmitState({ status: "loading" });

    // TODO: wire to backend contact endpoint when available.
    await new Promise((r) => setTimeout(r, 900));

    setSubmitState({
      status: "success",
      message: "Thanks! Your message was sent. We’ll reach out shortly.",
    });
    reset();
  };

  return (
    <section
      ref={sectionRef}
      id="contact-us"
      className="py-14 md:py-20 bg-slate-50 scroll-mt-24"
      aria-label="Contact Us"
    >
      <div
        className={[
          "transition-all duration-700 ease-out",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-wide text-orange-600 uppercase">
              Contact Us
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Get in Touch
            </h2>
            <p className="mt-3 text-slate-600 leading-7">
              Questions or ready to book? Send a message and our team will help you find the
              right professional—fast.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-5">
              <div className="rounded-3xl ring-1 ring-slate-200 bg-white/70 backdrop-blur-md shadow-xl shadow-slate-900/5 p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white grid place-items-center shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Support that feels premium</h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Clear answers, quick response, and trusted professionals.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <ContactLine
                    icon={<Phone className="h-5 w-5 text-slate-700" />}
                    label="Phone"
                    value="+1 (555) 012-3456"
                  />
                  <ContactLine
                    icon={<Mail className="h-5 w-5 text-slate-700" />}
                    label="Email"
                    value="support@homepro.com"
                  />
                  <ContactLine
                    icon={<MapPin className="h-5 w-5 text-slate-700" />}
                    label="Location"
                    value="Serving your city & surrounding areas"
                  />
                </div>

                <div className="mt-7 rounded-2xl bg-gradient-to-br from-orange-500/10 via-slate-900/5 to-sky-500/10 p-5 ring-1 ring-slate-200">
                  <p className="text-sm font-semibold text-slate-900">Need help booking?</p>
                  <p className="mt-1 text-sm text-slate-600 leading-6">
                    Tell us what you need—our team will recommend the best service and the earliest
                    time slot.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl ring-1 ring-slate-200 bg-white/80 backdrop-blur-md shadow-xl shadow-slate-900/5 p-6 sm:p-7">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Name</label>
                      <input
                        {...register("name")}
                        className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="Your full name"
                        autoComplete="name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700">Email</label>
                      <input
                        {...register("email")}
                        className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="you@company.com"
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Message</label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                      placeholder="Tell us what you need help with..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-600">{errors.message.message}</p>
                    )}
                  </div>

                  {submitState.status === "error" && (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                      {submitState.message}
                    </div>
                  )}

                  {submitState.status === "success" && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                      {submitState.message}
                    </div>
                  )}

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitState.status === "loading" || isSubmitting}
                      className="w-full h-12 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 transition disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                    >
                      {submitState.status === "loading" || isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-white/90 animate-pulse" />
                          Sending...
                        </span>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </button>
                    <p className="mt-2 text-xs text-slate-500">
                      By submitting, you agree to be contacted about your request.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} HomePro. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLine({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 rounded-2xl bg-slate-50 ring-1 ring-slate-200 grid place-items-center">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="text-sm text-slate-600 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

