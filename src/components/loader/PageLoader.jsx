// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// export default function PageLoader({ onComplete }) {
//   const loaderRef = useRef(null);
//   const lettersRef = useRef([]);
//   const subtitleRef = useRef(null);
//   const lineRef = useRef(null);
//   const leftPanelRef = useRef(null);
//   const rightPanelRef = useRef(null);

//   const name = "RAYYAN";

//   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     const tl = gsap.timeline({
//       onComplete: () => {
//         document.body.style.overflow = "";
//         onComplete?.();
//       },
//     });

//     // set initial states
//     gsap.set(lettersRef.current, { y: 80, opacity: 0 });
//     gsap.set(subtitleRef.current, { opacity: 0, y: 10 });
//     gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
//     gsap.set(leftPanelRef.current, { x: "0%" });
//     gsap.set(rightPanelRef.current, { x: "0%" });

//     // 1 — letters drop in one by one
//     tl.to(lettersRef.current, {
//       y: 0,
//       opacity: 1,
//       duration: 0.06,
//       stagger: 0.07,
//       ease: "power3.out",
//     })

//     // 2 — subtitle fades in
//     .to(subtitleRef.current, {
//       opacity: 1,
//       y: 0,
//       duration: 0.5,
//       ease: "power2.out",
//     }, "-=0.1")

//     // 3 — line draws left to right
//     .to(lineRef.current, {
//       scaleX: 1,
//       duration: 0.6,
//       ease: "power3.inOut",
//     }, "-=0.2")

//     // 4 — hold for a beat
//     .to({}, { duration: 0.4 })

//     // 5 — everything fades out fast
//     .to(
//       [lettersRef.current, subtitleRef.current, lineRef.current],
//       { opacity: 0, duration: 0.25, ease: "power2.in" }
//     )

//     // 6 — split exit — left goes left, right goes right
//     .to(
//       leftPanelRef.current,
//       { x: "-100%", duration: 0.8, ease: "power4.inOut" },
//     )
//     .to(
//       rightPanelRef.current,
//       { x: "100%", duration: 0.8, ease: "power4.inOut" },
//       "<" // same time as left
//     );

//   }, []);

//   return (
//     <div
//       ref={loaderRef}
//       className="fixed inset-0 z-[9999] flex items-center justify-center"
//     >
//       {/* Left panel */}
//       <div
//         ref={leftPanelRef}
//         className="absolute top-0 left-0 w-1/2 h-full bg-[#0A0A0A] z-10"
//       />

//       {/* Right panel */}
//       <div
//         ref={rightPanelRef}
//         className="absolute top-0 right-0 w-1/2 h-full bg-[#0A0A0A] z-10"
//       />

//       {/* Content — sits above panels */}
//       <div className="relative z-20 flex flex-col items-center gap-5 select-none">

//         {/* Name letters */}
//         <div className="flex items-center gap-1 md:gap-2 overflow-hidden">
//           {name.split("").map((letter, i) => (
//             <span
//               key={i}
//               ref={(el) => (lettersRef.current[i] = el)}
//               className="font-display text-[clamp(52px,10vw,120px)] text-white leading-none tracking-[0.08em]"
//             >
//               {letter}
//             </span>
//           ))}
//         </div>

//         {/* Line */}
//         <div
//           ref={lineRef}
//           className="w-full h-px bg-gradient-to-r from-blue-500 via-violet-500 to-green-500"
//           style={{ transform: "scaleX(0)" }}
//         />

//         {/* Subtitle */}
//         <p
//           ref={subtitleRef}
//           className="text-[11px] font-mono tracking-[0.3em] text-zinc-500 uppercase"
//         >
//           Full Stack Developer
//         </p>

