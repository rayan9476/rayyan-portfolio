export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export const slideLeft = {
  hidden: { opacity: 0, x: 60 },
  show: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export const slideRight = {
  hidden: { opacity: 0, x: -60 },
  show: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};
