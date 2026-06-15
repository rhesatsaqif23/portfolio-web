"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

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

  const imageSrc = error || !src ? fallbackSrc : src;

  return (
    <Image
      key={typeof src === "string" ? src : undefined}
      src={imageSrc}
      alt={alt || "Image"}
      onError={() => setError(true)}
      {...props}
    />
  );
}
