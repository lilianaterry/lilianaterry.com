import React from "react";
import { C } from "../constants.js";
import { useIsMobile, MacWindow, ContactButton } from "../components.jsx";

const ContactSection = () => {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        padding: isMobile ? "16px" : "48px",
        paddingTop: isMobile ? "24px" : "64px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
      }}
    >
      <MacWindow title="correspondence">
        <h2
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "1.5rem",
            color: C.black,
            marginBottom: "12px",
            letterSpacing: "0.02em",
          }}
        >
          Say Hello
        </h2>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.75rem",
            lineHeight: "1.75",
            color: C.darkGray,
            marginBottom: "28px",
            maxWidth: "300px",
          }}
        >
          Whether you have questions about natural dye workshops, want to
          collaborate, or just want to say hi — my inbox is always open.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <ContactButton
            href="mailto:lilianaterrys@gmail.com"
            label="✉  Email Me"
          />
        </div>
      </MacWindow>
    </div>
  );
};

export default ContactSection;
