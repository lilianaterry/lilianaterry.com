import React, { useState, useRef, useEffect } from "react";
import { SECTION_CONFIG } from "./constants.js";
import { useIsMobile, TopNav, StarCursor, CursorTrail, RoomShader, LightShader } from "./components.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ZinesSection from "./pages/ZinesSection.jsx";
import NaturalDyesSection from "./pages/NaturalDyesSection.jsx";
import AboutSection from "./pages/AboutSection.jsx";
import ContactSection from "./pages/ContactSection.jsx";
import { C } from "./constants.js";

// ─────────────────────────────────────────────────────────────────────────────
// MAIN CONTENT
// ─────────────────────────────────────────────────────────────────────────────

const renderSection = (id) => {
  switch (id) {
    case "zines":        return <ZinesSection />;
    case "natural-dyes": return <NaturalDyesSection />;
    case "about":        return <AboutSection />;
    case "contact":      return <ContactSection />;
    default:             return null;
  }
};

const MainContent = ({ activeSection }) => {
  const [displaySection, setDisplaySection] = useState(activeSection);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (activeSection === displaySection) return;
    setOpacity(0);
    const t = setTimeout(() => {
      setDisplaySection(activeSection);
      setOpacity(1);
    }, 200);
    return () => clearTimeout(t);
  }, [activeSection, displaySection]);

  return (
    <main
      style={{
        paddingTop: "54px",
        minHeight: "100vh",
        background: C.white,
        opacity,
        transition: "opacity 0.2s ease",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        {renderSection(displaySection)}
      </div>
    </main>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────────────────

const sectionFromHash = () => {
  const hash = window.location.hash.replace("#", "");
  return hash && SECTION_CONFIG[hash] ? hash : null;
};

const App = () => {
  const isMobile = useIsMobile();
  const [activeSection, setActiveSectionRaw] = useState(sectionFromHash);

  const setActiveSection = (id) => {
    if (id === null) {
      history.pushState(null, "", "/");
    } else {
      history.pushState({ section: id }, "", `#${id}`);
    }
    setActiveSectionRaw(id);
  };

  useEffect(() => {
    const onPop = () => setActiveSectionRaw(sectionFromHash());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const goHome = () => setActiveSection(null);

  const shaderTransitionRef = useRef(null);

  const handleLandingNavigate = (id, e) => {
    if (isMobile) { setActiveSection(id); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    shaderTransitionRef.current = {
      startTime: performance.now(),
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
      onComplete: () => setActiveSection(id),
    };
  };

  const config = activeSection === null
    ? SECTION_CONFIG.landing
    : (SECTION_CONFIG[activeSection] ?? SECTION_CONFIG.home);
  const cursorColor = config.cursorColor;

  if (activeSection === null) {
    return (
      <>
        {!isMobile && <RoomShader intensity={1} transitionRef={shaderTransitionRef} />}
        {!isMobile && <StarCursor color={cursorColor} />}
        {!isMobile && <CursorTrail color={cursorColor} />}
        <LandingPage onNavigate={handleLandingNavigate} />
      </>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      {!isMobile && config.shader === "light" && <LightShader />}
      {!isMobile && <StarCursor color={cursorColor} />}
      {!isMobile && <CursorTrail color={cursorColor} />}
      <TopNav activeSection={activeSection} setActiveSection={setActiveSection} onHome={goHome} />
      <MainContent activeSection={activeSection} />
    </div>
  );
};

export default App;
