import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeUp } from "../../lib/motion";
import SectionLabel from "../ui/SectionLabel";
import {
  Atom,
  Triangle,
  FileCode2,
  Palette,
  Sparkles,
  Wand2,
  Code2,
  Waves,
  Server,
  Network,
  Database,
  Leaf,
  Plug,
  ShieldCheck,
  Lock,
  BadgeCheck,
  GitBranch,
  Zap,
  Boxes,
  Image,
  CreditCard,
  RefreshCw,
  Send,
  MonitorSmartphone,
} from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

// const skillColumns = [
//   {
//     title: "Frontend",
//     color: "text-blue-400",
//     borderColor: "border-blue-500/20",
//     glowColor: "rgba(59,130,246,0.05)",
//     skills: [
//       "React",
//       "Next.js",
//       "JavaScript",
//       "TypeScript",
//       "Tailwind CSS",
//       "HTML & CSS",
//       "Framer Motion",
//       "GSAP",
//       "Lenis",
//     ],
//   },
//   {
//     title: "Backend",
//     color: "text-violet-400",
//     borderColor: "border-violet-500/20",
//     glowColor: "rgba(139,92,246,0.05)",
//     skills: [
//       "Node.js",
//       "Express.js",
//       "MySQL",
//       "MongoDB",
//       "REST APIs",
//       "JWT Auth",
//       "Bcrypt",
//       "Zod",
//       "Nodemailer",
//     ],
//   },
//   {
//     title: "Tools",
//     color: "text-green-400",
//     borderColor: "border-green-500/20",
//     glowColor: "rgba(34,197,94,0.05)",
//     skills: [
//       "Git & GitHub",
//       "Vite",
//       "Vercel",
//       "ImageKit",
//       "Stripe",
//       "Redux",
//       "Figma (Basic)",
//       "Postman",
//       "VS Code",
//     ],
//   },
// ];

// Scramble text animation
function ScrambleText({ text, trigger, color }) {
  const ref = useRef(null);
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  useEffect(() => {
    if (!trigger || !ref.current) return;

    let frame = 0;
    let rafId;
    const totalFrames = 12;
    const el = ref.current;

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;

      el.textContent = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i / text.length < progress) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (frame < totalFrames) {
        rafId = requestAnimationFrame(animate);
      } else {
        el.textContent = text;
      }
    };

    // small delay per skill
    const timeout = setTimeout(animate, Math.random() * 300);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
    };
  }, [trigger, text]);

  return (
    <span ref={ref} className={`font-mono ${color}`}>
      {text}
    </span>
  );
}

// Skill row with scramble
function SkillItem({ skill, color, index, sectionVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0 group"
    >
      <div className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-current transition-colors duration-300 flex-shrink-0" />
      <ScrambleText text={skill} trigger={sectionVisible} color={color} />
    </motion.div>
  );
}

const skillColumns = [
  {
    title: "Frontend",
    color: "#3B82F6",
    glowColor: "rgba(59,130,246,0.05)",
    borderColor: "rgba(59,130,246,0.15)",
    skills: [
      { name: "React", icon: Atom, level: 90 },
      { name: "Next.js", icon: Triangle, level: 85 },
      { name: "JavaScript", icon: FileCode2, level: 88 },
      { name: "Tailwind CSS", icon: Palette, level: 92 },
      { name: "Framer Motion", icon: Sparkles, level: 80 },
      { name: "GSAP", icon: Wand2, level: 78 },
      { name: "HTML & CSS", icon: Code2, level: 95 },
      { name: "Lenis", icon: Waves, level: 82 },
    ],
  },
  {
    title: "Backend",
    color: "#8B5CF6",
    glowColor: "rgba(139,92,246,0.05)",
    borderColor: "rgba(139,92,246,0.15)",
    skills: [
      { name: "Node.js", icon: Server, level: 82 },
      { name: "Express.js", icon: Network, level: 80 },
      { name: "MySQL", icon: Database, level: 78 },
      { name: "MongoDB", icon: Leaf, level: 72 },
      { name: "REST APIs", icon: Plug, level: 85 },
      { name: "JWT Auth", icon: ShieldCheck, level: 80 },
      { name: "Bcrypt", icon: Lock, level: 75 },
      { name: "Zod", icon: BadgeCheck, level: 70 },
    ],
  },
  {
    title: "Tools",
    color: "#22C55E",
    glowColor: "rgba(34,197,94,0.05)",
    borderColor: "rgba(34,197,94,0.15)",
    skills: [
      { name: "Git & GitHub", icon: GitBranch, level: 88 },
      { name: "Vite", icon: Zap, level: 90 },
      { name: "Vercel", icon: Boxes, level: 85 },
      { name: "ImageKit", icon: Image, level: 78 },
      { name: "Stripe", icon: CreditCard, level: 75 },
      { name: "Redux", icon: RefreshCw, level: 80 },
      { name: "Postman", icon: Send, level: 82 },
      { name: "VS Code", icon: MonitorSmartphone, level: 95 },
    ],
  },
];

