"use client";

import type { Experience, Project } from "@/lib/types";
import { profile } from "@/data";

interface ResumeContentProps {
  experiences: Experience[];
  projects: Project[];
  skills: Record<string, string[]>;
}

export function ResumeContent({ experiences, projects, skills }: ResumeContentProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="resume-page fixed inset-0 z-[100] min-h-screen overflow-auto bg-white text-zinc-900">
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-zinc-200 bg-zinc-800 px-4 py-3 print:hidden sm:px-6">
        <a
          href="/"
          className="flex items-center gap-2 rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Site
        </a>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:bg-indigo-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Download PDF
        </button>
      </div>

      <div className="mx-auto max-w-[850px] px-8 py-8 print:max-w-none print:px-0 print:py-0">
        <header className="mb-8 border-b-2 border-indigo-600 pb-6">
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-indigo-600">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.photo}
                alt={profile.name.en}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="flex-1">
              <h1 className="mb-1 text-4xl font-bold text-zinc-900">{profile.name.en}</h1>
              <p className="mb-4 text-xl text-indigo-600">{profile.title.en}</p>
              <div className="flex flex-wrap gap-4 text-sm text-zinc-600">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-1 hover:text-indigo-600">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {profile.email}
                </a>
                <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-indigo-600">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  github.com/{profile.github}
                </a>
                <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-indigo-600">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  linkedin.com/in/{profile.linkedin}
                </a>
              </div>
            </div>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold uppercase tracking-wide text-indigo-600">Summary</h2>
          <p className="text-sm leading-relaxed text-zinc-700">{profile.bio.en}</p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold uppercase tracking-wide text-indigo-600">Experience</h2>
          <div className="space-y-5">
            {experiences.map((exp) => (
              <div key={exp.id} className="border-l-2 border-zinc-200 pl-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-zinc-900">{exp.role.en}</h3>
                  <span className="text-sm text-zinc-500">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate!)}
                  </span>
                </div>
                <p className="text-sm font-medium text-indigo-600">{exp.company.en}</p>
                <p className="mb-2 text-xs text-zinc-500">{exp.location}</p>
                <p className="text-sm text-zinc-600">{exp.description.en}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {exp.technologies.slice(0, 6).map((tech) => (
                    <span key={tech} className="rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold uppercase tracking-wide text-indigo-600">Skills</h2>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category}>
                <h3 className="mb-1 font-semibold capitalize text-zinc-800">{category}</h3>
                <p className="text-xs text-zinc-600">{skillList.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold uppercase tracking-wide text-indigo-600">Featured Projects</h2>
          <div className="space-y-4">
            {projects.slice(0, 4).map((project) => (
              <div key={project.id} className="border-l-2 border-zinc-200 pl-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-semibold text-zinc-900">{project.title.en}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 hover:underline print:text-zinc-500">
                      {project.link.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                  {project.github && !project.link && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 hover:underline print:text-zinc-500">
                      GitHub
                    </a>
                  )}
                </div>
                <p className="mt-1 text-sm text-zinc-600">{project.description.en}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t border-zinc-200 pt-4 text-center text-xs text-zinc-500">
          <p>References available upon request • Portfolio: {profile.website}</p>
        </footer>
      </div>
    </div>
  );
}
