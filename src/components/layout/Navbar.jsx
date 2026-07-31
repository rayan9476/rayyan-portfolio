import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollTo } from "../hooks/useScrollTo";
import { useApp } from "../../context/AppContext";
import { useScrollNavigation } from "../hooks/useScrollNavigation";

const navLinks = [
  { num: "01", label: "About", target: "#about" },
  { num: "02", label: "Skills", target: "#skills" },
  { num: "03", label: "Work", target: "#projects" },
  { num: "04", label: "Experience", target: "#experience" },
  { num: "05", label: "Contact", target: "#contact" },
];

export default function Navbar({ loaded }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isClick, setIsClick, activeSection, setActiveSection } = useApp();
  const scrollTo = useScrollTo();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!loaded || !isClick) return;
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            console.log(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [loaded, isClick]);

  const { navigateToSection } = useScrollNavigation();

  const handleClick = (e, target) => {
    navigateToSection(e, target, () => {
      setMenuOpen(false);
    });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={`  fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 lg:px-16 xl:px-24  py-5 transition-all duration-500
          ${
            scrolled
              ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/[0.04]"
              : "bg-transparent border-b border-transparent"
          }`}
      >
        {/* Logo */}
        <button
          onClick={(e) => handleClick(e, "#home")}
          data-cursor="pointer"
          className="font-display text-2xl xl:text-3xl 3sxl:text-4xl 3xl:text-5xl text-white italic hover:text-zinc-300 transition-colors duration-200 border-none bg-transparent cursor-pointer"
        >
          R.
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.target.replace("#", "");
            return (
              <a
                key={link.label}
                href={link.target}
                onClick={(e) => handleClick(e, link.target)}
                data-cursor="pointer"
                className="group flex items-center gap-2 transition-colors duration-200"
              >
                {/* Number — hidden by default, shows on hover/active */}
                <span
                  className={`text-[10px] xl:text-sm 2xl:text-base 3sxl:text-lg 3xl:text-xl font-mono transition-all duration-200
                    ${
                      isActive
                        ? "text-violet-400 opacity-100"
                        : "text-zinc-700 opacity-0 group-hover:opacity-100 group-hover:text-zinc-600"
                    }`}
                >
                  {link.num}
                </span>

                {/* Label — much better contrast */}
                <span
                  className={`text-sm xl:text-base 2xl:text-lg  3sxl:text-xl  3xl:text-2xl font-medium transition-colors duration-200
                    ${
                      isActive
                        ? "text-white"
                        : "text-zinc-400 group-hover:text-zinc-100"
                      // ↑ was zinc-500 (too dark) — now zinc-400 clearly visible
                    }`}
                >
                  {link.label}
                </span>

                {/* Active underline dot */}
                {isActive && (
                  <span className="w-1 h-1 xl:w-1.5 xl:h-1.5 2xl:w-2 2xl:h-2 3sxl:w-2.5 3sxl:h-2.5 3xl:w-3 3xl:h-3 rounded-full bg-violet-400 ml-0.5" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <a
          href="mailto:hellorayyan.dev@gmail.com"
          data-cursor="pointer"
          className="hidden lg:flex items-center gap-2 text-sm xl:text-base 2xl:text-lg  3sxl:text-xl  3xl:text-2xl font-medium text-zinc-300 hover:text-white transition-colors duration-200"
          // ↑ was zinc-400 — now zinc-300 more visible
        >
          <span className="w-1.5 h-1.5 xl:w-2 xl:h-2 2xl:w-2.5 2xl:h-2.5 3sxl:h-3 3sxl:w-3 3xl:w-3.5 3xl:h-3.5 rounded-full bg-green-500 animate-pulse" />
          hellorayyan.dev
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          data-cursor="pointer"
          className="lg:hidden flex flex-col gap-1.5 cursor-pointer border-none bg-transparent p-1"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-px bg-white"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-px bg-white"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-px bg-white"
          />
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            // exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.target}
                onClick={(e) => handleClick(e, link.target)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="flex items-center gap-4 group"
              >
                <span className="text-sm md:text-base font-mono text-zinc-600">
                  {link.num}
                </span>
                <span className="font-display text-4xl md:text-5xl text-white italic group-hover:text-zinc-400 transition-colors duration-200">
                  {link.label}
                </span>
              </motion.a>
            ))}
            <motion.a
              href="mailto:hellorayyan.dev"
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2  text-sm md:text-base text-zinc-400 mt-4 hover:text-white transition-colors duration-200"
            >
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse" />
              hellorayyan.dev
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
