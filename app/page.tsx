import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Timeline } from "@/components/Timeline";
import { ContactForm } from "@/components/ContactForm";

export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ProjectsGrid />
      <Timeline />
      <ContactForm />
    </>
  );
}