//       </div>
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageLoader({ onComplete }) {
  const loaderRef = useRef(null);
  const lettersRef = useRef([]);
  const subtitleRef = useRef(null);
  const lineRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const dotsRef = useRef([]);

  const name = "RAYYAN";

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete?.();
      },
    });

    gsap.set(lettersRef.current, { y: 80, opacity: 0 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 10 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(leftPanelRef.current, { x: "0%" });
    gsap.set(rightPanelRef.current, { x: "0%" });
    gsap.set(dotsRef.current, { opacity: 0, scale: 0 });

    // 1 — letters drop in
    tl.to(lettersRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.06,
      stagger: 0.07,
      ease: "power3.out",
    })

      // 2 — line draws
      .to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 0.7,
          ease: "power3.inOut",
        },
        "-=0.1",
      )

      // 3 — dots pop in staggered
      .to(
        dotsRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.08,
          ease: "back.out(2)",
        },
        "-=0.3",
      )

      // 4 — subtitle fades in
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.1",
      )

      // 5 — hold
      .to({}, { duration: 0.5 })

      // 6 — everything fades out
      .to(
        [
          lettersRef.current,
          subtitleRef.current,
          lineRef.current,
          dotsRef.current,
        ],
        { opacity: 0, duration: 0.25, ease: "power2.in" },
      )

      // 7 — split exit
      .to(leftPanelRef.current, {
        x: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
      })
      .to(
        rightPanelRef.current,
        {
          x: "100%",
          duration: 0.8,
          ease: "power4.inOut",
        },
        "<",
      );
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      {/* Left panel */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#0A0A0A] z-10"
      />

      {/* Right panel */}
      <div
        ref={rightPanelRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#0A0A0A] z-10"
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center gap-5 select-none">
        {/* Name letters */}
        <div className="flex items-center gap-1 md:gap-2 overflow-hidden">
          {name.split("").map((letter, i) => (
            <span
              key={i}
              ref={(el) => (lettersRef.current[i] = el)}
              className="font-display text-[clamp(52px,10vw,120px)] 2xl:text-[150px] 2mxl:text-[180px] 3sxl:text-[220px] 3xl:text-[260px] text-white leading-none tracking-[0.08em]"
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Line + dots row */}
        <div className="relative w-full flex items-center gap-2">
          {/* Animated line */}
          <div
            ref={lineRef}
            className="flex-1 h-px bg-gradient-to-r from-blue-500 via-violet-500 to-green-500"
            style={{ transform: "scaleX(0)" }}
          />
          {/* Three dots at end of line */}
          {[0, 1, 2].map((_, i) => (
            <div
              key={i}
              ref={(el) => (dotsRef.current[i] = el)}
              className="w-1 h-1 2xl:w-1.5 2xl:h-1.5 3xl:w-2 3xl:h-2 rounded-full flex-shrink-0"
              style={{
                background: ["#3B82F6", "#8B5CF6", "#22C55E"][i],
              }}
            />
          ))}
        </div>

        {/* Subtitle — premium feel */}
        <div
          ref={subtitleRef}
          className="flex items-center gap-3 2xl:gap-4 3xl:gap-5"
        >
          {/* Left accent */}
          <div className="flex gap-1 2xl:gap-1.5">
            {["#3B82F6", "#8B5CF6", "#22C55E"].map((color, i) => (
              <div
                key={i}
                className="w-1 h-1 2xl:w-1.5 2xl:h-1.5 rounded-full opacity-60"
                style={{ background: color }}
              />
            ))}
          </div>

          <span className="text-[11px] 2xl:text-[13px] 2mxl:text-[15px] 3sxl:text-[18px] 3xl:text-[22px] font-mono tracking-[0.35em] text-zinc-500 uppercase">
            Full Stack Developer
          </span>

          {/* Right accent */}
          <div className="flex gap-1 2xl:gap-1.5">
            {["#22C55E", "#8B5CF6", "#3B82F6"].map((color, i) => (
              <div
                key={i}
                className="w-1 h-1 2xl:w-1.5 2xl:h-1.5 rounded-full opacity-60"
                style={{ background: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
