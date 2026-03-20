export type ServiceReview = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
};

export type ServiceDetails = {
  id: string;
  category: "Cleaning" | "Plumbing" | "Electrical" | "Handyman";
  title: string;
  description: string;
  priceFrom: number;
  duration: string;
  images: string[];
  reviews: ServiceReview[];
};

export const services: ServiceDetails[] = [
  {
    id: "deep-cleaning",
    category: "Cleaning",
    title: "Deep Home Cleaning",
    description:
      "A comprehensive top-to-bottom cleaning service designed for kitchens, bathrooms, bedrooms, and all high-touch areas. Ideal for seasonal refreshes, move-ins, and busy households that need a spotless reset.",
    priceFrom: 89,
    duration: "2-4 hours",
    images: [
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=1800&auto=format&fit=crop",
    ],
    reviews: [
      {
        id: "r1",
        userName: "Sarah M.",
        rating: 5,
        comment: "Arrived on time and left the entire house sparkling clean.",
        date: "2026-02-18",
      },
      {
        id: "r2",
        userName: "Jason T.",
        rating: 4,
        comment: "Great attention to detail, especially in the kitchen.",
        date: "2026-01-27",
      },
      {
        id: "r3",
        userName: "Amelia R.",
        rating: 5,
        comment: "Super professional team. Definitely booking again.",
        date: "2025-12-09",
      },
    ],
  },
  {
    id: "plumbing-repair",
    category: "Plumbing",
    title: "Plumbing Repair & Installation",
    description:
      "Expert plumbing support for leaks, clogs, faucet replacement, pipe fitting, and fixture installations. Our verified pros deliver fast diagnosis, clean workmanship, and durable results.",
    priceFrom: 74,
    duration: "1-3 hours",
    images: [
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=1800&auto=format&fit=crop",
    ],
    reviews: [
      {
        id: "r7",
        userName: "Daniel P.",
        rating: 5,
        comment: "Resolved a major sink leak in under an hour. Clean and professional.",
        date: "2026-03-03",
      },
      {
        id: "r8",
        userName: "Megha V.",
        rating: 4,
        comment: "Quick response and transparent pricing.",
        date: "2026-02-08",
      },
      {
        id: "r9",
        userName: "Chris L.",
        rating: 5,
        comment: "Installed new fixtures perfectly. Highly recommended.",
        date: "2025-12-16",
      },
    ],
  },
  {
    id: "electrical-repair",
    category: "Electrical",
    title: "Electrical Repair & Installation",
    description:
      "Certified professionals for safe, efficient electrical fixes and installations. From outlet repairs and lighting upgrades to breaker troubleshooting, we ensure compliant, reliable work.",
    priceFrom: 69,
    duration: "1-3 hours",
    images: [
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=1800&auto=format&fit=crop",
    ],
    reviews: [
      {
        id: "r4",
        userName: "Nora K.",
        rating: 5,
        comment: "Fixed our flickering lights quickly and explained everything clearly.",
        date: "2026-03-01",
      },
      {
        id: "r5",
        userName: "Liam D.",
        rating: 5,
        comment: "Very professional and safety-conscious.",
        date: "2026-02-11",
      },
      {
        id: "r6",
        userName: "Priya S.",
        rating: 4,
        comment: "Great service and fair pricing.",
        date: "2025-11-22",
      },
    ],
  },
  {
    id: "handyman-service",
    category: "Handyman",
    title: "Handyman Service",
    description:
      "Reliable all-around handyman help for furniture assembly, wall mounting, minor repairs, and routine home fixes. Perfect for punch lists and quick weekend projects.",
    priceFrom: 59,
    duration: "1-2 hours",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581141849291-1125c7b692b5?q=80&w=1800&auto=format&fit=crop",
    ],
    reviews: [
      {
        id: "r10",
        userName: "Olivia B.",
        rating: 5,
        comment: "Mounted shelves and TV unit flawlessly. Great attention to detail.",
        date: "2026-02-20",
      },
      {
        id: "r11",
        userName: "Ravi N.",
        rating: 4,
        comment: "Very punctual and completed all tasks quickly.",
        date: "2026-01-30",
      },
      {
        id: "r12",
        userName: "Emma W.",
        rating: 5,
        comment: "Excellent workmanship and polite service.",
        date: "2025-11-29",
      },
    ],
  },
];

export function getServiceById(id: string) {
  return services.find((service) => service.id === id);
}

export function getAverageRating(reviews: ServiceReview[]) {
  if (!reviews.length) return 0;
  const total = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}

