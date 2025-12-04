"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";


export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    const trackView = async () => {
      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: pathname,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            referrer: document.referrer || undefined,
          }),
        });
      } catch {
      }
    };

    const timer = setTimeout(trackView, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