// Animated progress bar
function ProgressBar({ level, color, visible }) {
  const barRef = useRef(null);

  useEffect(() => {
    if (!visible || !barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { width: "0%" },
      {
        width: `${level}%`,
        duration: 1.2,
        ease: "power3.out",
        delay: Math.random() * 0.4,
      },
    );
  }, [visible, level]);

  return (
    <div className="will-change-transform  w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-3">
      <div
        ref={barRef}
        className="h-full rounded-full"
        style={{
          width: "0%",
          background: `linear-gradient(90deg, ${color}80, ${color})`,
        }}
      />
    </div>
  );
}

// Single skill card
function SkillCard({ skill, color, index, sectionVisible }) {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      data-cursor="pointer"
      className="group  relative bg-[#0F0F0F] border border-white/6 rounded-2xl p-5 hover:border-white/12 transition-colors duration-300 overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(circle at top left, ${color}08, transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-12 h-12 3sxl:w-14 3sxl:h-14 3xl:w-16 3xl:h-16 rounded-xl flex items-center justify-center text-xl mb-4 border"
          style={{
            background: `${color}10`,
            borderColor: `${color}20`,
          }}
        >
          <span style={{ color }}>
            <Icon
              size={24}
              className="3sxl:w-7 3sxl:h-7 3xl:w-9 3xl:h-9"
              strokeWidth={2}
            />
          </span>
        </div>

        {/* Name */}
        <p className="text-white  xs-s-text text-sm min-w-0 truncate xl:text-base 2xl:text-lg 3sxl:text-xl 3xl:text-2xl font-medium mb-1">
          {skill.name}
        </p>

        {/* Level number */}
        <p className="text-[10px] lg:text-sm 2xl:text-base 3sxl:text-lg 3xl:text-xl font-mono text-zinc-600">
          {skill.level}%
        </p>

        {/* Progress bar */}
        <ProgressBar
          level={skill.level}
          color={color}
          visible={sectionVisible}
        />
      </div>
    </motion.div>
  );
}

export default function Skills({ id }) {
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative py-32 lg:py-40 px-5 md:px-10 lg:px-16 xl:px-24  overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-[1400px] 2mxl:max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0}
            >
              <SectionLabel number="02" title="Skills" color="text-blue-500" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={1}
              className="font-display text-[clamp(36px,5vw,64px)] 2xl:text-[80px] 2mxl:text-[100px] 3sxl:text-[140px] 3xl:text-[180px] text-white leading-[1.1]"
            >
              My tech stack.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
            className="text-zinc-500 text-sm 2xl:text-base 3xl:text-lg  max-w-xs 2xl:max-w-sm 3xl:max-w-md  leading-relaxed"
          >
            Tools and technologies I work with to build full stack web
            applications.
          </motion.p>
        </div>

        {/* Three columns */}
        <div className="grid lg:grid-cols-3 gap-6">
          {skillColumns.map((col, colIndex) => (
            <motion.div
              key={col.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={colIndex}
              className="rounded-2xl border p-4  transition-all duration-500"
              style={{
                borderColor: col.borderColor.replace("border-", ""),
                background: `radial-gradient(circle at top left, ${col.glowColor}, transparent 60%)`,
              }}
            >
              {/* Column header */}
              <div className="flex items-center gap-3 mb-8">
                <span
                  className={`text-[11px] lg:text-base 2xl:text-xl 3sxl:text-2xl 3xl:text-3xl font-mono tracking-[0.2em] uppercase ${col.color}`}
                >
                  {String(colIndex + 1).padStart(2, "0")}
                </span>
                <div className="w-8 2xl:w-10 3sxl:w-12 3xl:w-14 h-px bg-zinc-800" />
                <h3 className="text-white  text-sm lg:text-base 2xl:text-xl 3sxl:text-2xl 3xl:text-3xl font-semibold tracking-wide">
                  {col.title}
                </h3>
              </div>

              {/* Skills list */}
              {/* <div>
                {col.skills.map((skill, i) => (
                  <SkillItem
                    key={skill}
                    skill={skill}
                    color={col.color}
                    index={i}
                    sectionVisible={sectionVisible}
                  />
                ))}
              </div> */}
              <div className="grid grid-cols-2 gap-3">
                {col.skills.map((skill, i) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    color={col.color}
                    index={i}
                    sectionVisible={sectionVisible}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
