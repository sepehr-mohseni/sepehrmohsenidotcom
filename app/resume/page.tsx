import { Metadata } from "next";
import { getAllExperiences } from "@/data/experience";
import { getAllProjects } from "@/data/projects";
import { skills, profile } from "@/data";
import { generateSEO } from "@/lib/seo";
import { ResumeContent } from "@/components/ResumeContent";

export const metadata: Metadata = generateSEO({
  locale: "en",
  title: "Resume",
  description: `${profile.name.en} - ${profile.title.en} Resume`,
  path: "/resume",
});

export default function ResumePage() {
  const experiences = getAllExperiences();
  const projects = getAllProjects().filter((p) => p.featured);

  return <ResumeContent experiences={experiences} projects={projects} skills={skills} />;
}
