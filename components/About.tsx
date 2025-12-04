import { createTranslator } from "@/lib/i18n";
import { profile, skills, type SkillCategory } from "@/data";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";

const categoryConfig: Record<SkillCategory, { icon: "globe" | "github" | "external"; gradient: string }> = {
  frontend: { icon: "globe", gradient: "from-indigo-500 to-purple-500" },
  backend: { icon: "github", gradient: "from-emerald-500 to-cyan-500" },
  databases: { icon: "external", gradient: "from-blue-500 to-cyan-500" },
  devops: { icon: "external", gradient: "from-orange-500 to-pink-500" },
  ai: { icon: "external", gradient: "from-violet-500 to-fuchsia-500" },
  other: { icon: "external", gradient: "from-amber-500 to-orange-500" },
};


export function About() {
  const t = createTranslator("en");

  const skillCategories: { key: SkillCategory; label: string }[] = [
    { key: "frontend", label: t("skills.frontend") },
    { key: "backend", label: t("skills.backend") },
    { key: "databases", label: t("skills.databases") },
    { key: "devops", label: t("skills.devops") },
    { key: "ai", label: t("skills.ai") },
    { key: "other", label: t("skills.other") },
  ];

  return (
    <section id="about" className="relative scroll-mt-20 py-16 sm:py-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[100px]" />
      </div>

      <Container>
        <div className="mb-10 text-center sm:mb-12">
          <span className="mb-4 inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400">
            About Me
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {t("about.title")}
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
        </div>

        <div className="mb-10 grid grid-cols-2 gap-4 sm:mb-12 sm:gap-6 md:grid-cols-4">
          {profile.stats.map((stat) => (
            <div
              key={stat.labelEn}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-4 text-center backdrop-blur-sm transition-all hover:border-indigo-500/30 hover:bg-white/10 sm:p-6"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-1 text-3xl font-bold text-white sm:mb-2 sm:text-4xl">{stat.value}</div>
              <div className="text-xs text-zinc-400 sm:text-sm">{stat.labelEn}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center">
            <div className="space-y-6 text-base leading-relaxed text-zinc-400 sm:text-lg">
              <p className="first-letter:float-left first-letter:mr-3 first-letter:text-4xl first-letter:font-bold first-letter:text-indigo-400 sm:first-letter:text-5xl">
                {t("about.paragraph1")}
              </p>
              <p>{t("about.paragraph2")}</p>
            </div>

            <div className="mt-8 sm:mt-10">
              <a
                href="/resume"
                className="group inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 font-medium text-white transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 sm:px-6 sm:py-3"
              >
                <Icon name="edit" size={20} />
                View Resume
                <span className="text-zinc-500 transition-colors group-hover:text-indigo-400">→</span>
              </a>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {skillCategories.map((category) => {
              const config = categoryConfig[category.key];
              return (
                <div
                  key={category.key}
                  className="group rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/[0.07] sm:p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${config.gradient}`}>
                      <Icon name={config.icon} size={20} className="text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      {category.label}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills[category.key].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-zinc-300 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
