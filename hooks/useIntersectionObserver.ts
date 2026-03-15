"use client";
import { useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for Intersection Observer (used for infinite scroll).
 * @param onIntersect - Callback fired when the observed element enters the viewport
 * @param enabled - Whether observation is active
 */
export function useIntersectionObserver(
  onIntersect: () => void,
  enabled: boolean
) {
  const ref = useRef<HTMLDivElement | null>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && enabled) {
        onIntersect();
      }
    },
    [onIntersect, enabled]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "200px", // Trigger 200px before reaching the element
      threshold: 0,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [callback]);

  return ref;
}
