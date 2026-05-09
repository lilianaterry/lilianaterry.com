import React from "react";
import { C } from "../constants.js";
import { useIsMobile, ProjectCard } from "../components.jsx";

const ZINES_PROJECTS = [
  { id: 1, title: "Neon Dreams Zine",    type: "print",        imgHeight: "160px" },
  { id: 2, title: "Riso Greeting Cards", type: "print",        imgHeight: "118px" },
  { id: 3, title: "Wild Garden Series",  type: "illustration", imgHeight: "180px" },
  { id: 4, title: "Botanical Type Study",type: "illustration", imgHeight: "148px" },
  { id: 5, title: "Grid System Spec",    type: "design",       imgHeight: "124px" },
  { id: 6, title: "Soft Geometry Poster",type: "design",       imgHeight: "166px" },
];

const ZinesSection = () => {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: isMobile ? "20px 16px" : "48px" }}>
      <h2
        style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: isMobile ? "1.3rem" : "1.9rem",
          color: C.black,
          marginBottom: "6px",
          letterSpacing: "0.02em",
        }}
      >
        Zines
      </h2>
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.68rem",
          color: C.midGray,
          marginBottom: "28px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        self-published works &amp; print projects
      </p>
      <div style={{ columns: isMobile ? "2 140px" : "3 220px", columnGap: isMobile ? "12px" : "20px" }}>
        {ZINES_PROJECTS.map((project) => (
          <div key={project.id} style={{ breakInside: "avoid", marginBottom: "20px" }}>
            <ProjectCard card={{ ...project, rotation: 0, x: 0, y: 0, width: "100%" }} isDraggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZinesSection;
