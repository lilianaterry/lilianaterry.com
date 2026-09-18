import React, { useState, useEffect, useRef } from "react";
import { C } from "../constants.js";
import { useIsMobile, StarCursor, CursorTrail } from "../components.jsx";

const ZINES_PROJECTS = [
  {
    id: 1,
    title: "Dyecraft Volume 1: Fundamentals",
    img: "/images/zines/dyecraft_volume1/volume1_hero_shot.webp",
    description:
      "An introduction to the world of natural dyeing — covering the full process from preparation to color modification. Includes 2 plant-based dye recipes. 8-page mini zine. Handbound.",
    edition: "Edition II · 2024",
    purchaseUrl:
      "mailto:lilianaterrys@gmail.com?subject=Zine%20Purchase%20Inquiry&body=Hello%20I'd%20like%20to%20purchase%20a%20zine%2C%20Dyecraft%20Volume%201%3A%20Fundamentals",
    pages: [
      "/images/zines/dyecraft_volume1/dyecraft_volume1_edition2_1.webp",
      "/images/zines/dyecraft_volume1/dyecraft_volume1_edition2_2.webp",
      "/images/zines/dyecraft_volume1/dyecraft_volume1_edition2_3.webp",
      "/images/zines/dyecraft_volume1/dyecraft_volume1_edition2_4.webp",
    ],
  },
  {
    id: 2,
    title: "Dyecraft Volume 2: The Organized Witch",
    img: "/images/zines/dyecraft_volume2/volume2_hero_shot.webp",
    description:
      "A practical grimoire for the working dyer — required equipment, safety instructions, and suggested notetaking. For those who like their magic annotated. Includes 2 plant-based dye recipes. 8-page mini zine. Handbound.",
    edition: "Edition I · 2024",
    purchaseUrl:
      "mailto:lilianaterrys@gmail.com?subject=Zine%20Purchase%20Inquiry&body=Hello%20I'd%20like%20to%20purchase%20a%20zine%2C%20Dyecraft%20Volume%202%3A%20The%20Organized%20Witch",
    pages: [
      "/images/zines/dyecraft_volume2/dyecraft_volume2_edition1_1.webp",
      "/images/zines/dyecraft_volume2/dyecraft_volume2_edition1_2.webp",
      "/images/zines/dyecraft_volume2/dyecraft_volume2_edition1_3.webp",
      "/images/zines/dyecraft_volume2/dyecraft_volume2_edition1_4.webp",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────────────────────────────────────

const ZineLightbox = ({ zine, onClose }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const poofRef = useRef([]);
  const closingRef = useRef(false);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [whiteCursor, setWhiteCursor] = useState(true);

  // Fade in on mount
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Canvas: floating stars + poof particles
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 0.4 + Math.random() * 1.2,
      vy: 0.15 + Math.random() * 0.35,
      vx: (Math.random() - 0.5) * 0.2,
      opacity: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((s) => {
        s.y -= s.vy;
        s.x += s.vx;
        s.phase += 0.018;
        if (s.y < -4) {
          s.y = canvas.height + 4;
          s.x = Math.random() * canvas.width;
        }
        const alpha = s.opacity * (0.65 + 0.35 * Math.sin(s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,248,220,${alpha})`;
        ctx.fill();
      });

      poofRef.current = poofRef.current.filter((p) => p.life > 0);
      poofRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.91;
        p.vy *= 0.91;
        p.life -= p.decay;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * Math.sqrt(p.life), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 72%, ${p.life})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const triggerPoof = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height * 0.42;
    poofRef.current = Array.from({ length: 60 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 8;
      return {
        x: cx + (Math.random() - 0.5) * 140,
        y: cy + (Math.random() - 0.5) * 100,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 1.2 + Math.random() * 3,
        life: 1.0,
        decay: 0.022 + Math.random() * 0.03,
        hue: 28 + Math.random() * 40,
      };
    });
  };

  const handleClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    setWhiteCursor(false);
    triggerPoof();
    setClosing(true);
    setTimeout(() => onClose(), 480);
  };

  // Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {whiteCursor && <StarCursor color="#F0F0F0" zIndex={100000} />}
      {whiteCursor && <CursorTrail color="#F0F0F0" zIndex={99999} />}

      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(10, 8, 15, 0.88)",
          zIndex: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "86px 20px 60px",
          overflowY: "auto",
          cursor: "none",
          opacity: closing ? 0 : visible ? 1 : 0,
          transition: closing ? "opacity 0.45s ease" : "opacity 0.3s ease",
        }}
      >
        {/* Stars + poof canvas */}
        <canvas
          ref={canvasRef}
          style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
        />

        {/* Scrollable panel */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "580px",
            transform: closing
              ? "translateY(18px)"
              : visible
              ? "translateY(0)"
              : "translateY(18px)",
            opacity: closing ? 0 : visible ? 1 : 0,
            transition: closing
              ? "transform 0.28s ease, opacity 0.28s ease"
              : "transform 0.35s ease, opacity 0.35s ease",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
              gap: "16px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "1.3rem",
                color: "#F0ECD8",
                letterSpacing: "0.04em",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {zine.title}
            </h3>
            <button
              onClick={handleClose}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.7rem",
                fontWeight: "700",
                color: "#F0ECD8",
                background: "none",
                border: "1.5px solid rgba(240,236,216,0.5)",
                padding: "5px 12px",
                cursor: "none",
                letterSpacing: "0.06em",
                flexShrink: 0,
              }}
            >
              close ×
            </button>
          </div>

          {/* Pages */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {zine.pages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${zine.title} — page ${i + 1}`}
                loading="lazy"
                style={{ width: "100%", display: "block" }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ZINE CARD
// ─────────────────────────────────────────────────────────────────────────────

const ZineCard = ({ zine, onClick, isMobile }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "380px 1fr",
        gap: isMobile ? "20px" : "52px",
        alignItems: "start",
      }}
    >
      {/* Dark tome card */}
      <div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          cursor: "pointer",
          background: "#1A1614",
          padding: "10px 10px 20px",
          boxShadow: hovered
            ? "0 12px 40px rgba(0,0,0,0.55)"
            : "0 4px 20px rgba(0,0,0,0.35)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
        }}
      >
        <img
          src={zine.img}
          alt={zine.title}
          style={{
            width: "100%",
            aspectRatio: "1/1",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "#C8A96E",
                opacity: 0.55,
              }}
            />
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.75rem",
                color: "#C8A96E",
                opacity: 0.85,
              }}
            >
              ✦
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "#C8A96E",
                opacity: 0.55,
              }}
            />
          </div>
          <p
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "0.85rem",
              color: "#EDE8D8",
              letterSpacing: "0.06em",
              lineHeight: 1.65,
            }}
          >
            {zine.title}
          </p>
        </div>
      </div>

      {/* Description */}
      <div style={{ paddingTop: isMobile ? 0 : "8px" }}>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.75rem",
            color: C.darkGray,
            lineHeight: 1.9,
            marginBottom: "20px",
          }}
        >
          {zine.description}
        </p>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.6rem",
            color: C.midGray,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          {zine.edition}
        </p>

        {/* Ornament separator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "18px",
              height: "1px",
              background: C.black,
              opacity: 0.18,
            }}
          />
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.6rem",
              color: C.black,
              opacity: 0.25,
            }}
          >
            ⊹
          </span>
          <div
            style={{
              width: "18px",
              height: "1px",
              background: C.black,
              opacity: 0.18,
            }}
          />
        </div>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={onClick}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
              fontWeight: "700",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: C.black,
              background: "none",
              border: `1.5px solid ${C.black}`,
              padding: "7px 14px",
              cursor: "pointer",
            }}
          >
            view pages →
          </button>
          <a
            href={zine.purchaseUrl}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.62rem",
              fontWeight: "700",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: C.black,
              padding: "8px 20px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.7rem",
                opacity: 0.75,
              }}
            >
              ✦
            </span>
            purchase
          </a>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION
// ─────────────────────────────────────────────────────────────────────────────

const ZinesSection = () => {
  const isMobile = useIsMobile();
  const [openZine, setOpenZine] = useState(null);

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
          marginBottom: "48px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        self-published works &amp; print projects
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
        {ZINES_PROJECTS.map((project) => (
          <ZineCard
            key={project.id}
            zine={project}
            isMobile={isMobile}
            onClick={() => setOpenZine(project)}
          />
        ))}
      </div>

      {openZine && (
        <ZineLightbox zine={openZine} onClose={() => setOpenZine(null)} />
      )}
    </div>
  );
};

export default ZinesSection;
