import React from "react";
import { C } from "../constants.js";
import { useIsMobile } from "../components.jsx";

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
        style={
          isMobile
            ? { display: "flex", flexDirection: "column" }
            : {
                display: "grid",
                gridTemplateColumns: "210px 1fr",
                gap: "52px",
                alignItems: "start",
              }
        }
      >
        {/* Portrait — polaroid frame on desktop, clean square photo on mobile */}
        <div
          style={
            isMobile
              ? { marginBottom: "24px", userSelect: "none" }
              : {
                  background: C.white,
                  padding: "8px 8px 38px",
                  border: `2px solid ${C.black}`,
                  boxShadow: `4px 4px 0 ${C.black}`,
                  transform: "rotate(-2deg)",
                  userSelect: "none",
                }
          }
        >
          <div
            style={{
              background: C.offWhite,
              aspectRatio: isMobile ? "1 / 1" : "3 / 4",
              border: `1px solid ${C.lightGray}`,
              overflow: "hidden",
            }}
          >
            <img
              src="/images/about/self-portrait.jpeg"
              alt="Liliana Airhart"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 20%",
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement.style.display = "flex";
                e.currentTarget.parentElement.innerHTML =
                  '<span style="font-family: Space Mono, monospace; font-size: 0.62rem; color: #0D0D0D; opacity: 0.3; margin: auto">[ photo here ]</span>';
              }}
            />
          </div>
          {!isMobile && (
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.62rem",
                color: C.black,
                opacity: 0.4,
                marginTop: "8px",
                textAlign: "center",
              }}
            >
              that's me →
            </p>
          )}
        </div>

        {/* Bio */}
        <div>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.78rem",
              lineHeight: "1.9",
              color: C.black,
              marginBottom: "18px",
            }}
          >
            Hello! I'm a multidisciplinary illustrator and citizen scientist
            with a love for nature, textiles, and the handmade. <br></br>{" "}
            <br></br> My work explores the modern relationship between humans
            and native ecosystems. Both intentionally and inadvertently, human
            movement has introduced invasive species into new environments.
            Often these species were brought for their inherit value: Garlic
            Mustard is a delicious cooking herb, English Ivy is a beautiful
            material to make soap. Many of our introduced plants thrive and
            out-compete native plants, through no fault of their own. And now
            both we and our native landscapes coexist with them in a new
            relationship. We walk by hundreds of species of plants in our daily
            routines, not knowing their names or their native homes. We have no
            ability to recognize a native plant from an invasive one, green is
            green. <br></br> <br></br> To the viewer of my work, I hope to help
            you form a new relationship with these invasive plants. I hope you
            come to know them by name, by use, and by their removal protocol.
            Environmental restoration of native ecosystems is essential to
            protecting biodiversity. And biodiversity is essential to a
            climate-change resilient environment. How can we encourage
            responsibility for environmental restoration? And can we bring joy
            and curiosity to the process?
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["Illustration", "Risograph", "Animation", "Natural Dye"].map(
              (skill) => (
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
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
