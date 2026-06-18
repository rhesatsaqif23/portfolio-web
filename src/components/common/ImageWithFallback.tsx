"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

const STORAGE_HOST = "ipkrjpftddtxwzmylxtf.supabase.co";

interface Props extends ImageProps {
  fallbackSrc?: string;
}

export default function ImageWithFallback({
  src,
  fallbackSrc = "/images/fallback-icon.png",
  alt,
  ...props
}: Props) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const isFromStorage =
    typeof src === "string" && src.includes(STORAGE_HOST);
  const imageSrc = error || !src ? fallbackSrc : src;

  return (
    <div className="relative w-full h-full">
      {!loaded && !error && src && (
        <div className="absolute inset-0 animate-pulse bg-white/5" />
      )}
      <Image
        key={typeof src === "string" ? src : undefined}
        src={imageSrc}
        alt={alt || "Image"}
        unoptimized={isFromStorage}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ${loaded || error ? "opacity-100" : "opacity-0"} ${props.className || ""}`}
        {...props}
      />
    </div>
  );
}
