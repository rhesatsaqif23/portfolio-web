"use client";

import { useEffect, useRef, useState } from "react";

type Options = { threshold?: number | number[]; rootMargin?: string };

const registry = new Map<
  string,
  {
    observer: IntersectionObserver;
    targets: Map<Element, (entry: IntersectionObserverEntry) => void>;
  }
>();

function getKey(options?: Options) {
  return JSON.stringify(options ?? {});
}

export default function useInView<T extends Element = Element>(
  options?: Options | number
) {
  const opts: Options =
    typeof options === "number" ? { threshold: options } : options ?? {};

  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  const keyRef = useRef(getKey(opts));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const key = keyRef.current;
    let record = registry.get(key);

    if (!record) {
      const targets = new Map<
        Element,
        (entry: IntersectionObserverEntry) => void
      >();
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const cb = targets.get(entry.target);
            if (cb) cb(entry);
          });
        },
        { threshold: opts.threshold, rootMargin: opts.rootMargin }
      );
      record = { observer, targets };
      registry.set(key, record);
    }

    const thresholdVal = Array.isArray(opts.threshold)
      ? opts.threshold[opts.threshold.length - 1]
      : opts.threshold ?? 0;

    const cb = (entry: IntersectionObserverEntry) => {
      const ratio = entry.intersectionRatio;
      const shouldBeVisible = ratio >= thresholdVal;
      setVisible((prev) => (prev === shouldBeVisible ? prev : shouldBeVisible));
    };

    record.targets.set(el, cb);
    record.observer.observe(el);

    return () => {
      record!.observer.unobserve(el);
      record!.targets.delete(el);
      if (record!.targets.size === 0) {
        record!.observer.disconnect();
        registry.delete(key);
      }
    };
    // intentionally not depending on opts to keep observer stable by options key
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return { ref, visible } as { ref: React.RefObject<T>; visible: boolean };
}
