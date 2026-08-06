import { useState, useRef, useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "./components/loader/PageLoader";
import CustomCursor from "./components/cursor/CustomCursor";
import Hero from "./components/sections/Hero";
import Lenis from "lenis";
import HomePage from "./pages/HomePage";
import Navbar from "./components/layout/Navbar";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <>
      {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}
      {isDesktop && <CustomCursor />}

      <Navbar loaded={loaded} />

      <Routes>
        <Route path="/" element={<HomePage loaded={loaded} />} />
      </Routes>
    </>
  );
}
