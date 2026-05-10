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
// ROUTING
// ─────────────────────────────────────────────────────────────────────────────

// Parses "#natural-dyes/indigo" → { section: "natural-dyes", subPath: "indigo" }
const parseHash = () => {
  const raw = window.location.hash.replace("#", "");
  if (!raw) return { section: null, subPath: null };
  const [section, ...rest] = raw.split("/");
  return {
    section: SECTION_CONFIG[section] ? section : null,
    subPath: rest.length > 0 ? rest.join("/") : null,
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN CONTENT
// ─────────────────────────────────────────────────────────────────────────────

const renderSection = (section, subPath, onSubNavigate) => {
  switch (section) {
    case "zines":        return <ZinesSection />;
    case "natural-dyes": return <NaturalDyesSection plantId={subPath} onNavigate={onSubNavigate} />;
    case "about":        return <AboutSection />;
    case "contact":      return <ContactSection />;
    default:             return null;
  }
};

const MainContent = ({ activeSection, subPath, onSubNavigate }) => {
  const [display, setDisplay] = useState({ section: activeSection, subPath });
  const [opacity, setOpacity] = useState(1);
  const prevSectionRef = useRef(activeSection);

  useEffect(() => {
    const prevSection = prevSectionRef.current;
    prevSectionRef.current = activeSection;

    if (activeSection === prevSection) {
      // Sub-path changed within the same section — instant update, no fade
      setDisplay({ section: activeSection, subPath });
      return;
    }

    // Top-level section changed — cross-fade
    setOpacity(0);
    const t = setTimeout(() => {
      setDisplay({ section: activeSection, subPath });
      setOpacity(1);
    }, 200);
    return () => clearTimeout(t);
  }, [activeSection, subPath]);

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
        {renderSection(display.section, display.subPath, onSubNavigate)}
      </div>
    </main>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────────────────

const App = () => {
  const isMobile = useIsMobile();
  const { section: initSection, subPath: initSubPath } = parseHash();
  const [activeSection, setActiveSectionRaw] = useState(initSection);
  const [subPath, setSubPath] = useState(initSubPath);

  const setActiveSection = (id) => {
    if (id === null) {
      history.pushState(null, "", "/");
    } else {
      history.pushState({ section: id }, "", `#${id}`);
    }
    setActiveSectionRaw(id);
    setSubPath(null);
  };

  // Used by sections to push sub-page routes (e.g. "indigo" → #natural-dyes/indigo)
  const navigateSubPath = (sub) => {
    if (!activeSection) return;
    const hash = sub ? `${activeSection}/${sub}` : activeSection;
    history.pushState({ section: activeSection, subPath: sub }, "", `#${hash}`);
    setSubPath(sub);
  };

  useEffect(() => {
    const onPop = () => {
      const { section, subPath: sp } = parseHash();
      setActiveSectionRaw(section);
      setSubPath(sp);
    };
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
    : (SECTION_CONFIG[activeSection] ?? SECTION_CONFIG.landing);
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
      <MainContent activeSection={activeSection} subPath={subPath} onSubNavigate={navigateSubPath} />
    </div>
  );
};

export default App;
