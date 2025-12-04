"use client";

import { useState, useEffect, useCallback } from "react";
import { createTranslator } from "@/lib/i18n";
import { getCommercialProjects, getOpenSourceProjects } from "@/data/projects";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";

const gradients = [
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-orange-500 via-red-500 to-pink-500",
  "from-blue-500 via-indigo-500 to-purple-500",
  "from-pink-500 via-rose-500 to-red-500",
];

type ProjectType = "commercial" | "opensource";


export function ProjectsGrid() {
  const t = createTranslator("en");
  const [projectType, setProjectType] = useState<ProjectType>("commercial");
  const [currentIndex, setCurrentIndex] = useState(0);

  const commercialProjects = getCommercialProjects();
  const openSourceProjects = getOpenSourceProjects();
  const projects = projectType === "commercial" ? commercialProjects : openSourceProjects;

  useEffect(() => {
    setCurrentIndex(0);
  }, [projectType]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentProject = projects[currentIndex];
  const gradient = gradients[currentIndex % gradients.length];

  return (
    <section id="projects" className="relative scroll-mt-20 py-16 sm:py-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/3 h-[600px] w-[600px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <Container>
        <div className="mb-10 text-center sm:mb-12">
          <span className="mb-4 inline-block rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-400">
            Portfolio
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {t("projects.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-zinc-400 sm:text-lg">
            {t("projects.subtitle")}
          </p>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
        </div>

        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
            <button
              onClick={() => setProjectType("commercial")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all sm:px-6 ${
                projectType === "commercial"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Icon name="globe" size={16} />
              <span>Commercial</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                {commercialProjects.length}
              </span>
            </button>
            <button
              onClick={() => setProjectType("opensource")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all sm:px-6 ${
                projectType === "opensource"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Icon name="github" size={16} />
              <span>Open Source</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                {openSourceProjects.length}
              </span>
            </button>
          </div>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm">
            <div className={`h-2 bg-gradient-to-r ${gradient} transition-all duration-500`} />

            <div className="p-6 sm:p-8">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white sm:text-2xl">
                  {currentProject?.title.en}
                </h3>
                <div className="flex items-center gap-2">
                  {currentProject?.featured && (
                    <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-400">
                      Featured
                    </span>
                  )}
                  <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-zinc-400">
                    {currentIndex + 1} / {projects.length}
                  </span>
                </div>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-zinc-400 sm:text-base">
                {currentProject?.description.en}
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {currentProject?.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {currentProject?.link && (
                  <a
                    href={currentProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-indigo-500/25"
                  >
                    Visit Website
                    <Icon name="external" size={16} />
                  </a>
                )}
                {currentProject?.github && (
                  <a
                    href={currentProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/10"
                  >
                    <Icon name="github" size={18} />
                    View on GitHub
                  </a>
                )}
              </div>
            </div>

            {projects.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:left-4 sm:h-12 sm:w-12"
                  aria-label="Previous project"
                >
                  <Icon name="chevron-left" size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:right-4 sm:h-12 sm:w-12"
                  aria-label="Next project"
                >
                  <Icon name="chevron-right" size={24} />
                </button>
              </>
            )}
          </div>

          {projects.length > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? `w-8 bg-gradient-to-r ${projectType === "commercial" ? "from-indigo-500 to-purple-500" : "from-emerald-500 to-teal-500"}`
                      : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          )}

          <div className="mt-6 hidden gap-3 sm:flex">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => goToSlide(index)}
                className={`flex-1 rounded-xl border p-3 text-left transition-all ${
                  index === currentIndex
                    ? projectType === "commercial"
                      ? "border-indigo-500/50 bg-indigo-500/10"
                      : "border-emerald-500/50 bg-emerald-500/10"
                    : "border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10"
                }`}
              >
                <div className={`mb-2 h-1.5 w-8 rounded-full bg-gradient-to-r ${gradients[index % gradients.length]}`} />
                <p className="truncate text-sm font-medium text-white">
                  {project.title.en}
                </p>
                <p className="truncate text-xs text-zinc-500">
                  {project.tags.slice(0, 2).join(" • ")}
                </p>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
