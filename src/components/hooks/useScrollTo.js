export function useScrollTo() {
  const scrollTo = (target, options = {}) => {
    const lenis = window.__lenis;
    if (!lenis) return;

    lenis.scrollTo(target, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      offset: -80, // offset for fixed navbar height
      ...options,
    });
  };

  return scrollTo;
}
