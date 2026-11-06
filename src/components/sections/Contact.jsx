import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaArrowRight,
} from "react-icons/fa";
import { SiFiverr } from "react-icons/si";
import { fadeUp } from "../../lib/motion";
import SectionLabel from "../ui/SectionLabel";
import { Phone } from "lucide-react";
const socials = [
  {
    label: "GitHub",
    handle: "@Rayyan",
    href: "https://github.com/rayan9476",
    icon: <FaGithub size={24} className="xs-w" />,
    // color: "#F5F5F5",
    color: "#C9D1D9",
  },
  {
    label: "LinkedIn",
    handle: "Rayyan",
    href: "https://linkedin.com/in/rayyan-khan-585655322",
    icon: <FaLinkedin size={24} className="xs-w" />,
    color: "#3B82F6",
  },
  {
    label: "Fiverr",
    handle: "@Rayyan",
    href: "https://fiverr.com/hellorayyan",
    icon: <SiFiverr size={28} className="xs-w2 xl:w-[34px] xl:h-[34px]" />,
    color: "#22C55E",
  },
  {
    label: "Instagram",
    handle: "@Rayyan",
    href: "https://instagram.com/hellorayyan.dev",
    icon: <FaInstagram size={24} className="xs-w" />,
    color: "#8B5CF6",
  },
];

