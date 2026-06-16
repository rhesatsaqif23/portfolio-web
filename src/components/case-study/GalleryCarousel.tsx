"use client";

import ImageWithFallback from "../common/ImageWithFallback";
import { useState, useCallback, useEffect } from "react";
import { CaseStudyGalleryItem } from "@/src/types/case-study";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/src/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  items: CaseStudyGalleryItem[];
}

export default function GalleryCarousel({ items }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const sync = () => setCurrent(api.selectedScrollSnap());
    api.on("select", sync);

    return () => {
      api.off("select", sync);
    };
  }, [api]);

  const count = items.length;

  const handlePrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const handleNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext]);

  if (items.length === 0) return null;

  const STORAGE = "https://ipkrjpftddtxwzmylxtf.supabase.co/storage/v1/object/public";

  function storageUrl(path: string) {
    if (!path) return "/images/fallback-icon.png";
    if (path.startsWith("http")) return path;
    return `${STORAGE}/${path}`;
  }

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full group/carousel"
      >
        <CarouselContent>
          {items.map((item, i) => (
            <CarouselItem key={i}>
              <div className="flex items-center justify-center p-2">
                <div className="relative w-full mx-auto aspect-[16/9] rounded-xl overflow-hidden border border-white/10 bg-black/40">
                  <ImageWithFallback
                    src={storageUrl(item.url)}
                    alt={item.alt || `Gallery image ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover"
                    priority={i === 0}
                  />
                  {item.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-4">
                      <p className="text-white text-xs md:text-sm leading-tight text-center">
                        {item.caption}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="left-4 md:-left-6 size-12 md:size-14 rounded-full border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl text-white/90 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300 disabled:opacity-0"
        >
          <ArrowLeft className="h-6 w-6 md:h-7 md:w-7" />
        </CarouselPrevious>
        <CarouselNext
          className="right-4 md:-right-6 size-12 md:size-14 rounded-full border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl text-white/90 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300 disabled:opacity-0"
        >
          <ArrowRight className="h-6 w-6 md:h-7 md:w-7" />
        </CarouselNext>
      </Carousel>

      {/* Slide counter & dots */}
      <div className="flex flex-col items-center gap-3 mt-4">
        <p className="text-white/60 text-sm font-medium">
          {current + 1} / {count}
        </p>
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === current ? "w-6 bg-cyan-400" : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
