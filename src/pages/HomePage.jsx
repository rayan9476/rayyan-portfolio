import { useRef, Suspense, lazy } from "react";

import Hero from "../components/sections/Hero";
const About = lazy(() => import("../components/sections/About"));
const Skills = lazy(() => import("../components/sections/Skills"));
const Projects = lazy(() => import("../components/sections/Projects"));
const Experience = lazy(() => import("../components/sections/Experience"));
const Contact = lazy(() => import("../components/sections/Contact"));
const Footer = lazy(() => import("../components/layout/Footer"));
import { useFakeScrollbar } from "../components/hooks/useFakeScrollbar";

export default function HomePage({ loaded }) {
  const thumbRef = useRef(null);

  useFakeScrollbar(thumbRef, {
    bgColor: "#4CAF4F",
  });
  return (
    <main>
      <div className="site_fake_scrollbar fixed right-[1px] top-0 h-screen w-[7px] z-30">
        <div
          style={{ opacity: 0 }}
          ref={thumbRef}
          className="site_fake_thumb_work opacity-0  w-full bg-[#4CAF4F] rounded-[10px] origin-top"
        />
      </div>

      <Hero id="home" loaded={loaded} />
      <Suspense fallback={null}>
        <About id="about" />
        <Skills id="skills" />
        <Projects id="projects" />
        <Experience id="experience" />
        <Contact id="contact" />
        <Footer />
      </Suspense>
    </main>
  );
}
