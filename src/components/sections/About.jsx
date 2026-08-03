import { useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight } from "../../lib/motion";
import SectionLabel from "../ui/SectionLabel";

const stats = [
  { num: "3+", label: "Projects Built" },
  { num: "2+", label: "Tech Stacks Mastered" },
  { num: "1", label: "Internship" },
  { num: "∞", label: "Lines of Code" },
];

export default function About({ id }) {
  return (
    <section
      id={id}
      className="relative py-32 lg:py-40 px-5 md:px-10 lg:px-16 xl:px-24  overflow-hidden"
    >
      {/* Subtle top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-[1400px] 2mxl:max-w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — text content */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0}
            >
              <SectionLabel number="01" title="About" />
            </motion.div>

            {/* Big heading */}
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={1}
              className="font-display text-[clamp(36px,5vw,64px)] 2xl:text-[80px] 2mxl:text-[100px] 3sxl:text-[140px] 3xl:text-[180px] text-white leading-[1.1] mb-8"
            >
              Building the web,
              <br />
              <span className="text-zinc-500">one commit</span>
              <br />
              at a time.
            </motion.h2>

            {/* Paragraphs */}
            {[
              "Hey, I'm Rayyan — a Full Stack Developer based in Karachi, Pakistan. I specialize in building modern, performant web applications using React, Next.js, Node.js, and MySQL.",
              "I care deeply about the details — smooth animations, clean architecture, and interfaces that feel alive. Every project I build is crafted with the same attention to performance and user experience.",
              "Currently open to freelance projects and full-time opportunities. If you have something in mind, let's talk.",
            ].map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={2 + i}
                className="text-zinc-400 text-base 2mxl:text-lg 3xl:text-xl leading-[1.8] mb-5"
              >
                {para}
              </motion.p>
            ))}

            {/* Availability badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={5}
              className="inline-flex items-center gap-3 mt-4 bg-green-500/8 border border-green-500/20 px-5 py-3 rounded-full"
            >
              <div className="relative">
                <div className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 3xl:w-3 3xl:h-3 rounded-full bg-green-500" />
                <div className="absolute inset-0 w-2 h-2 2xl:w-2.5 2xl:h-2.5 3xl:w-3 3xl:h-3 rounded-full bg-green-500 animate-ping opacity-40" />
              </div>
              <span className="text-green-400 text-sm 2xl:text-base 3sxl:text-lg 3xl:text-xl font-medium">
                Available for freelance
                {/* — 2 spots open */}
              </span>
            </motion.div>
          </div>

          {/* Right — photo + stats */}
          <div className="flex flex-col gap-8">
            {/* Photo card */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={1}
              className="relative"
            >
              {/* Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-white/8 aspect-[4/3] bg-[#111]">
                <img
                  src="https://ik.imagekit.io/rayyan/rayyan.png?tr=w-800,q-80,f-auto"
                  alt="Rayyan"
                  className="w-full h-full object-cover"
                />

                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-violet-500/40 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-violet-500/40 rounded-br-2xl" />
              </div>

              {/* Floating info card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ backfaceVisibility: "hidden" }}
                className="will-change-transform transform-cpu"
              >
                <div className="absolute  -bottom-5 -right-2 md:-right-5 bg-[#0A0A0A]/80  border border-white/10 rounded-2xl px-5 py-3.5 shadow-xl">
                  <p className="text-white text-sm md:text-sm 3sxl:text-lg font-semibold">
                    Karachi, Pakistan 🇵🇰
                  </p>
                  <p className="text-zinc-500 text-xs  3sxl:text-base mt-0.5">
                    UTC+5 · Open to remote
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={2}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={3 + i}
                  data-cursor="pointer"
                  className="bg-[#111] border border-white/8 rounded-xl p-3 md:p-5 hover:border-white/15 transition-colors duration-300"
                >
                  <p className="font-display text-3xl 3sxl:text-5xl text-white italic mb-1">
                    {stat.num}
                  </p>
                  <p className="text-zinc-500  text-xs 3sxl:text-lg tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
