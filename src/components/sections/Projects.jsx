import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { fadeUp } from "../../lib/motion";
import SectionLabel from "../ui/SectionLabel";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const projects = [
  {
    id: "nexlify",
    num: "01",
    title: "Nexlify",
    subtitle: "Creative Agency Landing Page",
    desc: "A modern, high-performance agency landing page template built to sell. Features GSAP stair transitions, Framer Motion layoutId modals, custom cursor, smooth scroll, and a working Google Sheets contact form.",
    video:
      // "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
      "https://res.cloudinary.com/md0sncix/video/upload/v1785493113/Lv_0_20260730161935.Mp4_2_mjym7z.mp4",
    tags: ["React", "GSAP", "Framer Motion", "Tailwind", "Lenis"],
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.1)",
    live: "https://nexlify-bice.vercel.app/",
    github: "https://github.com/rayan9476",
    align: "left",
  },

  {
    id: "k72",
    num: "02",
    title: "K72 Agency",
    subtitle: "Creative Agency Portfolio",
    desc: "A visually rich portfolio site for a creative agency featuring GSAP ScrollTrigger animations, Lenis smooth scroll, Swiper carousels, ImageKit CDN, and performance optimizations including React Compiler.",
    video:
      // "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80",
      "https://res.cloudinary.com/md0sncix/video/upload/w_1200,q_auto,f_auto/v1785492662/Lv_0_20260730184745.Mp4_2_1_c9gps1.mp4",
    tags: ["React", "GSAP", "ScrollTrigger", "Lenis", "Swiper", "ImageKit"],
    color: "#22C55E",
    glow: "rgba(34,197,94,0.1)",
    live: "https://k72-agency-dusky.vercel.app/",
    github: "https://github.com/rayan9476",
    align: "right",
  },

  // {
  //   id: "velvra",
  //   num: "03",
  //   title: "Velvra",
  //   subtitle: "Luxury Fashion E-Commerce",
  //   desc: "A full-stack luxury fashion e-commerce platform with JWT auth, MySQL, Stripe payments, ImageKit CDN, Redux state management, and a complete admin dashboard with CRUD operations.",
  //   image:
  //     "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
  //   tags: ["Next.js", "MySQL", "Stripe", "Redux", "ImageKit", "JWT"],
  //   color: "#3B82F6",
  //   glow: "rgba(59,130,246,0.1)",
  //   live: "https://nexlify-bice.vercel.app/",
  //   github: "https://github.com/rayan9476",
  //   align: "left",
  // },
];

// function ProjectCard({ project, index }) {
//   const isRight = project.align === "right";

//   return (
//     <motion.div
//       variants={fadeUp}
//       initial="hidden"
//       whileInView="show"
//       viewport={{ once: true }}
//       custom={index}
//       className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
//     >
//       {/* Image — order changes based on align */}
//       <div className={`relative group ${isRight ? "lg:order-2" : ""}`}>
//         <div className="relative rounded-2xl overflow-hidden border border-white/8 aspect-video">
//           <img
//             src={project.image}
//             alt={project.title}
//             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//           />
//           {/* Overlay on hover */}
//           <div
//             className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4"
//             style={{ background: `${project.glow}` }}
//           >
//             {project.live !== "#" && (
//               <a
//                 href={project.live}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
//               >
//                 <FaExternalLinkAlt size={14} />
//               </a>
//             )}
//             {project.github !== "#" && (
//               <a
//                 href={project.github}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
//               >
//                 <FaGithub size={16} />
//               </a>
//             )}
//           </div>
//         </div>

//         {/* Project number — large, behind card */}
//         <span
//           className="absolute -top-8 -left-4 font-display text-[100px] leading-none select-none pointer-events-none opacity-[0.04]"
//           style={{ color: project.color }}
//         >
//           {project.num}
//         </span>
//       </div>

