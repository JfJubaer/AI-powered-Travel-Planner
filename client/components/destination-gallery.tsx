"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DestinationGalleryImage {
  src: string;
  alt: string;
}

export function DestinationGallery({
  images,
  destinationName,
}: {
  images: DestinationGalleryImage[];
  destinationName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-border/60 bg-card shadow-soft">
        <div className="relative aspect-[4/3] sm:aspect-[16/10]">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent px-5 py-5 text-white">
          <p className="text-xs uppercase tracking-[0.24em] text-white/70">
            Gallery
          </p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/90 sm:text-base">
            {activeImage.alt}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-border/70 bg-card text-left transition-all",
              index === activeIndex
                ? "ring-2 ring-primary"
                : "hover:-translate-y-0.5 hover:shadow-soft",
            )}
            aria-label={`Show image ${index + 1} for ${destinationName}`}
            aria-pressed={index === activeIndex}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 33vw, 20vw"
                className={cn(
                  "object-cover transition duration-300",
                  index === activeIndex ? "scale-[1.02]" : "group-hover:scale-[1.03]",
                )}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
