"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaseStudyGalleryItem } from "@/src/types/case-study";

interface Props {
  items: CaseStudyGalleryItem[];
}

export default function GalleryCarousel({ items }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = useCallback(() => {
    setActiveIdx((i) => (i === 0 ? items.length - 1 : i - 1));
  }, [items.length]);

  const next = useCallback(() => {
    setActiveIdx((i) => (i === items.length - 1 ? 0 : i + 1));
  }, [items.length]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!lightboxOpen) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightboxOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, prev, next]);

  return (
    <>
      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => { setActiveIdx(i); setLightboxOpen(true); }}
            className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group cursor-pointer"
          >
            <Image
              src={item.url}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {item.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-[10px] leading-tight">{item.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="relative w-full max-w-5xl mx-12 aspect-video">
              <Image
                src={items[activeIdx].url}
                alt={items[activeIdx].alt}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Caption */}
            {items[activeIdx].caption && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2">
                <p className="text-white text-sm">{items[activeIdx].caption}</p>
              </div>
            )}

            {/* Dots */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === activeIdx ? "w-6 bg-cyan-400" : "w-1.5 bg-white/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
