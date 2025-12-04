# Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square&logo=prisma)

A modern, performant portfolio website with built-in analytics, blog engagement, and spam-protected contact form.

</div>

---

## ✨ Features

- Static Site Generation (SSG) for optimal SEO
- MDX blog with syntax highlighting
- Built-in analytics (no external dependencies)
- Blog likes & shares tracking
- Contact form with spam detection & rate limiting
- Auto SSL with Traefik + Let's Encrypt
- Docker deployment ready

---

## 🚀 Quick Start

```bash
# Clone & install
git clone <repo-url>
cd portfolio
npm install

# Setup database
cp .env.example .env
npx prisma db push

# Run
npm run dev
```

---

## ⚙️ Configuration

All personal data is in the `data/` folder:

| File | Content |
|------|---------|
| `data/profile.ts` | Name, bio, contact info |
| `data/skills.ts` | Tech stack |
| `data/experience.ts` | Work history |
| `data/projects.ts` | Portfolio projects |

---

## 📝 Blog Posts

Create MDX files in `content/blog/en/`:

```mdx
---
title: "Post Title"
description: "Description"
date: "2025-01-15"
tags: ["tag1", "tag2"]
---

Content here...
```

---

## 🐳 Docker Deployment

```bash
# First-time setup (interactive, auto SSL)
chmod +x deploy.sh
./deploy.sh setup

# Subsequent deployments
./deploy.sh deploy
```

Commands: `setup`, `deploy`, `up`, `down`, `logs`, `status`, `backup`, `restore`, `db`

---

## 🗄️ Database

SQLite with Prisma. Commands:

```bash
npm run db:push    # Apply schema
npm run db:studio  # GUI
```

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development |
| `npm run build` | Production build |
| `npm run start` | Start production |

---

## 🛠️ Tech Stack

- Next.js 16 (App Router, SSG)
- TypeScript
- Tailwind CSS v4
- SQLite + Prisma
- Traefik (auto SSL)
- MDX + rehype-pretty-code

---

## 📄 License

MIT
