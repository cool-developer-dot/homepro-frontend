"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { getServiceById, services } from "@/lib/services-data";

type BookingFormValues = {
  serviceId: string;
  date: string;
  timeSlot: string;
};

const timeSlots = [
  "08:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 02:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
  "06:00 PM - 08:00 PM",
];

const steps = ["Select Service", "Select Date", "Select Time Slot", "Confirm Booking"] as const;

export default function BookingFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialServiceId = searchParams.get("service") ?? "";
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<BookingFormValues>({
    defaultValues: {
      serviceId: initialServiceId,
      date: "",
      timeSlot: "",
    },
    mode: "onTouched",
  });

  const selectedService = useMemo(() => getServiceById(watch("serviceId")), [watch("serviceId")]);
  const selectedDate = watch("date");
  const selectedTime = watch("timeSlot");

  const canProceed = async () => {
    if (step === 1) return trigger("serviceId");
    if (step === 2) return trigger("date");
    if (step === 3) return trigger("timeSlot");
    return true;
  };

  const goNext = async () => {
    const valid = await canProceed();
    if (!valid) return;
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const onConfirm = async () => {
    const valid = await trigger(["serviceId", "date", "timeSlot"]);
    if (!valid) return;
    setIsSubmitting(true);
    // API integration will be plugged here later.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    router.push("/");
  };

  return (
    <div className="w-full max-w-5xl">
      <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-xl shadow-slate-900/5 p-4 sm:p-6 md:p-8">
        <StepProgress step={step} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-7 space-y-4">
            {step === 1 && (
              <StepCard title="Select your service">
                <div className="grid gap-3">
                  {services.map((service) => {
                    const selected = watch("serviceId") === service.id;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => {
                          setValue("serviceId", service.id, { shouldValidate: true });
                        }}
                        className={`text-left rounded-xl border p-4 transition ${
                          selected
                            ? "border-slate-900 bg-slate-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <p className="font-semibold text-slate-900">{service.title}</p>
                        <p className="text-sm text-slate-600 mt-1">From ${service.priceFrom}</p>
                      </button>
                    );
                  })}
                </div>
                <input
                  type="hidden"
                  {...register("serviceId", { required: "Please select a service" })}
                />
                {errors.serviceId && <ErrorText>{errors.serviceId.message}</ErrorText>}
              </StepCard>
            )}

            {step === 2 && (
              <StepCard title="Select booking date">
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  {...register("date", { required: "Please choose a date" })}
                  className="h-11 w-full rounded-xl border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
                {errors.date && <ErrorText>{errors.date.message}</ErrorText>}
              </StepCard>
            )}

            {step === 3 && (
              <StepCard title="Select time slot">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {timeSlots.map((slot) => {
                    const selected = watch("timeSlot") === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setValue("timeSlot", slot, { shouldValidate: true })}
                        className={`rounded-xl border p-3 text-sm text-left transition ${
                          selected
                            ? "border-slate-900 bg-slate-50 font-medium"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="hidden"
                  {...register("timeSlot", { required: "Please select a time slot" })}
                />
                {errors.timeSlot && <ErrorText>{errors.timeSlot.message}</ErrorText>}
              </StepCard>
            )}

            {step === 4 && (
              <StepCard title="Confirm your booking details">
                <p className="text-sm text-slate-600">
                  Please review your booking summary and confirm when ready.
                </p>
              </StepCard>
            )}
          </section>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <h3 className="font-semibold text-slate-900">Booking Summary</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <SummaryRow label="Service" value={selectedService?.title ?? "Not selected"} />
                <SummaryRow label="Date" value={selectedDate || "Not selected"} />
                <SummaryRow label="Time" value={selectedTime || "Not selected"} />
                <SummaryRow
                  label="Price"
                  value={selectedService ? `$${selectedService.priceFrom}` : "Not selected"}
                />
              </dl>
            </div>
          </aside>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 1}
            className="h-10 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={goNext}
              className="h-10 px-5 rounded-xl text-white font-semibold bg-slate-900 hover:bg-slate-800 inline-flex items-center gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onConfirm}
              disabled={isSubmitting}
              className="h-11 px-6 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/30 inline-flex items-center gap-2 disabled:opacity-70"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepProgress({ step }: { step: number }) {
  return (
    <ol className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {steps.map((label, index) => {
        const number = index + 1;
        const active = step === number;
        const done = step > number;

        return (
          <li key={label} className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full grid place-items-center text-sm font-semibold ${
                done
                  ? "bg-emerald-500 text-white"
                  : active
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-500"
              }`}
            >
              {done ? <Check className="h-4 w-4" /> : number}
            </div>
            <span className={`text-xs sm:text-sm ${active ? "text-slate-900 font-medium" : "text-slate-500"}`}>
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function StepCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-slate-900 font-medium text-right">{value}</dd>
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-xs text-rose-600">{children}</p>;
}

