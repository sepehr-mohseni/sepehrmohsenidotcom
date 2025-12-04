"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { createTranslator } from "@/lib/i18n";
import { profile } from "@/data";
import { Icon } from "./ui/Icon";

const navItems = [
  { label: "Home", href: "/", section: null },
  { label: "About", href: "/#about", section: "about" },
  { label: "Projects", href: "/#projects", section: "projects" },
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "Blog", href: "/blog", section: null },
  { label: "Contact", href: "/#contact", section: "contact" },
];


export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const t = createTranslator("en");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const isHomePage = pathname === "/" || pathname === "";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      if (!isHomePage) return;

      const sections = ["about", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 100;

      if (window.scrollY < 200) {
        setActiveSection(null);
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const hash = href.substring(1); 

      if (isHomePage) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(href);
      }
    }
    setIsMobileMenuOpen(false);
  };

  const isItemActive = (item: (typeof navItems)[0]) => {
    if (item.href === "/blog") {
      return pathname.startsWith("/blog");
    }

    if (item.href === "/" && item.section === null) {
      return isHomePage && activeSection === null;
    }

    if (item.section && isHomePage) {
      return activeSection === item.section;
    }

    return false;
  };

  return (
    <header
      className={clsx(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled
          ? "border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group relative flex shrink-0 items-center gap-3"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-70 blur transition-all group-hover:opacity-100 group-hover:blur-md" />
            <svg className="relative h-10 w-10 rounded-xl" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="header-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1"/>
                  <stop offset="100%" stopColor="#a855f7"/>
                </linearGradient>
              </defs>
              <rect width="32" height="32" rx="6" fill="#09090b"/>
              <path d="M21.5 11.5c0-2.5-2-4.5-5-4.5-3.5 0-6 2.5-6 5.5 0 2 1 3.5 3 4.5l4 2c1.5 0.8 2 1.5 2 2.5 0 1.5-1.5 2.5-3.5 2.5-1.5 0-2.5-0.5-3-1.5" stroke="url(#header-grad)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <span className="hidden text-lg font-semibold text-white lg:block">
            {profile.name.en}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = isItemActive(item);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={clsx(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 lg:px-4",
                  isActive ? "text-white" : "text-zinc-400 hover:text-white"
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-lg bg-white/10" />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={isHomePage ? "#contact" : "/#contact"}
            onClick={(e) => handleNavClick(e, "/#contact")}
            className="group relative hidden overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-indigo-500/25 sm:block lg:px-5 lg:py-2.5"
          >
            <span className="relative z-10">Let&apos;s Talk</span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Icon name={isMobileMenuOpen ? "close" : "menu"} size={24} />
          </button>
        </div>
      </nav>

      <div
        className={clsx(
          "border-t border-white/5 bg-zinc-950/98 backdrop-blur-xl transition-all duration-300 md:hidden",
          isMobileMenuOpen
            ? "max-h-[calc(100vh-4rem)] opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        )}
      >
        <div className="max-w-full overflow-x-hidden px-4 py-4">
          {navItems.map((item) => {
            const isActive = isItemActive(item);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={clsx(
                  "block rounded-lg px-4 py-3 text-base font-medium transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={isHomePage ? "#contact" : "/#contact"}
            onClick={(e) => handleNavClick(e, "/#contact")}
            className="mt-4 block rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-3 text-center text-base font-medium text-white"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </header>
  );
}
