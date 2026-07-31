import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import gsap from "gsap";
import { useScrollTo } from "../hooks/useScrollTo";
import { ArrowRight } from "lucide-react";
const floatingItems = [
  { label: "React", x: "15%", y: "20%", delay: 0, duration: 5 },
  { label: "Next.js", x: "80%", y: "15%", delay: 0.5, duration: 6 },
  { label: "Node.js", x: "10%", y: "70%", delay: 1, duration: 4.5 },
  { label: "MySQL", x: "75%", y: "65%", delay: 1.5, duration: 5.5 },
  { label: "GSAP", x: "85%", y: "40%", delay: 0.8, duration: 5 },
  { label: "Tailwind", x: "20%", y: "80%", delay: 1.2, duration: 6 },
  { label: "Framer", x: "45%", y: "10%", delay: 0.3, duration: 4.8 },
  { label: "Lenis", x: "5%", y: "45%", delay: 1.8, duration: 5.2 },
];

const nameLetters = "Rayyan".split("");

const REVEAL_IMAGE =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80";

export default function Hero({ id, loaded }) {
  const scrollTo = useScrollTo();
  const controls = useAnimation();

  useEffect(() => {
    if (!loaded) return;
    controls.start("show");
  }, [loaded, controls]);

  // mouse parallax on floating items
  useEffect(() => {
    const items = document.querySelectorAll(".float-item");
    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      items.forEach((el, i) => {
        const depth = ((i % 3) + 1) * 6;
        gsap.to(el, {
          x: dx * depth,
          y: dy * depth,
          duration: 1,
          ease: "power2.out",
        });
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const sectionRef = useRef(null);

  // Cursor reveal refs
  const revealRef = useRef(null);
  const revealInnerRef = useRef(null);
  const isInside = useRef(false);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  // Cursor image reveal effect
  // useEffect(() => {
  //   if (!sectionRef.current || !revealRef.current) return;

  //   const section = sectionRef.current;
  //   const reveal = revealRef.current;
  //   const revealInner = revealInnerRef.current;

  //   // RAF loop for smooth lag
  //   const tick = () => {
  //     pos.current.x += (mouse.current.x - pos.current.x) * 0.08;
  //     pos.current.y += (mouse.current.y - pos.current.y) * 0.08;

  //     gsap.set(reveal, {
  //       x: pos.current.x,
  //       y: pos.current.y,
  //       xPercent: -50,
  //       yPercent: -50,
  //     });

  //     // counter-move image inside to create depth
  //     gsap.set(revealInner, {
  //       x: -(pos.current.x - mouse.current.x) * 0.3,
  //       y: -(pos.current.y - mouse.current.y) * 0.3,
  //     });

  //     rafRef.current = requestAnimationFrame(tick);
  //   };

  //   const onMouseMove = (e) => {
  //     const rect = section.getBoundingClientRect();
  //     mouse.current.x = e.clientX - rect.left;
  //     mouse.current.y = e.clientY - rect.top;
  //   };

  //   const onMouseEnter = () => {
  //     isInside.current = true;
  //     rafRef.current = requestAnimationFrame(tick);

  //     gsap.killTweensOf(reveal);
  //     gsap.to(reveal, {
  //       scale: 1,
  //       opacity: 1,
  //       duration: 0.6,
  //       ease: "power3.out",
  //     });
  //   };

  //   const onMouseLeave = () => {
  //     isInside.current = false;
  //     cancelAnimationFrame(rafRef.current);

  //     gsap.killTweensOf(reveal);
  //     gsap.to(reveal, {
  //       scale: 0,
  //       opacity: 0,
  //       duration: 0.5,
  //       ease: "power3.in",
  //     });
  //   };

  //   section.addEventListener("mousemove", onMouseMove);
  //   section.addEventListener("mouseenter", onMouseEnter);
  //   section.addEventListener("mouseleave", onMouseLeave);

  //   return () => {
  //     section.removeEventListener("mousemove", onMouseMove);
  //     section.removeEventListener("mouseenter", onMouseEnter);
  //     section.removeEventListener("mouseleave", onMouseLeave);
  //     cancelAnimationFrame(rafRef.current);
  //   };
  // }, []);

  // Cursor image reveal effect
  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    if (!sectionRef.current || !revealRef.current) return;

    const section = sectionRef.current;
    const reveal = revealRef.current;
    const revealInner = revealInnerRef.current;

    // RAF loop for smooth lag
    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.08;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.08;

      // clamp so the reveal image never crosses the section's edges
      const sectionW = section.offsetWidth;
      const sectionH = section.offsetHeight;
      const halfW = reveal.offsetWidth / 2;
      const halfH = reveal.offsetHeight / 2;

      const clampedX = gsap.utils.clamp(halfW, sectionW - halfW, pos.current.x);
      const clampedY = gsap.utils.clamp(halfH, sectionH - halfH, pos.current.y);

      gsap.set(reveal, {
        x: clampedX,
        y: clampedY,
        xPercent: -50,
        yPercent: -50,
      });

      // counter-move image inside to create depth
      gsap.set(revealInner, {
        x: -(pos.current.x - mouse.current.x) * 0.3,
        y: -(pos.current.y - mouse.current.y) * 0.3,
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    const onMouseEnter = () => {
      isInside.current = true;
      rafRef.current = requestAnimationFrame(tick);

      gsap.killTweensOf(reveal);
      gsap.to(reveal, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const onMouseLeave = () => {
      isInside.current = false;
      cancelAnimationFrame(rafRef.current);

      gsap.killTweensOf(reveal);
      gsap.to(reveal, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      });
    };

    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseenter", onMouseEnter);
    section.addEventListener("mouseleave", onMouseLeave);

    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseenter", onMouseEnter);
      section.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.1 + i * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden "
    >
      {/* ── Cursor reveal image ── */}
      <div
        ref={revealRef}
        className="absolute pointer-events-none z-10 opacity-0"
        style={{
          width: "320px",
          height: "420px",
          top: 0,
          left: 0,
          transform: "translate(-50%, -50%) scale(0)",
          borderRadius: "16px",
          overflow: "hidden",
          willChange: "transform",
        }}
      >
        <div
          ref={revealInnerRef}
          className="w-full h-full"
          style={{ willChange: "transform" }}
        >
          <img
            src={REVEAL_IMAGE}
            alt=""
            className="w-full h-full object-cover"
            style={{ transform: "scale(1.2)" }} // extra scale to allow counter-movement
            draggable={false}
          />
          {/* Subtle overlay so it blends with dark bg */}
          {/* <div className="absolute inset-0 bg-[#0A0A0A]/30" /> */}
          {/* Colored bottom gradient */}
          {/* <div
            className="absolute bottom-0 left-0 right-0 h-1/3"
            style={{
              background:
                "linear-gradient(to top, rgba(139,92,246,0.3), transparent)",
            }}
          /> */}
        </div>
      </div>

      {/* Floating background text — much darker */}
      {floatingItems.map((item, i) => (
        <div
          key={item.label}
          className="float-item absolute pointer-events-none select-none z-20"
          style={{ left: item.x, top: item.y }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ delay: 1.2 + item.delay, duration: 1 }}
            className="font-display text-[11px] 2xl:text-[13px] 3sxl:text-lg 3xl:text-xl tracking-[0.2em] uppercase"
            style={{
              color: "#ffffff", // ← was 0.08, now 0.03 — very dark font-mono
              animation: `float ${item.duration}s ease-in-out ${item.delay}s infinite`,
            }}
          >
            {item.label}
          </motion.span>
        </div>
      ))}

      {/* Radial glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-5">
        {/* Name */}
        <div className="flex items-end gap-[0.02em]  mb-4 2xl:mb-6">
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              variants={fadeUp}
              initial="hidden"
              animate={controls}
              custom={i * 0.5}
              className="font-display text-[clamp(64px,12vw,160px)] 2xl:text-[180px] 3sxl:text-[220px] 3xl:text-[260px] text-white leading-[0.9] tracking-normal"
              style={{
                background:
                  i >= 3
                    ? "linear-gradient(135deg, #F5F5F5 0%, #71717A 100%)"
                    : "linear-gradient(135deg, #F5F5F5 0%, #A1A1AA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={controls}
          custom={4}
          className="flex items-center gap-4 mb-6 2xl:mb-8"
        >
          <div className="w-10  2xl:w-14 h-px bg-gradient-to-r from-transparent to-zinc-600" />
          <span className="xs-s-text text-[11px] 2xl:text-[13px] 3sxl:text-lg 3xl:text-[20px] font-mono tracking-[0.25em] text-zinc-500 uppercase">
            Full Stack Developer
          </span>
          <div className="w-10 2xl:w-14 3xl:w-20 h-px bg-gradient-to-l from-transparent to-zinc-600" />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={controls}
          custom={5}
          className="text-zinc-400 xs-text text-base md:text-lg 2xl:text-xl 3sxl:text-2xl 3xl:text-3xl max-w-md 2xl:max-w-xl 3xl:max-w-4xl leading-relaxed mb-12 2xl:mb-16"
        >
          I build fast, modern web experiences that feel as good as they look.
          Based in Karachi — working with clients worldwide.
        </motion.p>

        {/* CTA Buttons */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={controls}
          custom={6}
          className="relative flex items-start justify-center "
        >
          <button
            onClick={() => scrollTo("#projects")}
            data-cursor="pointer"
            className="bg-white transition-transform transform-gpu text-black font-semibold xs-text text-sm 2xl:text-base 3sxl:text-xl 3xl:text-2xl xs-px px-4  md:px-8 2xl:px-10 py-3.5 2xl:py-4 3sxl:py-5 3xl:py-6 rounded-xl hover:bg-zinc-100  duration-300 
            ease-in
            
            hover:scale-95 
            
hover:shadow-xl

             will-change-transform
            
            cursor-pointer border-none"
          >
            View My Work
          </button>

          {/* Scroll indicator */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={controls}
            custom={8}
            className="relative w-4 3xl:w-8 bottom-8 3sxl:bottom-10 3xl:bottom-12  flex flex-col items-center justify-center gap-2"
          >
            <span className="text-[10px] 2xl:text-[12px] 3sxl:text-lg 3xl:text-xl font-mono tracking-[0.2em] text-zinc-600 uppercase">
              Scroll
            </span>
            <div className="w-px h-10 2xl:h-14 bg-gradient-to-b from-zinc-600 to-transparent animate-pulse" />
          </motion.div>

          <button
            onClick={() => scrollTo("#contact")}
            data-cursor="pointer"
            className="group border border-white/15 text-zinc-300 font-semibold xs-text text-sm 2xl:text-base 3sxl:text-xl 3xl:text-2xl xs-px px-4 md:px-8 2xl:px-10 py-3.5 2xl:py-4 3sxl:py-5 3xl:py-6 rounded-xl hover:border-white/30 hover:text-white transition-all duration-300 cursor-pointer flex items-center gap-2"
          >
            <span>Let's Talk</span>
            <ArrowRight
              size={18}
              className="transition-all duration-300 group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
