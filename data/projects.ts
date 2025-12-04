import type { Project } from "@/lib/types";


export const commercialProjects: Project[] = [
  {
    id: "intellident",
    title: {
      en: "Intellident - Dental Software Suite",
      fa: "اینتلیدنت - نرم‌افزار دندانپزشکی",
    },
    description: {
      en: "Next-generation dental software with Laravel backend and React.js admin panel. Features patient management, appointments, billing automation, and OpenAI-powered tools for image analysis, facial recognition, and voice transcription.",
      fa: "نرم‌افزار دندانپزشکی نسل جدید با بک‌اند Laravel و پنل ادمین React.js. شامل مدیریت بیمار، نوبت‌دهی، اتوماسیون صورتحساب و ابزارهای هوش مصنوعی.",
    },
    tags: ["Laravel", "React.js", "OpenAI", "MySQL", "REST API"],
    link: "https://intellident.ai",
    featured: true,
  },
  {
    id: "shipnow",
    title: {
      en: "ShipNow - Logistics Platform",
      fa: "شیپ‌نو - پلتفرم لجستیک",
    },
    description: {
      en: "Complete tech stack modernization from legacy Symfony 2.8/PHP 5 to Laravel. Built a Next.js PWA from scratch, redesigned React.js admin panel, normalized database schema, and implemented caching and queue optimizations.",
      fa: "مدرن‌سازی کامل از Symfony 2.8/PHP 5 به Laravel. ساخت PWA با Next.js، طراحی مجدد پنل ادمین با React.js، نرمال‌سازی دیتابیس و بهینه‌سازی کش و صف.",
    },
    tags: ["Laravel", "Next.js", "React.js", "PostgreSQL", "Redis", "PWA"],
    link: "https://shipnow.ir",
    featured: true,
  },
  {
    id: "hobilar",
    title: {
      en: "Hobilar - Travel Platform",
      fa: "هوبیلار - پلتفرم سفر",
    },
    description: {
      en: "End-to-end travel platform built from scratch with Laravel backend and Next.js PWA frontend. Features SEO-friendly progressive web app, secure authentication, booking flows, and admin tools for full business operations.",
      fa: "پلتفرم سفر از صفر با بک‌اند Laravel و فرانت‌اند Next.js PWA. شامل وب‌اپ پیشرو سئو-فرندلی، احراز هویت امن، فرآیند رزرو و ابزارهای مدیریت.",
    },
    tags: ["Laravel", "Next.js", "PWA", "REST API", "MySQL"],
    link: "https://hobilar.com",
    featured: true,
  },
  {
    id: "ivy-tile",
    title: {
      en: "Ivy Tile - E-Commerce Platform",
      fa: "آیوی تایل - پلتفرم فروشگاهی",
    },
    description: {
      en: "Custom WooCommerce development with PHP plugins for advanced pricing logic, order management, and stock synchronization. Improved backend performance and collaborated with design teams for smooth feature rollouts.",
      fa: "توسعه سفارشی WooCommerce با پلاگین‌های PHP برای منطق قیمت‌گذاری پیشرفته، مدیریت سفارش و همگام‌سازی موجودی.",
    },
    tags: ["WordPress", "WooCommerce", "PHP", "MySQL", "REST API"],
    link: "https://ivytile.ae",
    featured: false,
  },
  {
    id: "polsheer",
    title: {
      en: "Polsheer Architects - Corporate Website",
      fa: "پل‌شیر معماران - وب‌سایت شرکتی",
    },
    description: {
      en: "WordPress corporate website with custom PHP plugins, frontend improvements for better usability and responsiveness, and multilingual support with cross-version compatibility.",
      fa: "وب‌سایت شرکتی وردپرس با پلاگین‌های سفارشی PHP، بهبود فرانت‌اند برای کاربردپذیری و واکنش‌گرایی بهتر و پشتیبانی چندزبانه.",
    },
    tags: ["WordPress", "PHP", "JavaScript", "MySQL", "Multilingual"],
    link: "https://polsheer.org",
    featured: false,
  },
];

export const openSourceProjects: Project[] = [
  {
    id: "turbo-engine",
    title: {
      en: "TurboEngine - VRP Optimization Engine",
      fa: "توربو انجین - موتور بهینه‌سازی مسیریابی",
    },
    description: {
      en: "High-performance Vehicle Routing Problem (VRP) optimization engine written in Rust. Features 12+ algorithms including ALNS, HGS, Simulated Annealing, and Tabu Search. Supports real-world routing with OpenStreetMap integration, parallel construction, and multiple interfaces (REST API, gRPC, CLI).",
      fa: "موتور بهینه‌سازی مسیریابی خودرو با کارایی بالا نوشته شده با Rust. شامل ۱۲+ الگوریتم و پشتیبانی از مسیریابی واقعی با OpenStreetMap.",
    },
    tags: ["Rust", "Algorithms", "REST API", "gRPC", "OpenStreetMap"],
    github: "https://github.com/sepehr-mohseni/turbo-engine",
    featured: true,
  },
  {
    id: "odin",
    title: {
      en: "Odin - API Gateway",
      fa: "اودین - دروازه API",
    },
    description: {
      en: "Feature-rich API Gateway written in Go. Includes load balancing, JWT/OAuth2 authentication, rate limiting, caching, circuit breaker, WebSocket proxying, GraphQL proxy, gRPC support, WASM extensions, and multi-cluster global load balancing. Comes with admin interface and Prometheus monitoring.",
      fa: "دروازه API کامل نوشته شده با Go. شامل توزیع بار، احراز هویت، محدودیت نرخ، کش، پروکسی GraphQL و gRPC، و پشتیبانی چند کلاستر.",
    },
    tags: ["Go", "API Gateway", "gRPC", "GraphQL", "WebSocket", "WASM"],
    github: "https://github.com/sepehr-mohseni/odin",
    featured: true,
  },
];


export const projects: Project[] = [...commercialProjects, ...openSourceProjects];


export function getAllProjects(): Project[] {
  return projects;
}


export function getCommercialProjects(): Project[] {
  return commercialProjects;
}


export function getOpenSourceProjects(): Project[] {
  return openSourceProjects;
}


export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}


export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
