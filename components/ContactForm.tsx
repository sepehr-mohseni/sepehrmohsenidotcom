"use client";

import { useState, type FormEvent } from "react";
import { createTranslator } from "@/lib/i18n";
import { profile } from "@/data";
import { validateContactForm, type ValidationError } from "@/lib/validation";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";

const socialLinks = [
  { name: "GitHub", icon: "github" as const, url: `https://github.com/${profile.github}` },
  { name: "LinkedIn", icon: "linkedin" as const, url: `https://linkedin.com/in/${profile.linkedin}` },
  { name: "Email", icon: "mail" as const, url: `mailto:${profile.email}` },
  { name: "WhatsApp", icon: "whatsapp" as const, url: `https://wa.me/${profile.whatsapp.number}?text=${encodeURIComponent(profile.whatsapp.message)}` },
];


export function ContactForm() {
  const t = createTranslator("en");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "ratelimit">("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      honeypot: formData.get("website") as string,
    };

    const validation = validateContactForm(data);
    if (!validation.valid) {
      const errors: Record<string, string> = {};
      validation.errors.forEach((err: ValidationError) => {
        errors[err.field] = err.message;
      });
      setFieldErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 429) {
        setStatus("ratelimit");
      } else if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        const result = await response.json();
        if (result.errors) {
          const errors: Record<string, string> = {};
          result.errors.forEach((err: ValidationError) => {
            errors[err.field] = err.message;
          });
          setFieldErrors(errors);
        }
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-20 py-16 sm:py-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/5 blur-[100px]" />
      </div>

      <Container>
        <div className="mb-10 text-center sm:mb-12">
          <span className="mb-4 inline-block rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-1.5 text-sm font-medium text-pink-400">
            Contact
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {t("contact.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-zinc-400 sm:text-lg">
            {t("contact.subtitle")}
          </p>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-pink-500 to-rose-500" />
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2 lg:gap-10">
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white sm:mb-6 sm:text-2xl">
              Let&apos;s build something amazing together
            </h3>
            <p className="mb-6 text-sm text-zinc-400 sm:mb-8 sm:text-base">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-3 sm:space-y-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-3 transition-all hover:border-indigo-500/30 hover:bg-white/10 sm:p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 sm:h-12 sm:w-12">
                    <Icon name={social.icon} size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{social.name}</div>
                    <div className="text-xs text-zinc-400 sm:text-sm">Connect with me</div>
                  </div>
                  <Icon name="arrow-right" size={20} className="ml-auto text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-indigo-400" />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-zinc-900/50 p-5 backdrop-blur-sm sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
                  {t("contact.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  minLength={2}
                  maxLength={100}
                  placeholder={t("contact.namePlaceholder")}
                  className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder-zinc-500 transition-all focus:bg-white/10 focus:outline-none focus:ring-2 ${
                    fieldErrors.name
                      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                      : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500/20"
                  }`}
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-sm text-red-400">{fieldErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={254}
                  placeholder={t("contact.emailPlaceholder")}
                  className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder-zinc-500 transition-all focus:bg-white/10 focus:outline-none focus:ring-2 ${
                    fieldErrors.email
                      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                      : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500/20"
                  }`}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-400">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  minLength={10}
                  maxLength={5000}
                  placeholder={t("contact.messagePlaceholder")}
                  className={`w-full resize-none rounded-xl border bg-white/5 px-4 py-3 text-white placeholder-zinc-500 transition-all focus:bg-white/10 focus:outline-none focus:ring-2 ${
                    fieldErrors.message
                      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                      : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500/20"
                  }`}
                />
                {fieldErrors.message && (
                  <p className="mt-1 text-sm text-red-400">{fieldErrors.message}</p>
                )}
              </div>

              {status === "success" && (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400">
                  <Icon name="check" size={20} />
                  {t("contact.success")}
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
                  <Icon name="close" size={20} />
                  {t("contact.error")}
                </div>
              )}
              {status === "ratelimit" && (
                <div className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-amber-400">
                  <Icon name="clock" size={20} />
                  Too many submissions. Please try again later.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-50 sm:py-4 sm:text-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {t("contact.sending")}
                    </>
                  ) : (
                    <>
                      {t("contact.send")}
                      <Icon name="arrow-right" size={20} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