// Scramble text for heading
function ScrambleHeading({ text }) {
  const ref = useRef(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let rafId;
    let started = false;
    const totalFrames = 20;

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      el.textContent = text
        .split("")
        .map((char, i) => {
          if (char === " " || char === ".") return char;
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [text]);

  return <span ref={ref}>{text}</span>;
}

export default function Contact({ id }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = "Name must contain only letters";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (
      formData.phone.trim() &&
      !/^[\d\s\+\-\(\)]{7,15}$/.test(formData.phone.trim())
    ) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbzMXlXa6WMkXlGzzXW3CR7Rp3QlYja_VUCwazBgGV_b6HEoA0m6Czt4y4v0UfF3F_eqtg/exec";

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }).toString(),
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id={id}
      className="relative py-24 px-5 md:px-10 lg:px-16 xl:px-24  overflow-hidden"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] 2xl:w-[800px] 3xl:w-[1000px] h-[400px] 2xl:h-[500px] 3xl:h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(34,197,94,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1400px] 2mxl:max-w-full mx-auto relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0}
        >
          <SectionLabel number="05" title="Contact" color="text-green-500" />
        </motion.div>

        {/* Big heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
          className="font-display text-[clamp(40px,7vw,100px)] 2xl:text-[120px] 2mxl:text-[140px] 3sxl:text-[170px] 3xl:text-[200px] text-white leading-[1.05] mb-6 max-w-3xl 2xl:max-w-5xl 3sxl:max-w-[1200px] 3xl:max-w-[1500px]"
        >
          <ScrambleHeading text="Let's work together." />
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={2}
          className="text-zinc-400 text-lg 2xl:text-xl 3sxl:text-2xl 3xl:text-3xl max-w-lg 2xl:max-w-xl 3sxl:max-w-[1000px] 3xl:max-w-7xl leading-relaxed mb-3"
        >
          I'm currently available for freelance projects and open to full-time
          opportunities. Have something in mind? Let's talk.
        </motion.p>

        {/* Location — 3rd line */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={2.5}
          className="flex items-center gap-2 text-zinc-500 xs-s-text text-[12px] lg:text-xs xl:text-base 2xl:text-lg 3sxl:text-xl 3xl:text-2xl mb-12 2xl:mb-16 3xl:mb-20"
        >
          <Phone className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 3sxl:w-8 3sxl:h-8 3xl:w-9 3xl:h-9 text-green-400" />

          <a
            href="tel:+923112336894"
            // target="_blank"
            // rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors duration-300 hover:text-green-500"
          >
            Based in Karachi, Pakistan · Open to remote work
          </a>
        </motion.p>

        {/* Contact form */}

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 2xl:mb-20 3xl:mb-24 max-w-4xl 2xl:max-w-5xl 3sxl:max-w-6xl 3xl:max-w-7xl mx-auto"
        >
          {submitted ? (
            /* Success state */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="border-t border-white/10 pt-12 pb-6"
            >
              <span className="inline-flex items-center gap-2 text-green-400 font-mono text-xs lg:text-sm 2xl:text-lg 3sxl:text-xl 3xl:text-2xl tracking-[0.2em] uppercase mb-6">
                <span className="w-2 h-2 2xl:w-2.5 2xl:h-2.5  3sxl:w-3 3sxl:h-3 3xl:w-3.5 3xl:h-3.5 rounded-full bg-green-500 animate-pulse" />
                Message received
              </span>
              <h3 className="font-display text-white italic text-[clamp(32px,5vw,64px)] 2xl:text-[80px] 3xl:text-[110px] leading-[1.05] mb-6">
                Thank you. Talk soon.
              </h3>
              <p className="text-zinc-400 max-w-md 3sxl:max-w-xl 3xl:max-w-2xl lg:text-lg 2xl:text-xl 3sxl:text-2xl 3xl:text-3xl leading-7 mb-10">
                Thanks for reaching out. I'll review your project and get back
                to you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    service: "",
                    budget: "",
                    message: "",
                  });
                }}
                className="group inline-flex items-center gap-3 text-green-400 font-mono text-sm lg:text-lg 2xl:text-xl 3sxl:text-2xl 3xl:text-3xl tracking-wide cursor-pointer"
              >
                <span className="underline underline-offset-4">
                  Send another
                </span>
                <FaArrowRight
                  size={20}
                  className="-rotate-45 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 3xl:w-7 3xl:h-7"
                />
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col">
              {/* Question rows */}
              {[
                {
                  name: "name",
                  num: "01",
                  label: "What's your name?",
                  type: "text",
                  placeholder: "John Doe",
                },
                {
                  name: "email",
                  num: "02",
                  label: "What's your email?",
                  type: "email",
                  placeholder: "john@example.com",
                },
                {
                  name: "phone",
                  num: "03",
                  label: "WhatsApp / phone?",
                  type: "tel",
                  placeholder: "+92 300 0000000",
                },
              ].map((field) => {
                const filled = !!formData[field.name]?.trim();
                const active = focused === field.name;
                return (
                  <div
                    key={field.name}
                    className="group relative grid grid-cols-[44px_1fr] md:grid-cols-[80px_1fr] 3xl:grid-cols-[120px_1fr] items-start gap-2 border-t border-white/10 py-6 md:py-8 3xl:py-10"
                  >
                    <span
                      className={`font-mono text-xs md:text-sm lg:text-xl 3sxl:text-2xl 3xl:text-3xl pt-2 transition-colors duration-300 ${
                        filled || active ? "text-green-400" : "text-zinc-600"
                      }`}
                    >
                      {filled && !active ? "✓" : field.num}
                    </span>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={field.name}
                        className="text-white font-mono text-[11px] md:text-xs lg:text-sm 3sxl:text-lg 3xl:text-xl tracking-[0.15em] uppercase"
                      >
                        {field.label}
                      </label>

                      <div className="relative">
                        <input
                          id={field.name}
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          onFocus={() => setFocused(field.name)}
                          onBlur={() => setFocused("")}
                          placeholder={field.placeholder}
                          required
                          autoComplete="off"
                          className="w-full bg-transparent text-white font-display text-[clamp(22px,3.2vw,40px)] 2xl:text-[48px] 3sxl:text-[56px] 3xl:text-[64px] placeholder-zinc-700 outline-none py-2"
                        />
                        {/* Animated focus line */}
                        <span
                          className={`absolute left-0 -bottom-[1px] h-px w-full bg-green-500 origin-left transition-transform duration-500 ease-out ${
                            active ? "scale-x-100" : "scale-x-0"
                          }`}
                        />
                      </div>

                      {errors[field.name] && (
                        <p className="text-red-400 text-xs lg:text-sm 3xl:text-base flex items-center gap-1">
                          <span>⚠</span> {errors[field.name]}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Message row */}
              <div className="relative grid grid-cols-[44px_1fr] md:grid-cols-[80px_1fr] 3xl:grid-cols-[120px_1fr] items-start gap-2 border-t border-white/10 py-6 md:py-8 3xl:py-10">
                <span
                  className={`font-mono text-xs md:text-sm lg:text-xl 3sxl:text-2xl 3xl:text-3xl pt-2 transition-colors duration-300 ${
                    formData.message?.trim() || focused === "message"
                      ? "text-green-400"
                      : "text-zinc-600"
                  }`}
                >
                  {formData.message?.trim() && focused !== "message"
                    ? "✓"
                    : "04"}
                </span>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-white font-mono text-[11px] md:text-xs lg:text-sm 3sxl:text-lg 3xl:text-xl tracking-[0.15em] uppercase"
                  >
                    Tell me about your project
                  </label>

                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      data-lenis-prevent
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused("")}
                      placeholder="Goals, timeline, budget, anything that helps..."
                      required
                      rows={3}
                      className="custom-scrollbar w-full bg-transparent text-white font-display text-[clamp(20px,2.6vw,32px)] 2xl:text-[38px] 3sxl:text-[44px] 3xl:text-[52px] placeholder-zinc-700 outline-none resize-none py-2 leading-snug"
                    />
                    <span
                      className={`absolute left-0 -bottom-[1px] h-px w-full bg-green-500 origin-left transition-transform duration-500 ease-out ${
                        focused === "message" ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </div>

                  {errors.message && (
                    <p className="text-red-400 text-xs 2xl:text-sm 3xl:text-base flex items-center gap-1">
                      <span>⚠</span> {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit row */}
              <div className="flex items-center justify-between gap-6 border-t border-white/10 pt-8 3xl:pt-10">
                <p className="text-zinc-500 text-sm 2xl:text-base 3xl:text-xl max-w-[220px] md:max-w-xs 3xl:max-w-md leading-relaxed">
                  No spam, ever. I usually reply{" "}
                  <span className="text-white">within 24 hours.</span>
                </p>

                {/* <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.95 }}
                  data-cursor="pointer"
                  className="group relative flex-shrink-0 w-28 h-28 md:w-36 md:h-36 2xl:w-44 2xl:h-44 3xl:w-56 3xl:h-56 rounded-full border border-white/20 text-white flex flex-col items-center justify-center gap-2 overflow-hidden transition-all duration-500 hover:border-green-500 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                > */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.95 }}
                  data-cursor="pointer"
                  className="group relative flex-shrink-0 w-28 h-28 md:w-36 md:h-36 2xl:w-44 2xl:h-44 3xl:w-56 3xl:h-56 rounded-full border border-white/20 text-white flex flex-col items-center justify-center gap-2 transition-colors duration-500 hover:border-green-500 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {/* Fill on hover */}
                  {/* <span className="absolute inset-0 bg-green-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" /> */}
                  <span className="absolute -inset-px rounded-full bg-green-500 [clip-path:circle(0%_at_50%_50%)] group-hover:[clip-path:circle(71%_at_50%_50%)] transition-[clip-path] duration-500 ease-out" />
                  <span className="relative z-10 flex flex-col items-center gap-2">
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin w-5 h-5 3xl:w-8 3xl:h-8"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="white"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="white"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        <span className="font-mono text-[11px] lg:text-lg 3sxl:text-lg 3xl:text-xl tracking-widest uppercase">
                          Sending
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="font-mono text-[11px] md:text-xs lg:text-lg 2xl:text-xl  3xl:text-2xl  tracking-widest uppercase">
                          Send
                        </span>
                        <FaArrowRight
                          size={20}
                          className="-rotate-45 transition-transform duration-500 group-hover:rotate-0 3xl:w-8 3xl:h-8"
                        />
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Primary CTA — big email */}
        <motion.a
          href="mailto:hellorayyan.dev@gmail.com"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={3}
          data-cursor="pointer"
          className="group inline-flex items-center gap-4 mb-16 2xl:mb-20 3xl:mb-24"
        >
          <span className="font-display text-[clamp(24px,4vw,48px)] 2xl:text-[60px] 2mxl:text-[72px] 3sxl:text-[88px] 3xl:text-[100px] text-white italic group-hover:text-green-400 transition-colors duration-300">
            hello@rayyan.dev
          </span>
          <div className="w-10 h-10 2xl:w-14 2xl:h-14 3sxl:w-16 3sxl:h-16 3xl:w-20 3xl:h-20 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-green-500 group-hover:border-green-500 transition-all duration-300">
            <FaArrowRight
              size={14}
              className="-rotate-45 2xl:w-5 2xl:h-5 3sxl:w-6 3sxl:h-6 3xl:w-7 3xl:h-7"
            />
          </div>
        </motion.a>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={4}
          className="w-full h-px bg-white/8 mb-12 2xl:mb-16 3xl:mb-20"
        />

        {/* Social links */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={5}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 2xl:gap-5 3xl:gap-6 mb-4 2xl:mb-8 3xl:mb-10"
        >
          {socials.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="pointer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              style={{
                borderColor: `${social.color}30`,
                background: `${social.color}08`,
              }}
              className=" group flex items-center gap-3 2xl:gap-4 3xl:gap-5  border   rounded-xl 2xl:rounded-2xl xs-p2 p-4 2xl:p-5 3xl:p-6  transition-all duration-300"
            >
              <div
                className="  w-9 h-9 2xl:w-11 2xl:h-11 3sxl:w-13 3sxl:h-13 3xl:w-14 3xl:h-14 rounded-lg 2xl:rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                style={{
                  background: `${social.color}10`,
                  color: social.color,
                }}
              >
                {social.icon}
              </div>
              <div>
                <p className=" text-white xs-s-text text-sm 2xl:text-base 3sxl:text-lg 3xl:text-xl font-medium leading-none mb-1">
                  {social.label}
                </p>
                <p className=" text-zinc-600 xs-xxs-text text-xs 2xl:text-sm 3sxl:text-base 3xl:text-lg">
                  {social.handle}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

//  <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="lg:col-span-3"
//         >
//           <div className="mb-12 2xl:mb-16 3xl:mb-20 max-w-2xl 2xl:max-w-3xl 3sxl:max-w-4xl 3xl:max-w-7xl mx-auto  rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10 shadow-[0_25px_80px_rgba(0,0,0,.45)]">
//             {submitted ? (
//               /* Success state */
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="flex flex-col items-center justify-center text-center py-16 gap-6"
//               >
//                 <div className="w-20 h-20 3xl:w-24 3xl:h-24 rounded-full bg-[#4CAF4F]/20 border border-[#4CAF4F]/40 flex items-center justify-center text-4xl">
//                   ✓
//                 </div>
//                 <h3 className="text-white text-2xl 3xl:text-4xl font-bold">
//                   Message Sent!
//                 </h3>
//                 <p className="text-zinc-400 max-w-sm 3xl:text-lg 3xl:max-w-md leading-7">
//                   Thanks for reaching out. I'll review your project and get back
//                   to you within 24 hours.
//                 </p>
//                 <button
//                   onClick={() => {
//                     setSubmitted(false);
//                     setFormData({
//                       name: "",
//                       email: "",
//                       service: "",
//                       budget: "",
//                       message: "",
//                     });
//                   }}
//                   className="mt-2 text-[#4CAF4F] border border-[#4CAF4F]/40 hover:bg-[#4CAF4F]/10 px-6 py-3 3xl:text-2xl rounded-xl font-medium transition-all duration-300 cursor-pointer"
//                 >
//                   Send Another
//                 </button>
//               </motion.div>
//             ) : (
//               <form
//                 // ref={formRef}
//                 onSubmit={handleSubmit}
//                 className="flex flex-col gap-5"
//               >
//                 {/* Name + Email row */}
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   {[
//                     {
//                       name: "name",
//                       label: "Your Name",
//                       type: "text",
//                       placeholder: "John Doe",
//                     },
//                     {
//                       name: "email",
//                       label: "Your Email",
//                       type: "email",
//                       placeholder: "john@example.com",
//                     },
//                     {
//                       name: "phone",
//                       label: "Phone / WhatsApp",
//                       type: "tel",
//                       placeholder: "+92 300 0000000",
//                       fullWidth: true,
//                     },
//                   ].map((field) => (
//                     <div
//                       key={field.name}
//                       // className="flex flex-col gap-2"
//                       className={`flex flex-col gap-2 ${field.fullWidth ? "sm:col-span-2" : ""}`}
//                     >
//                       <label className="text-zinc-400 text-sm 3xl:text-lg font-medium">
//                         {field.label}
//                       </label>
//                       <input
//                         type={field.type}
//                         name={field.name}
//                         value={formData[field.name]}
//                         onChange={handleChange}
//                         onFocus={() => setFocused(field.name)}
//                         onBlur={() => setFocused("")}
//                         placeholder={field.placeholder}
//                         required
//                         className={`bg-white/5 border rounded-xl px-4 py-3.5 text-white text-sm 3xl:text-lg placeholder-zinc-600 outline-none transition-all duration-300
//                             ${
//                               focused === field.name
//                                 ? "border-green-500/60 bg-[#4CAF4F]/5 shadow-[0_0_0_3px_rgba(76,175,79,0.1)]"
//                                 : "border-white/10 hover:border-white/20"
//                             }`}
//                       />
//                       {errors[field.name] && (
//                         <p className="text-red-400 text-xs 3xl:text-base mt-1 flex items-center gap-1">
//                           <span>⚠</span> {errors[field.name]}
//                         </p>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Message */}
//                 <div className="flex flex-col gap-2 overflow-hidden scrollbar-none rounded-xl">
//                   <label className="text-zinc-400 text-sm 3xl:text-lg font-medium">
//                     Project Details
//                   </label>

//                   <div
//                     className={`bg-white/5  rounded-xl   border  w-full overflow-hidden

//                      ${
//                        focused === "message"
//                          ? "border-green-500/60 bg-green-500/5 shadow-[0_0_0_3px_rgba(76,175,79,0.1)]"
//                          : "border-white/10 hover:border-white/20"
//                      }`}
//                   >
//                     <textarea
//                       name="message"
//                       data-lenis-prevent
//                       value={formData.message}
//                       onChange={handleChange}
//                       onFocus={() => setFocused("message")}
//                       onBlur={() => setFocused("")}
//                       placeholder="Tell us about your project, goals, timeline..."
//                       required
//                       rows={5}
//                       className={`  custom-scrollbar w-full   px-4 py-3.5 text-white text-sm 3xl:text-lg  placeholder-zinc-600 outline-none transition-all duration-300 resize-none
//                         `}
//                     />
//                     {errors.message && (
//                       <p className="text-red-400 text-xs 2xl:text-[14px] 3xl:text-base mt-1 flex items-center gap-1">
//                         <span>⚠</span> {errors.message}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Submit */}
//                 <motion.button
//                   type="submit"
//                   // whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   disabled={loading}
//                   className="mt-2 w-full 3xl:text-2xl bg-green-500 hover:bg-green-600 disabled:opacity-70 disabled:cursor-not-allowed text-white   font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer border-none shadow-[0_4px_20px_rgba(76,175,79,0.3)] hover:shadow-[0_6px_30px_rgba(76,175,79,0.45)]"
//                 >
//                   {loading ? (
//                     <>
//                       <svg
//                         className="animate-spin w-5 h-5"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="white"
//                           strokeWidth="4"
//                         />
//                         <path
//                           className="opacity-75"
//                           fill="white"
//                           d="M4 12a8 8 0 018-8v8z"
//                         />
//                       </svg>
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       Send Message{" "}
//                       <FaArrowRight size={18} className="3xl:w-7 3xl:h-7" />
//                     </>
//                   )}
//                 </motion.button>
//               </form>
//             )}
//           </div>
//         </motion.div>
