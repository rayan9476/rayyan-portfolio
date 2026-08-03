import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeUp } from "../../lib/motion";
import SectionLabel from "../ui/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    period: "2026 — Present",
    role: "Frontend Developer Intern",
    company: "Roots BMD",
    location: "Karachi, Pakistan",
    type: "Internship",
    color: "#8B5CF6",
    desc: "Working on client-facing websites and landing pages. Building React components, implementing animations with GSAP and Framer Motion, and collaborating with senior developers remotely.",
    tags: ["React", "Tailwind CSS", "GSAP", "Framer Motion"],
  },
  {
    id: 2,
    period: "2024 — 2025",
    role: "Full Stack Developer",
    company: "Self-Employed",
    location: "Remote",
    type: "Freelance",
    color: "#3B82F6",
    desc: "Built production-grade projects including Nexlify (agency landing page template), and K72 (agency portfolio). Developed full stack skills across React, Next.js, Node.js, and MySQL.",
    tags: ["Next.js", "Node.js", "MySQL", "Stripe", "Redux"],
  },
  {
    id: 3,
    period: "2023 — 2024",
    role: "Learning & Building",
    company: "Self-taught",
    location: "Karachi, Pakistan",
    type: "Foundation",
    color: "#22C55E",
    desc: "Started the web development journey. Mastered HTML, CSS, JavaScript, and React fundamentals. Built practice projects and gradually moved into full stack development.",
    tags: ["HTML", "CSS", "JavaScript", "React", "Git"],
  },
];

export default function Experience({ id }) {
  const lineRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!lineRef.current || !sectionRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 0.5,
        },
      },
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative py-32 lg:py-40 px-5 md:px-10 lg:px-16 xl:px-24  overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-[1400px] 2mxl:max-w-full mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
          >
            <SectionLabel number="04" title="Experience" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="font-display text-[clamp(36px,5vw,64px)] 2xl:text-[80px] 2mxl:text-[100px] 3sxl:text-[140px] 3xl:text-[180px] text-white leading-[1.1]"
          >
            My journey.
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-[200px] 2xl:left-[240px] 3sxl:left-[300px] 3xl:left-[360px] top-0 bottom-0 w-px bg-zinc-900">
            <div
              ref={lineRef}
              className="absolute inset-0 w-full bg-gradient-to-b from-violet-500/60 via-blue-500/40 to-green-500/40"
              style={{ transformOrigin: "top center" }}
            />
          </div>

          {/* Entries */}
          <div className="flex flex-col gap-0">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="relative pl-4 md:pl-0 flex flex-col md:flex-row gap-6 md:gap-0 pb-16 2xl:pb-20 3sxl:pb-24 3xl:pb-28 last:pb-0"
              >
                {/* Period — left side */}
                <div className="md:w-[200px] 2xl:w-[240px] 3sxl:w-[300px] 3xl:w-[360px] md:pr-10 flex-shrink-0">
                  <span className="text-[11px] lg:text-sm 2xl:text-base 3sxl:text-lg 3xl:text-xl font-mono tracking-[0.15em] text-zinc-600">
                    {exp.period}
                  </span>
                </div>

                {/* Dot on line */}
                <div
                  className="absolute left-[-5px] md:left-[195px] 2xl:left-[235px] 3sxl:left-[295px] 3xl:left-[355px] top-1 w-[11px] h-[11px] 2xl:w-[13px] 2xl:h-[13px] 3sxl:w-[15px] 3sxl:h-[15px] 3xl:w-[17px] 3xl:h-[17px] rounded-full border-2 border-[#0A0A0A] z-10"
                  style={{ backgroundColor: exp.color }}
                />

                {/* Content — right side */}
                <div className="md:pl-12 2xl:pl-16 3sxl:pl-20 3xl:pl-24 flex-1">
                  {/* Role + type badge */}
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <div>
                      <h3 className="text-white text-lg 2xl:text-2xl 3sxl:text-3xl 3xl:text-4xl font-semibold mb-1">
                        {exp.role}
                      </h3>
                      <p className="text-zinc-500 text-sm 2xl:text-base 3sxl:text-lg 3xl:text-xl">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <span
                      className="text-[10px] lg:text-sm 2xl:text-base 3sxl:text-lg 3xl:text-xl font-mono tracking-[0.15em] uppercase px-3 2xl:px-4 3xl:px-5 py-1.5 2xl:py-2 3xl:py-2.5 rounded-full border flex-shrink-0"
                      style={{
                        color: exp.color,
                        borderColor: `${exp.color}30`,
                        background: `${exp.color}08`,
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm lg:text-base 2xl:text-lg 3sxl:text-xl 3xl:text-2xl leading-[1.8] mb-5">
                    {exp.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] lg:text-sm 2xl:text-base 3sxl:text-lg 3xl:text-xl font-mono tracking-wide px-3 2xl:px-4 3xl:px-5 py-1 2xl:py-1.5 3xl:py-2 rounded-full border border-white/8 text-zinc-600 transition-all duration-200 hover:text-white hover:border-white/25"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
