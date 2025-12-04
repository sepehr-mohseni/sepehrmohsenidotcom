import { createTranslator } from "@/lib/i18n";
import { getAllExperiences } from "@/data/experience";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";


export function Timeline() {
  const t = createTranslator("en");
  const experiences = getAllExperiences();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section id="experience" className="relative scroll-mt-20 py-16 sm:py-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent" />
      </div>

      <Container>
        <div className="mb-10 text-center sm:mb-12">
          <span className="mb-4 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400">
            Career
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {t("experience.title")}
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative mb-6 pl-8 sm:mb-8 md:flex md:pl-0"
            >
              <div className="absolute left-0 top-6 z-10 md:hidden">
                <div className="h-3 w-3 rounded-full border-2 border-indigo-500 bg-zinc-950" />
              </div>

              <div className="absolute left-1/2 top-8 z-10 hidden h-4 w-4 -translate-x-1/2 md:block">
                <div className="absolute inset-0 animate-ping rounded-full bg-indigo-500/50" />
                <div className="relative h-4 w-4 rounded-full border-2 border-indigo-500 bg-zinc-950" />
              </div>

              <div className={`hidden md:block md:w-1/2 ${index % 2 === 0 ? "" : "order-2"}`} />

              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12 md:order-1"}`}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 p-5 backdrop-blur-sm transition-all hover:border-indigo-500/30 hover:bg-zinc-900/80 sm:p-6">
                  <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 blur transition-opacity group-hover:opacity-100" />

                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-400">
                    <Icon name="calendar" size={14} />
                    {formatDate(exp.startDate)} - {exp.current ? t("experience.present") : formatDate(exp.endDate!)}
                  </div>

                  <h3 className="mb-1 text-lg font-semibold text-white sm:text-xl">
                    {exp.role.en}
                  </h3>
                  <p className="mb-4 font-medium text-indigo-400">
                    {exp.company.en}
                  </p>

                  <p className="mb-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                    {exp.description.en}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-white/5 px-2 py-1 text-xs font-medium text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
