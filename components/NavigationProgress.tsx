"use client";

import { useEffect, useState, useCallback } from "react";

export function NavigationProgress() {
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  const startNavigation = useCallback(() => {
    setIsNavigating(true);
    setProgress(0);
  }, []);

  const completeNavigation = useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      setIsNavigating(false);
      setProgress(0);
    }, 300);
  }, []);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;

    if (isNavigating && progress < 90) {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const increment = Math.random() * 15;
          return Math.min(prev + increment, 90);
        });
      }, 150);
    }

    return () => clearInterval(progressInterval);
  }, [isNavigating, progress]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (
        link &&
        link.href &&
        link.href.startsWith(window.location.origin) &&
        !link.href.includes("#") &&
        !link.target &&
        !e.ctrlKey &&
        !e.metaKey
      ) {
        startNavigation();
      }
    };

    const handlePopState = () => {
      startNavigation();
      setTimeout(completeNavigation, 500);
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("popstate", handlePopState);

    const observer = new MutationObserver(() => {
      if (isNavigating) {
        completeNavigation();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("popstate", handlePopState);
      observer.disconnect();
    };
  }, [isNavigating, startNavigation, completeNavigation]);

  if (!isNavigating) return null;

  return (
    <>
      {/* Progress bar at top */}
      <div className="fixed left-0 right-0 top-0 z-[100] h-1">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/50 transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
        {/* Glow effect at the end */}
        <div 
          className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent to-white/30 blur-sm transition-all duration-150"
          style={{ left: `calc(${progress}% - 6rem)` }}
        />
      </div>
      
      {/* Centered loading indicator */}
      <div className="pointer-events-none fixed inset-0 z-[99] flex items-center justify-center">
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute -inset-4 rounded-full bg-indigo-500/20 blur-xl animate-pulse" />
          
          {/* Main loader container */}
          <div className="relative flex items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/90 px-6 py-4 shadow-2xl backdrop-blur-md">
            {/* Animated dots loader */}
            <div className="flex items-center gap-1.5">
              <span 
                className="h-2.5 w-2.5 rounded-full bg-indigo-500 animate-bounce"
                style={{ animationDelay: "0ms", animationDuration: "600ms" }}
              />
              <span 
                className="h-2.5 w-2.5 rounded-full bg-purple-500 animate-bounce"
                style={{ animationDelay: "150ms", animationDuration: "600ms" }}
              />
              <span 
                className="h-2.5 w-2.5 rounded-full bg-pink-500 animate-bounce"
                style={{ animationDelay: "300ms", animationDuration: "600ms" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
