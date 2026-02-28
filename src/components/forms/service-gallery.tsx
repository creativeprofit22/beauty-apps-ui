"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  name: string;
  price: string;
  duration: string;
  image?: string;
}

interface ServiceGalleryProps {
  services: Service[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

/**
 * ServiceGallery — horizontal scroll-snap carousel.
 * 72vw cards, image with gradient overlay, service name/price/duration.
 */
export function ServiceGallery({
  services,
  selectedId,
  onSelect,
  className,
}: ServiceGalleryProps) {
  return (
    <div
      className={cn(
        "flex gap-4 overflow-x-auto overscroll-x-contain",
        className,
      )}
      style={{
        scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        padding: "1rem",
      }}
      role="listbox"
      aria-label="Services"
    >
      {services.map((service) => {
        const isSelected = service.id === selectedId;

        return (
          <button
            key={service.id}
            type="button"
            role="option"
            aria-selected={isSelected}
            onClick={() => onSelect?.(service.id)}
            className={cn(
              "relative shrink-0 rounded-xl overflow-hidden shadow-card",
              "transition-[transform,box-shadow] duration-normal ease-standard",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              "active:scale-[0.97]",
              isSelected && "ring-2 ring-primary",
            )}
            style={{
              flex: "0 0 72vw",
              maxWidth: "320px",
              scrollSnapAlign: "start",
              aspectRatio: "4 / 3",
            }}
          >
            {/* Image or placeholder */}
            <div className="absolute inset-0 bg-surface-sunken">
              {service.image ? (
                <Image
                  src={service.image}
                  alt=""
                  fill
                  className="object-cover"
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary-muted), var(--secondary-muted))",
                  }}
                />
              )}
            </div>

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, oklch(0 0 0 / 0.7) 0%, oklch(0 0 0 / 0.2) 50%, transparent 100%)",
              }}
              aria-hidden="true"
            />

            {/* Service info */}
            <div className="absolute inset-x-0 bottom-0 p-4 text-left">
              <h3 className="text-base font-medium text-white truncate">{service.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-semibold text-white/90">
                  {service.price}
                </span>
                <span className="text-xs text-white/60">·</span>
                <span className="text-xs text-white/70">{service.duration}</span>
              </div>
            </div>

            {/* Selected indicator */}
            {isSelected && (
              <div className="absolute top-3 right-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 7L6 10L11 4"
                      stroke="var(--text-on-accent)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
