// Konfigurasi framer-motion global
export const fadeUpVariant = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export const viewportConfig = {
  once: false,
  amount: 0.2,
};

export const getSafeViewport = (amountIn: number = 0.2) => ({
  once: false,
  amount: amountIn,
});
