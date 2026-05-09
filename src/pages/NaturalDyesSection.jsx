import React from "react";
import { C } from "../constants.js";
import { useIsMobile, ProjectCard } from "../components.jsx";

const NATURAL_DYES_PROJECTS = [
  { id: 1, title: "Indigo Bundle Resist",   type: "illustration", imgHeight: "160px" },
  { id: 2, title: "Weld on Linen",          type: "print",        imgHeight: "148px" },
  { id: 3, title: "Madder Root Swatches",   type: "design",       imgHeight: "118px" },
  { id: 4, title: "Black Walnut Hull Study",type: "illustration", imgHeight: "180px" },
  { id: 5, title: "Onion Skin Mordant",     type: "print",        imgHeight: "130px" },
];

const NaturalDyesSection = () => {
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
        Natural Dyes
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
        plant-based colour &amp; textile experiments
      </p>
      <div style={{ columns: isMobile ? "2 140px" : "3 220px", columnGap: isMobile ? "12px" : "20px" }}>
        {NATURAL_DYES_PROJECTS.map((project) => (
          <div key={project.id} style={{ breakInside: "avoid", marginBottom: "20px" }}>
            <ProjectCard card={{ ...project, rotation: 0, x: 0, y: 0, width: "100%" }} isDraggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NaturalDyesSection;
