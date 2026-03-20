import Image from 'next/image';
import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-2 md:pt-1 lg:pt-2 pb-8 md:pb-10">
      {/* Background image with premium gradient overlay */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/bg-img.png"
          alt="City skyline with suburban neighborhood"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b2a4a]/80 via-[#0b2a4a]/60 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-6 lg:gap-8 items-end overflow-visible min-h-[76vh] md:min-h-[68vh]">
          {/* Center copy + search */}
          <div className="relative z-10 lg:col-span-7 lg:col-start-2 text-center md:text-left pt-7 sm:pt-8 md:pt-4 lg:pt-0 md:-translate-y-10 lg:-translate-y-14">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-sm leading-[1.04]">
              Your Home Services, On-Demand.
            </h1>
            <p className="mt-3 md:mt-4 text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto md:mx-0">
              Book Trusted Professionals for Any Job, Anytime.
            </p>

            <div className="mt-4 md:mt-5 lg:mt-6 max-w-4xl mx-auto md:mx-0">
              <SearchBar />
            </div>
          </div>

          {/* Mobile pro image - fully visible */}
          <div className="relative h-[250px] sm:h-[300px] md:hidden mt-1 z-[1]">
            <Image
              src="/men-img.png"
              alt="Home Services Technician"
              fill
              className="object-contain object-bottom drop-shadow-2xl"
              sizes="100vw"
            />
          </div>

          {/* Right pro image */}
          <div className="relative lg:col-span-5 lg:col-start-9 hidden md:block z-0">
            <div className="relative h-[420px] lg:h-[620px] translate-x-8 lg:translate-x-16 -mt-8 lg:-mt-12">
              <Image
                src="/men-img.png"
                alt="Home Services Technician"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(min-width: 1024px) 320px, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


