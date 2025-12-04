import type { Project } from "@/lib/types";
import { createTranslator } from "@/lib/i18n";
import { Icon } from "./ui/Icon";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const gradients = [
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-orange-500 via-red-500 to-pink-500",
  "from-blue-500 via-indigo-500 to-purple-500",
  "from-pink-500 via-rose-500 to-red-500",
  "from-cyan-500 via-blue-500 to-indigo-500",
];


export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const t = createTranslator("en");
  const gradient = gradients[index % gradients.length];

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm transition-all duration-500 hover:border-white/10 hover:bg-zinc-900/80 card-hover">
      <div className={`relative h-40 bg-gradient-to-br ${gradient} p-6 sm:h-48`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl font-bold text-white/10 transition-transform duration-500 group-hover:scale-110 sm:text-8xl">
            {project.title.en.charAt(0)}
          </span>
        </div>

        {project.featured && (
          <div className="absolute right-4 top-4 rounded-full bg-black/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            Featured
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="mb-3 text-lg font-semibold text-white transition-colors group-hover:text-indigo-400 sm:text-xl">
          {project.title.en}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm text-zinc-400 sm:text-base">
          {project.description.en}
        </p>

        <div className="mb-5 flex flex-wrap gap-1.5 sm:mb-6 sm:gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/5 px-2 py-1 text-xs font-medium text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-2.5 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-indigo-500/25"
            >
              {t("projects.viewProject")}
              <Icon name="external" size={14} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/10"
            >
              <Icon name="github" size={18} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
