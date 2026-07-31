import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion";
import { useScrollTo } from "../hooks/useScrollTo";
import { ArrowUp } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useScrollNavigation } from "../hooks/useScrollNavigation";
// export default function Footer() {
//   const scrollTo = useScrollTo();

//   return (
//     <footer className="relative py-12 px-5 md:px-10 lg:px-16 xl:px-24 border-t border-white/5">
//       <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
//         {/* Left — monogram + copyright */}
//         <div className="flex items-center gap-4">
//           <span className="font-display text-xl text-white italic">R.</span>
//           <span className="text-zinc-700 text-xs">|</span>
//           <span className="text-zinc-600 text-xs font-mono">
//             © {new Date().getFullYear()} Rayyan. All rights reserved.
//           </span>
//         </div>

//         {/* Center — built with */}
//         <p className="text-zinc-700 text-xs font-mono text-center">
//           Built with React · GSAP · Framer Motion · Lenis
//         </p>

//         {/* Right — back to top */}
//         <button
//           onClick={() => scrollTo("#home")}
//           data-cursor="pointer"
//           className="text-xs font-mono tracking-[0.15em] text-zinc-600 hover:text-white transition-colors duration-200 uppercase cursor-pointer border-none bg-transparent flex items-center gap-2"
//         >
//           Back to top
//           <span className="text-zinc-700">↑</span>
//         </button>
//       </div>
//     </footer>
//   );
// }

export default function Footer() {
  const { isClick, setIsClick, setActiveSection } = useApp();

  const scrollTo = useScrollTo();

  const { navigateToSection } = useScrollNavigation();

  const handleClick = (e, target) => {
    navigateToSection(e, target);
  };

  return (
    <footer className="relative py-12 px-5 md:px-10 lg:px-16 xl:px-24 border-t border-white/5">
      <div className="max-w-[1400px] 2mxl:max-w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left — monogram + copyright */}
        <div className="flex items-center gap-4">
          <span className="font-display text-xl lg:text-2xl 2xl:text-3xl 3sxl:text-4xl 3xl:text-5xl text-white italic">
            R.
          </span>
          <span className="text-zinc-700 text-xs lg:text-sm 2xl:text-base 3xl:text-lg">
            |
          </span>
          <span className="text-zinc-600 xs-s-text text-[10px] lg:text-sm 2xl:text-base 3sxl:text-lg 3xl:text-xl font-mono">
            © {new Date().getFullYear()} Rayyan. All rights reserved.
          </span>
        </div>

        {/* Center — built with */}
        <p className="text-zinc-700 xs-s-text text-[10px] lg:text-sm 2xl:text-base 3sxl:text-lg 3xl:text-xl font-mono text-center">
          Built with React · GSAP · Framer Motion · Lenis
        </p>

        {/* Right — back to top */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ y: -2 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
          type="button"
          onClick={(e) => handleClick(e, "#home")}
          data-cursor="pointer"
          className="group xs-s-text text-xs lg:text-sm 2xl:text-base 3sxl:text-lg 3xl:text-xl font-mono tracking-[0.15em] text-green-500 hover:text-white transition-colors duration-200 uppercase cursor-pointer border-none bg-transparent flex items-center gap-2"
        >
          Back to top
          {/* <span className="text-zinc-700"> */}
          <span className="text-green-500">
            {/* ↑ */}
            <ArrowUp
              size={18}
              className="text-green-500 xs-w3 group-hover:text-white transition-colors"
            />
          </span>
        </motion.button>
      </div>
    </footer>
  );
}
