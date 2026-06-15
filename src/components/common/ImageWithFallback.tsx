"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

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

  // Reset error state if src changes
  useEffect(() => {
    setError(false);
  }, [src]);

  const imageSrc = error || !src ? fallbackSrc : src;

  return (
    <Image
      src={imageSrc}
      alt={alt || "Image"}
      onError={() => setError(true)}
      {...props}
    />
  );
}
