import { useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import { useScrollTo } from "./useScrollTo";

export function useScrollNavigation() {
  const { setIsClick, setActiveSection } = useApp();
  const scrollTimeoutRef = useRef(null);

  const scrollTo = useScrollTo();

  const navigateToSection = (e, target, onBeforeScroll) => {
    e.preventDefault();

    if (onBeforeScroll) {
      onBeforeScroll();
    }

    setIsClick(false);
    setActiveSection(target.replace("#", ""));
    scrollTo(target);

    clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      setIsClick(true);
    }, 1000);
  };

  useEffect(() => {
    return () => clearTimeout(scrollTimeoutRef.current);
  }, []);

  return { navigateToSection };
}
