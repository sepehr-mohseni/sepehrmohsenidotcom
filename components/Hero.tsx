"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createTranslator } from "@/lib/i18n";
import { profile } from "@/data";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";


export function Hero() {
  const t = createTranslator("en");
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = profile.roles[roleIndex] ?? "";
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % profile.roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-indigo-500/20 blur-[100px]" />
        <div className="absolute right-1/4 top-1/2 h-96 w-96 animate-pulse rounded-full bg-purple-500/20 blur-[100px]" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/2 h-64 w-64 animate-pulse rounded-full bg-cyan-500/20 blur-[100px]" style={{ animationDelay: "2s" }} />
      </div>

      <Container className="relative flex min-h-[calc(100vh-5rem)] flex-col justify-center py-8 sm:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex items-center gap-4 lg:hidden">
            <div className="relative shrink-0 animate-fade-in">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-xl" />
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-white/10 shadow-xl">
                <Image
                  src={profile.photo}
                  alt={profile.name.en}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
            {profile.availableForWork && (
              <div className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for work
              </div>
            )}
          </div>

          <div className="max-w-4xl flex-1">
            {profile.availableForWork && (
              <div className="mb-6 hidden animate-fade-in items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 lg:inline-flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for new opportunities
              </div>
            )}

            <p className="mb-2 animate-fade-in text-base font-medium text-zinc-400 sm:mb-4 sm:text-lg" style={{ animationDelay: "0.1s" }}>
              {t("hero.greeting")}
            </p>

            <h1 className="mb-4 animate-fade-in text-4xl font-bold tracking-tight sm:mb-6 sm:text-6xl lg:text-7xl" style={{ animationDelay: "0.2s" }}>
              <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                {profile.name.en}
              </span>
            </h1>

            <div className="mb-6 flex h-10 items-center animate-fade-in sm:mb-8 sm:h-12" style={{ animationDelay: "0.3s" }}>
              <span className="text-xl font-semibold text-indigo-400 sm:text-3xl lg:text-4xl">
                {displayText}
              </span>
              <span className="ml-1 inline-block h-6 w-0.5 animate-blink bg-indigo-400 sm:h-10" />
            </div>

            <p className="mb-6 max-w-2xl animate-fade-in text-base leading-relaxed text-zinc-400 sm:mb-10 sm:text-lg" style={{ animationDelay: "0.4s" }}>
              {profile.bio.en}
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-in sm:gap-4" style={{ animationDelay: "0.5s" }}>
              <Link
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-base font-semibold text-white shadow-2xl shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 sm:px-8 sm:py-4 sm:text-lg"
              >
                <span className="relative z-10">{t("hero.cta")}</span>
                <Icon name="arrow-right" size={20} className="relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 sm:px-8 sm:py-4 sm:text-lg"
              >
                {t("hero.viewWork")}
                <Icon name="chevron-right" size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/resume"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 sm:px-8 sm:py-4 sm:text-lg"
              >
                <Icon name="edit" size={20} />
                Resume
              </Link>
            </div>

            <div className="mt-8 animate-fade-in sm:mt-12" style={{ animationDelay: "0.6s" }}>
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-zinc-500 sm:mb-4">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {profile.featuredStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white sm:px-4 sm:py-2"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative hidden animate-fade-in shrink-0 lg:block" style={{ animationDelay: "0.3s" }}>
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-2xl" />
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white/10 shadow-2xl">
              <Image
                src={profile.photo}
                alt={profile.name.en}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
