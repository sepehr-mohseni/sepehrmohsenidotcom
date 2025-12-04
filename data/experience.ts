import type { Experience } from "@/lib/types";

export const experiences: Experience[] = [
  {
    id: "rozamoon",
    company: {
      en: "RozaMoon",
      fa: "رزامون",
    },
    role: {
      en: "Technical Team Lead",
      fa: "سرپرست تیم فنی",
    },
    description: {
      en: "Leading technical teams and driving software architecture decisions in a hybrid work environment. Overseeing development of scalable solutions and mentoring engineering teams.",
      fa: "رهبری تیم‌های فنی و تصمیم‌گیری در معماری نرم‌افزار. نظارت بر توسعه راه‌حل‌های مقیاس‌پذیر و راهنمایی تیم‌های مهندسی.",
    },
    startDate: "2025-12",
    current: true,
    location: "Dubai, UAE · Hybrid",
    technologies: ["Laravel", "React", "Node.js", "NestJS", "AWS", "Docker"],
  },
  {
    id: "sepano-lead",
    company: {
      en: "Sepano",
      fa: "سپانو",
    },
    role: {
      en: "Technical Team Lead",
      fa: "سرپرست تیم فنی",
    },
    description: {
      en: "Leading technical teams, setting code standards, and guiding modernization efforts across teams. Architecting scalable solutions and overseeing full software development lifecycle.",
      fa: "رهبری تیم‌های فنی، تعیین استانداردهای کد و هدایت تلاش‌های مدرن‌سازی. معماری راه‌حل‌های مقیاس‌پذیر و نظارت بر چرخه کامل توسعه نرم‌افزار.",
    },
    startDate: "2024-04",
    current: true,
    location: "Isfahan, Iran · On-site",
    technologies: ["Laravel", "React.js", "Next.js", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
  },
  {
    id: "sepano-engineer",
    company: {
      en: "Sepano",
      fa: "سپانو",
    },
    role: {
      en: "Software Engineer",
      fa: "مهندس نرم‌افزار",
    },
    description: {
      en: "Architected and modernized tech stacks, migrating from legacy systems to modern frameworks. Built PWAs, redesigned admin panels, normalized database schemas, and implemented caching and queue optimizations.",
      fa: "معماری و مدرن‌سازی استک‌های فنی، مهاجرت از سیستم‌های قدیمی به فریمورک‌های مدرن. ساخت PWA، طراحی مجدد پنل‌های ادمین و بهینه‌سازی دیتابیس.",
    },
    startDate: "2019-10",
    endDate: "2024-03",
    current: false,
    location: "Isfahan, Iran · On-site",
    technologies: ["Laravel", "React.js", "Next.js", "PHP", "MySQL", "Redis"],
  },
  {
    id: "polsheer",
    company: {
      en: "Polsheer Architects",
      fa: "پل‌شیر معماران",
    },
    role: {
      en: "IT Technician",
      fa: "تکنسین IT",
    },
    description: {
      en: "Managed IT infrastructure and contributed to the corporate website. Developed custom solutions and provided technical support for the architectural firm.",
      fa: "مدیریت زیرساخت IT و مشارکت در وب‌سایت شرکتی. توسعه راه‌حل‌های سفارشی و ارائه پشتیبانی فنی برای شرکت معماری.",
    },
    startDate: "2018-04",
    endDate: "2019-04",
    current: false,
    location: "Isfahan, Iran · On-site",
    technologies: ["WordPress", "PHP", "JavaScript", "IT Support"],
  },
];

export function getAllExperiences(): Experience[] {
  return experiences.sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });
}
