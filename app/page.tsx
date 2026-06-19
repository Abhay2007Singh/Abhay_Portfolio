import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Architecture from "@/components/Architecture";
import Playground from "@/components/Playground";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Credentials from "@/components/Credentials";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Marquee />
        <Projects />
        <Architecture />
        <Playground />
        <Skills />
        <Experience />
        <Credentials />
        <About />
        <Contact />
      </main>
      <footer className="border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-mono text-xs text-muted">© 2025 Abhay Kumar Singh</span>
          <span className="font-mono text-xs text-muted/50">
            Built with Next.js · TypeScript · Tailwind · Framer Motion
          </span>
        </div>
      </footer>
    </>
  );
}
