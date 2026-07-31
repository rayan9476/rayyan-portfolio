import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// section accent colors — matched by section id
const SECTION_COLORS = {
  home: "#F5F5F5",
  about: "#F5F5F5",
  skills: "#3B82F6", // blue
  projects: "#8B5CF6", // violet
  experience: "#F5F5F5",
  testimonials: "#F5F5F5",
  contact: "#22C55E", // green
};

export default function CustomCursor() {
  const crosshairRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const isProjectHover = useRef(false);

  useEffect(() => {
    const crosshair = crosshairRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let lastTarget = null;
    let currentColor = "#F5F5F5";

    // track active section for color
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const color = SECTION_COLORS[id] || "#F5F5F5";
            currentColor = color;
            gsap.to(ring, {
              borderColor: color,
              duration: 0.4,
              ease: "power2.out",
            });
            gsap.to(crosshair, {
              backgroundColor: color,
              duration: 0.4,
            });
          }
        });
      },
      { threshold: 0.3 },
    );

    // observe all sections
    document
      .querySelectorAll("section[id]")
      .forEach((s) => sectionObserver.observe(s));

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      gsap.set(crosshair, { opacity: 1 });

      gsap.set(crosshair, { x: e.clientX, y: e.clientY });

      if (e.target !== lastTarget) {
        lastTarget = e.target;
        let el = e.target;
        let isHoverable = false;
        let isProject = false;

        // walk DOM tree
        while (el && el !== document.body) {
          const tag = el.tagName?.toLowerCase();
          const cursor = window.getComputedStyle(el).cursor;
          const hasData = el.hasAttribute("data-cursor");
          const isProjectCard = el.hasAttribute("data-project");

          if (isProjectCard) {
            isProject = true;
            isHoverable = true;
            break;
          }

          if (
            tag === "a" ||
            tag === "button" ||
            tag === "input" ||
            tag === "textarea" ||
            tag === "select" ||
            hasData ||
            cursor === "pointer"
          ) {
            isHoverable = true;
            break;
          }

          el = el.parentElement;
        }

        if (isProject && !isProjectHover.current) {
          isProjectHover.current = true;
          // show VIEW label
          gsap.to(ring, {
            scale: 3,
            opacity: 0.8,
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(crosshair, { scale: 0, duration: 0.3 });
          gsap.to(label, { opacity: 1, duration: 0.3 });
        } else if (!isProject && isProjectHover.current) {
          isProjectHover.current = false;
          gsap.to(ring, { scale: 1, opacity: 0.6, duration: 0.3 });
          gsap.to(crosshair, { scale: 1, duration: 0.3 });
          gsap.to(label, { opacity: 0, duration: 0.2 });
        } else if (isHoverable && !isProject) {
          gsap.to(ring, {
            scale: 2,
            opacity: 0.5,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(crosshair, { scale: 0, duration: 0.3 });
        } else if (!isHoverable && !isProject) {
          gsap.to(ring, { scale: 1, opacity: 0.6, duration: 0.3 });
          gsap.to(crosshair, { scale: 1, duration: 0.3 });
        }
      }
    };

    // GSAP ticker — smooth ring follow
    const ticker = () => {
      pos.x += (mouse.x - pos.x) * 0.1;
      pos.y += (mouse.y - pos.y) * 0.1;
      gsap.set(ring, { x: pos.x, y: pos.y });
      gsap.set(label, { x: pos.x, y: pos.y });
    };

    gsap.ticker.add(ticker);
    window.addEventListener("mousemove", onMouseMove);

    const onLeave = () =>
      gsap.to([crosshair, ring, label], { opacity: 0, duration: 0.3 });
    const onEnter = () => {
      gsap.to(crosshair, { opacity: 1, duration: 0.3 });
      gsap.to(ring, { opacity: 0.6, duration: 0.3 });
    };

    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Crosshair dot — instant follow */}
      <div
        ref={crosshairRef}
        className="fixed opacity-0 top-0 left-0 z-[9998] pointer-events-none"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="relative w-[5px] h-[5px]">
          {/* center dot */}
          <div className="absolute inset-0 rounded-full bg-white" />
          {/* crosshair lines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[14px] h-px bg-white opacity-60" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[14px] bg-white opacity-60" />
        </div>
      </div>

      {/* Outer ring — smooth follow */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        style={{
          transform: "translate(-50%, -50%)",
          borderColor: "#F5F5F5",
        }}
      >
        <div
          className="w-9 h-9 rounded-full border opacity-60"
          style={{ borderColor: "inherit" }}
        />
      </div>

      {/* VIEW label — shows on project card hover */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none opacity-0"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <span className="text-[9px] font-mono tracking-[0.15em] text-white uppercase">
          VIEW
        </span>
      </div>
    </>
  );
}
