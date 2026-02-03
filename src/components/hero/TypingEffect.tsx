"use client";

import { useEffect, useState } from "react";

interface TypingEffectProps {
  text: string;
}

export default function TypingEffect({ text }: TypingEffectProps) {
  const [value, setValue] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const speed = deleting ? 50 : 80;
    let nestedTimeout: number | null = null;

    const timeout = window.setTimeout(() => {
      if (!deleting && value.length < text.length) {
        setValue(text.slice(0, value.length + 1));
      } else if (deleting && value.length > 0) {
        setValue(text.slice(0, value.length - 1));
      } else if (!deleting && value.length === text.length) {
        nestedTimeout = window.setTimeout(() => setDeleting(true), 1200);
      } else if (deleting && value.length === 0) {
        setDeleting(false);
      }
    }, speed);

    return () => {
      clearTimeout(timeout);
      if (nestedTimeout) clearTimeout(nestedTimeout);
    };
  }, [value, deleting, text]);

  return (
    <>
      {value}
      <span className="animate-pulse ml-1">|</span>
    </>
  );
}
