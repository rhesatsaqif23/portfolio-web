"use client";

import dynamic from "next/dynamic";

// Dynamic import component StarsBackground
const StarsBackground = dynamic(() => import("./StarsBackground"), {
  ssr: false,
});

export default function ThemeBackground() {
  // Kita HAPUS useTheme di sini karena background angkasa ini selalu gelap
  // Jadi bintangnya harus selalu putih agar terlihat.

  return (
    <div className="fixed inset-0 -z-10">
      {/* LAYER 1: IMAGE BACKGROUND */}
      <div className="absolute inset-0 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat" />

      {/* LAYER 2: DARK OVERLAY GRADIENT */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-[#020617]/80 to-[#020617]/90" />

      {/* LAYER 3: STARS */}
      <StarsBackground
        starCount={120}
        starColor="#FFF" // WAJIB PUTIH agar terlihat di background gelap
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      />
    </div>
  );
}
