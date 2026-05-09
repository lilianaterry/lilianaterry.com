import React from "react";
import { C } from "../constants.js";
import { useIsMobile, HandDrawnLine } from "../components.jsx";

const AboutSection = () => {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: isMobile ? "20px 16px" : "48px" }}>
      <h2
        style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: isMobile ? "1.3rem" : "1.9rem",
          color: C.black,
          marginBottom: "28px",
          letterSpacing: "0.02em",
        }}
      >
        About
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "210px 1fr",
          gap: isMobile ? "24px" : "52px",
          alignItems: "start",
        }}
      >
        {/* Polaroid portrait */}
        <div
          style={{
            background: C.white,
            padding: "8px 8px 38px",
            border: `2px solid ${C.black}`,
            boxShadow: `4px 4px 0 ${C.black}`,
            transform: "rotate(-2deg)",
            userSelect: "none",
          }}
        >
          <div
            style={{
              background: C.offWhite,
              height: "188px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${C.lightGray}`,
            }}
          >
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: C.black, opacity: 0.3 }}>
              [ photo here ]
            </span>
          </div>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: C.black, opacity: 0.4, marginTop: "8px", textAlign: "center" }}>
            that's me →
          </p>
        </div>

        {/* Bio */}
        <div>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.78rem", lineHeight: "1.9", color: C.black, marginBottom: "18px" }}>
            Hi! I'm a multidisciplinary illustrator and graphic designer with a love for texture, imperfection, and the handmade. My work lives somewhere between the analog and digital — printed zines, motion loops, and poster series that feel like they were cut out and glued together with a lot of love.
          </p>
          <HandDrawnLine />
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.78rem", lineHeight: "1.9", color: C.black, marginTop: "18px", marginBottom: "18px" }}>
            I'm inspired by old bookmarks, botanical prints, late-night convenience store lighting, and the way certain typefaces feel like a specific decade. I believe design should be joyful first, legible second.
          </p>
          <HandDrawnLine />
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.78rem", lineHeight: "1.9", color: C.black, marginTop: "18px", marginBottom: "28px" }}>
            Currently available for freelance illustration, zine collaborations, and cover art. Based in the studio with too many felt-tip pens.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["Illustration", "Risograph", "Motion", "Editorial", "Lettering", "Collage", "Typography"].map((skill) => (
              <span
                key={skill}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.58rem",
                  fontWeight: "700",
                  padding: "4px 10px",
                  border: `1.5px solid ${C.black}`,
                  background: C.white,
                  color: C.black,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
