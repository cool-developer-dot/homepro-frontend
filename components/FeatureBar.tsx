import { Clock, CheckCircle2, Star } from 'lucide-react';

export default function FeatureBar() {
  const features = [
    {
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      title: 'Available in 30 Minutes',
      desc: 'Quick & Reliable Service',
      ring: 'ring-blue-100 bg-blue-50',
    },
    {
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
      title: 'Upfront Pricing',
      desc: 'No Hidden Costs, Fixed Rates',
      ring: 'ring-emerald-100 bg-emerald-50',
    },
    {
      icon: <Star className="h-5 w-5 text-amber-600" />,
      title: 'Customer Reviews',
      desc: 'Trusted by Thousands',
      ring: 'ring-amber-100 bg-amber-50',
    },
  ];

  return (
    <section className="relative mt-10 md:mt-14 lg:mt-16 z-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass-card rounded-3xl p-5 md:p-6 bg-white shadow-2xl"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`h-10 w-10 rounded-full grid place-items-center ring-8 ${f.ring}`}
                >
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{f.title}</h3>
                  <p className="text-slate-600 text-sm mt-1">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

