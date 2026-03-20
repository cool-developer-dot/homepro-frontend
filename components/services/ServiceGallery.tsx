"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  title: string;
  images: string[];
};

export default function ServiceGallery({ title, images }: Props) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <section className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-slate-200 shadow-xl shadow-slate-900/5">
        <Image
          src={activeImage}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 60vw, 100vw"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((image, index) => {
            const isActive = image === activeImage;
            return (
              <button
                key={image + index}
                type="button"
                onClick={() => setActiveImage(image)}
                className={`relative aspect-[4/3] overflow-hidden rounded-xl ring-2 transition ${
                  isActive ? "ring-slate-900" : "ring-transparent hover:ring-slate-300"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`${title} preview ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 20vw, 30vw"
                />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

