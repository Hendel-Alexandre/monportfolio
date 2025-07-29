import { Navbar } from "@/components/portfolio/navbar";
import { HeroSection } from "@/components/portfolio/hero-section";
import { GuessFactGame } from "@/components/portfolio/guess-fact-game";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { Footer } from "@/components/portfolio/footer";
import { Chatbot } from "@/components/chatbot/chatbot";
import { usePageViewTracking } from "@/hooks/use-analytics";

export default function Home() {
  usePageViewTracking("home");

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <div className="bg-background">
          <SkillsSection />
          <GuessFactGame />
          <ProjectsSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
