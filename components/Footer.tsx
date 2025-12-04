import Link from "next/link";
import { createTranslator } from "@/lib/i18n";
import { profile } from "@/data";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];


export function Footer() {
  const t = createTranslator("en");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-zinc-950">
      <Container>
        <div className="py-16">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-50 blur" />
                  <svg className="relative h-10 w-10 rounded-xl" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="footer-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1"/>
                        <stop offset="100%" stopColor="#a855f7"/>
                      </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="6" fill="#09090b"/>
                    <path d="M21.5 11.5c0-2.5-2-4.5-5-4.5-3.5 0-6 2.5-6 5.5 0 2 1 3.5 3 4.5l4 2c1.5 0.8 2 1.5 2 2.5 0 1.5-1.5 2.5-3.5 2.5-1.5 0-2.5-0.5-3-1.5" stroke="url(#footer-grad)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  </svg>
                </div>
                <span className="text-lg font-semibold text-white">{profile.name.en}</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
                {profile.title.en} specialized in Laravel, React, and modern web architecture.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Navigation
              </h3>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Connect
              </h3>
              <div className="flex gap-3">
                <a
                  href={`https://github.com/${profile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white"
                  aria-label="GitHub"
                >
                  <Icon name="github" size={18} />
                </a>
                <a
                  href={`https://linkedin.com/in/${profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Icon name="linkedin" size={18} />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white"
                  aria-label="Email"
                >
                  <Icon name="mail" size={18} />
                </a>
                <a
                  href={`https://wa.me/${profile.whatsapp.number}?text=${encodeURIComponent(profile.whatsapp.message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all hover:border-green-500/50 hover:bg-green-500/10 hover:text-white"
                  aria-label="WhatsApp"
                >
                  <Icon name="whatsapp" size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
            <p className="text-sm text-zinc-500">
              © {currentYear} {profile.name.en}. {t("footer.copyright")}
            </p>
            <p className="flex items-center gap-1 text-sm text-zinc-500">
              Built with <span className="text-red-500">♥</span> by {profile.name.en.split(" ")[0]}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