//       {/* Content */}
//       <div className={isRight ? "lg:order-1" : ""}>
//         {/* Number + title */}
//         <div className="flex items-center gap-3 mb-4">
//           <span
//             className="text-[11px] font-mono tracking-[0.2em]"
//             style={{ color: project.color }}
//           >
//             {project.num}
//           </span>
//           <div className="w-8 h-px bg-zinc-800" />
//           <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-600 uppercase">
//             {project.subtitle}
//           </span>
//         </div>

//         <h3 className="font-display text-[clamp(32px,4vw,56px)] text-white leading-[1.1] mb-5">
//           {project.title}
//         </h3>

//         <p className="text-zinc-400 text-base leading-[1.8] mb-8">
//           {project.desc}
//         </p>

//         {/* Tags */}
//         <div className="flex flex-wrap gap-2 mb-8">
//           {project.tags.map((tag) => (
//             <span
//               key={tag}
//               className="text-[11px] font-mono tracking-wide px-3 py-1.5 rounded-full border border-white/8 text-zinc-500"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>

//         {/* Buttons */}
//         <div className="flex items-center gap-4">
//           {project.live !== "#" && (
//             <a
//               href={project.live}
//               target="_blank"
//               rel="noreferrer"
//               data-cursor="pointer"
//               className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl border transition-all duration-300"
//               style={{
//                 borderColor: `${project.color}40`,
//                 color: project.color,
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = `${project.color}15`;
//                 e.currentTarget.style.borderColor = `${project.color}80`;
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "transparent";
//                 e.currentTarget.style.borderColor = `${project.color}40`;
//               }}
//             >
//               Live Demo <FaExternalLinkAlt size={11} />
//             </a>
//           )}
//           {project.github !== "#" && (
//             <a
//               href={project.github}
//               target="_blank"
//               rel="noreferrer"
//               data-cursor="pointer"
//               className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-white transition-colors duration-300"
//             >
//               <FaGithub size={16} /> GitHub
//             </a>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default function Projects({ id }) {
//   return (
//     <section
//       id={id}
//       className="relative py-32 lg:py-40 px-5 md:px-10 lg:px-16 xl:px-24 bg-[#0A0A0A] overflow-hidden"
//     >
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

//       <div className="max-w-[1400px] mx-auto">
//         {/* Header */}
//         <div className="mb-20">
//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             custom={0}
//           >
//             <SectionLabel number="03" title="Work" color="text-violet-500" />
//           </motion.div>
//           <motion.h2
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             custom={1}
//             className="font-display text-[clamp(36px,5vw,64px)] text-white leading-[1.1]"
//           >
//             Selected projects.
//           </motion.h2>
//         </div>

//         {/* Project cards */}
//         <div className="flex flex-col gap-32">
//           {projects.map((project, i) => (
//             <ProjectCard key={project.id} project={project} index={i} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

