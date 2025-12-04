
export const profile = {
  name: {
    en: "Sepehr Mohseni",
    fa: "سپهر محسنی",
  },
  title: {
    en: "Tech Lead | Senior Software Engineer",
    fa: "سرپرست تیم فنی | مهندس ارشد نرم‌افزار",
  },
  photo: "/images/portfolio/portrait.jpg",
  email: "isepehrmohseni@gmail.com",
  phone: "+995595016788",
  whatsapp: {
    number: "995595016788",
    message: "Hi Sepehr. I'm contacting for a software project.",
  },
  github: "sepehr-mohseni",
  linkedin: "sepehr-mohseni",
  website: "sepehrmohseni.com",
  location: {
    en: "Dubai, UAE",
    fa: "دبی، امارات",
  },
  availableForWork: true,
  
  roles: [
    "Tech Lead",
    "Senior Software Engineer",
    "Full Stack Developer",
    "Software Architect",
  ],
  
  featuredStack: [
    "Laravel",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "AWS",
  ],
  
  bio: {
    en: "Full-Stack Developer specialized in Laravel, React, and modern web architecture. I help teams modernize legacy systems, build scalable backends, and deliver fast, reliable PWAs. Experienced in API design, database optimization, and performance tuning, with strong focus on clean code and maintainability. Delivered projects across logistics, healthcare, travel, and e-commerce, often taking ownership from architecture to deployment.",
    fa: "توسعه‌دهنده فول‌استک متخصص در Laravel، React و معماری وب مدرن. به تیم‌ها کمک می‌کنم سیستم‌های قدیمی را مدرن کنند، بک‌اندهای مقیاس‌پذیر بسازند و PWAهای سریع و قابل اعتماد ارائه دهند.",
  },
  
  stats: [
    { value: "6+", labelEn: "Years Experience", labelFa: "سال تجربه" },
    { value: "50+", labelEn: "Projects Completed", labelFa: "پروژه تکمیل شده" },
    { value: "30+", labelEn: "Happy Clients", labelFa: "مشتری راضی" },
    { value: "4", labelEn: "Industries Served", labelFa: "صنعت" },
  ],
} as const;

export type Profile = typeof profile;