function ProjectCard({ project, index }) {
  const isRight = project.align === "right";

  const cardRef = useRef(null);

  // Track this card's own scroll progress — contained to itself
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"], // starts as it enters viewport, ends as it leaves
  });

  // Image drifts vertically inside its frame as you scroll past it
  const imageY = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);

  const isDesktop = window.matchMedia("(min-width:1024px)").matches;

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      custom={index}
      className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
    >
      {/* Image */}
      <motion.div
        style={{ y: isDesktop ? imageY : 0 }}
        className={`relative group ${isRight ? "lg:order-2" : ""}`}
      >
        <div
          data-cursor="pointer"
          className="relative rounded-2xl overflow-hidden border border-white/8 aspect-video"
        >
          {/* <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          /> */}

          <motion.video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-contain "
          >
            <source src={project.video} type="video/mp4" />
          </motion.video>

          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4"
            style={{ background: `${project.glow}` }}
          >
            {project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 3sxl:w-14 3sxl:h-14 3xl:w-16 3xl:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
              >
                <FaExternalLinkAlt
                  size={14}
                  className="3sxl:w-5 3sxl:h-5 3xl:w-6 3xl:h-6"
                />
              </a>
            )}
            {project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 3sxl:w-14 3sxl:h-14 3xl:w-16 3xl:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
              >
                <FaGithub
                  size={16}
                  className="3sxl:w-5 3sxl:h-5 3xl:w-6 3xl:h-6"
                />
              </a>
            )}
          </div>
        </div>

        {/* Big number behind */}
        <span
          className="absolute -top-8 -left-4 font-display text-[100px] 2xl:text-[130px] 2mxl:text-[160px] 3sxl:text-[200px] 3xl:text-[240px] leading-none select-none pointer-events-none opacity-[0.04]"
          style={{ color: project.color }}
        >
          {project.num}
        </span>
      </motion.div>

      {/* Content */}
      <div className={isRight ? "lg:order-1" : ""}>
        {/* Number + subtitle */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-[11px] lg:text-base 2xl:text-lg 3sxl:text-xl 3xl:text-2xl font-mono tracking-[0.2em]"
            style={{ color: project.color }}
          >
            {project.num}
          </span>
          <div className="w-8 2xl:w-10 3sxl:w-12 3xl:w-14 h-px bg-zinc-800" />
          <span className="min-w-0 truncate  xs-xs-text  text-[11px] lg:text-base 2xl:text-lg 3sxl:text-xl 3xl:text-2xl font-mono tracking-[0.2em] text-zinc-600 uppercase">
            {project.subtitle}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display   text-[clamp(32px,4vw,56px)] 2xl:text-[70px] 2mxl:text-[85px] 3sxl:text-[100px] 3xl:text-[120px] text-white leading-[1.1] mb-5">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 text-base lg:text-lg 2xl:text-xl 3sxl:text-2xl 3xl:text-3xl leading-[1.8] mb-8">
          {project.desc}
        </p>

        {/* Tags */}
        {/* <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] lg:text-sm 2xl:text-base 3sxl:text-lg 3xl:text-xl font-mono tracking-wide px-3 2xl:px-4 3xl:px-5 py-1.5 2xl:py-2 3xl:py-2.5 rounded-full border border-white/8 text-zinc-500"
            >
              {tag}
            </span>
          ))}
        </div> */}

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              data-cursor="pointer"
              key={tag}
              className="text-[11px] lg:text-sm 2xl:text-base 3sxl:text-lg 3xl:text-xl font-mono tracking-wide px-3 2xl:px-4 3xl:px-5 py-1.5 2xl:py-2 3xl:py-2.5 rounded-full border border-white/8 text-zinc-500 transition-all duration-200 hover:text-white hover:border-white/25 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          {project.live !== "#" && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              data-cursor="pointer"
              className="inline-flex items-center gap-2 text-sm lg:text-base 2xl:text-lg 3sxl:text-xl 3xl:text-2xl font-semibold px-6 2xl:px-8 3xl:px-10 py-3 2xl:py-4 3xl:py-5 rounded-xl border transition-all duration-300"
              style={{
                borderColor: `${project.color}40`,
                color: project.color,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${project.color}15`;
                e.currentTarget.style.borderColor = `${project.color}80`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = `${project.color}40`;
              }}
            >
              Live Demo{" "}
              <FaExternalLinkAlt
                size={11}
                className="2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5"
              />
            </a>
          )}
          {project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="pointer"
              className="inline-flex items-center gap-2 text-sm lg:text-base 2xl:text-lg 3sxl:text-xl 3xl:text-2xl font-semibold text-zinc-500 hover:text-white transition-colors duration-300"
            >
              <FaGithub size={16} className="2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ id }) {
  return (
    <section
      id={id}
      className="relative py-32 lg:py-40 px-5 md:px-10 lg:px-16 xl:px-24  overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="max-w-[1400px] 2mxl:max-w-full mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
          >
            <SectionLabel number="03" title="Work" color="text-violet-500" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="font-display text-[clamp(36px,5vw,64px)] 2xl:text-[80px] 2mxl:text-[100px] 3sxl:text-[140px] 3xl:text-[180px] text-white leading-[1.1]"
          >
            Selected projects.
          </motion.h2>
        </div>

        {/* Project cards */}
        <div className="flex flex-col gap-32 2xl:gap-40 3xl:gap-52">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
