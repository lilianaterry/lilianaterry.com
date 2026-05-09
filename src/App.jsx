import React, { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// RESPONSIVE HOOK
// ─────────────────────────────────────────────────────────────────────────────

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
};

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  white: "#FFFFFF",
  black: "#0D0D0D",
  darkGray: "#333333",
  midGray: "#777777",
  lightGray: "#CCCCCC",
  offWhite: "#F5F5F5",
};

// B&W card thumbnail backgrounds — vary by category
const THUMB_BG = {
  illustration: "linear-gradient(135deg, #E8E8E8 0%, #F8F8F8 100%)",
  design: "linear-gradient(135deg, #1A1A1A 0%, #555555 100%)",
  animation: "linear-gradient(135deg, #F0F0F0 0%, #BBBBBB 100%)",
  print: "linear-gradient(135deg, #D0D0D0 0%, #F5F5F5 100%)",
  digital: "linear-gradient(135deg, #0D0D0D 0%, #3A3A3A 100%)",
};

// ─────────────────────────────────────────────────────────────────────────────
// SVG COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const CrescentMoon = ({ size = 20, color = C.black }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={{ display: "inline-block", flexShrink: 0 }}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const StarThin = ({ size = 16, color = C.black }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    style={{ display: "inline-block", flexShrink: 0 }}
  >
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const FourStar = ({ size = 20, color = C.black }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={{ display: "inline-block", flexShrink: 0 }}
  >
    <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
  </svg>
);

// Hero: large crescent moon with scattered stars
const WitchyHero = () => (
  <svg
    width="96"
    height="96"
    viewBox="0 0 96 96"
    fill="none"
    style={{ flexShrink: 0 }}
  >
    <circle cx="48" cy="48" r="36" fill={C.black} />
    <circle cx="60" cy="42" r="28" fill={C.white} />
    <path
      d="M16 18 L17.4 23.6 L23 25 L17.4 26.4 L16 32 L14.6 26.4 L9 25 L14.6 23.6 Z"
      fill={C.black}
    />
    <path
      d="M80 14 L81.2 18.8 L86 20 L81.2 21.2 L80 26 L78.8 21.2 L74 20 L78.8 18.8 Z"
      fill={C.black}
    />
    <path
      d="M83 68 L83.8 71.2 L87 72 L83.8 72.8 L83 76 L82.2 72.8 L79 72 L82.2 71.2 Z"
      fill={C.black}
    />
    <path
      d="M13 66 L13.6 68.4 L16 69 L13.6 69.6 L13 72 L12.4 69.6 L10 69 L12.4 68.4 Z"
      fill={C.black}
    />
    <circle cx="30" cy="14" r="2" fill={C.black} />
    <circle cx="76" cy="80" r="1.5" fill={C.black} />
    <circle cx="18" cy="50" r="1.5" fill={C.black} />
    <circle cx="88" cy="44" r="1" fill={C.black} />
  </svg>
);

const HandDrawnLine = () => (
  <svg width="100%" height="14" viewBox="0 0 400 14" preserveAspectRatio="none">
    <path
      d="M0 7 Q30 2 60 7 Q90 12 120 7 Q150 2 180 7 Q210 12 240 7 Q270 2 300 7 Q330 12 360 7 Q390 2 400 7"
      stroke={C.lightGray}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const getThumbIcon = (type) => {
  const light = type === "design" || type === "digital";
  const col = light ? C.white : C.black;
  switch (type) {
    case "illustration":
      return <FourStar size={38} color={col} />;
    case "design":
      return <CrescentMoon size={34} color={col} />;
    case "animation":
      return <CrescentMoon size={34} color={col} />;
    case "print":
      return <StarThin size={34} color={col} />;
    case "digital":
      return <FourStar size={38} color={col} />;
    default:
      return <FourStar size={34} color={col} />;
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// STAMP BADGE
// ─────────────────────────────────────────────────────────────────────────────

const StampBadge = ({ type }) => (
  <span
    style={{
      display: "inline-block",
      padding: "2px 8px",
      border: `1.5px solid ${C.black}`,
      background: C.black,
      color: C.white,
      fontFamily: "'Space Mono', monospace",
      fontSize: "0.56rem",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    }}
  >
    {type}
  </span>
);

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────────────────────────────────────────

const ProjectCard = ({ card, isDraggable, onDragStart }) => {
  const [hovered, setHovered] = useState(false);
  const bg = THUMB_BG[card.type] || THUMB_BG.illustration;

  return (
    <div
      onMouseDown={isDraggable ? onDragStart : undefined}
      onMouseEnter={() => !isDraggable && setHovered(true)}
      onMouseLeave={() => !isDraggable && setHovered(false)}
      style={{
        position: isDraggable ? "absolute" : "relative",
        left: isDraggable ? card.x : undefined,
        top: isDraggable ? card.y : undefined,
        width: card.width || "175px",
        background: C.white,
        padding: "8px 8px 22px",
        border: `2px solid ${C.black}`,
        boxShadow: hovered ? `5px 5px 0 ${C.black}` : `3px 3px 0 ${C.black}`,
        transform: `rotate(${card.rotation || 0}deg)${
          hovered && !isDraggable ? " translateY(-2px)" : ""
        }`,
        cursor: isDraggable ? "grab" : "default",
        zIndex: card.zIndex || 1,
        userSelect: "none",
        transition: isDraggable
          ? "box-shadow 0.15s ease"
          : "transform 0.15s ease, box-shadow 0.15s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          height: card.imgHeight || "118px",
          background: bg,
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {getThumbIcon(card.type)}
      </div>
      <div
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "0.78rem",
          color: C.black,
          marginBottom: "7px",
          lineHeight: 1.3,
          letterSpacing: "0.03em",
        }}
      >
        {card.title}
      </div>
      <StampBadge type={card.type} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAC WINDOW
// ─────────────────────────────────────────────────────────────────────────────

const MacWindow = ({ title, children, initialPos = { x: 0, y: 0 } }) => {
  const [pos, setPos] = useState(initialPos);
  const [isOpen, setIsOpen] = useState(true);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      setPos({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const startDrag = (e) => {
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.preventDefault();
  };

  if (!isOpen) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          padding: "60px",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.8rem",
            color: C.midGray,
          }}
        >
          window closed.
        </span>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.72rem",
            fontWeight: "700",
            padding: "8px 18px",
            background: C.black,
            border: `2px solid ${C.black}`,
            color: C.white,
            cursor: "pointer",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Reopen
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        maxWidth: "calc(100vw - 32px)",
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        border: `2px solid ${C.black}`,
        background: C.white,
        boxShadow: `5px 5px 0 ${C.black}`,
        overflow: "hidden",
      }}
    >
      {/* Title bar */}
      <div
        onMouseDown={startDrag}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          padding: "9px 14px",
          background: C.black,
          cursor: "grab",
          userSelect: "none",
        }}
      >
        <div
          title="Close"
          onClick={() => setIsOpen(false)}
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: C.white,
            opacity: 1,
            cursor: "pointer",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: C.white,
            opacity: 0.5,
            flexShrink: 0,
          }}
        />
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: C.white,
            opacity: 0.2,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            flex: 1,
            textAlign: "center",
            fontFamily: "'Cinzel', serif",
            fontSize: "0.68rem",
            fontWeight: "600",
            color: C.white,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginRight: "38px",
          }}
        >
          {title}
        </span>
      </div>
      {/* Body */}
      <div style={{ padding: "28px 30px 32px" }}>{children}</div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// HOME SECTION
// ─────────────────────────────────────────────────────────────────────────────

const HOME_CARDS = [
  { id: 1, title: "Wild Garden", type: "illustration", imgHeight: "165px" },
  { id: 2, title: "Neon Dreams", type: "digital", imgHeight: "120px" },
  { id: 3, title: "Paper World", type: "print", imgHeight: "148px" },
  { id: 4, title: "Sun & Bones", type: "animation", imgHeight: "133px" },
  { id: 5, title: "Soft Geo", type: "design", imgHeight: "155px" },
  { id: 6, title: "Night Market", type: "illustration", imgHeight: "125px" },
];

const TAPE_CONFIGS = [
  { x: "32%", angle: -4 },
  { x: "55%", angle: 3 },
  { x: "40%", angle: -2 },
  { x: "50%", angle: 4 },
  { x: "35%", angle: -3 },
  { x: "48%", angle: 2 },
];

const HomeSection = () => {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: isMobile ? "20px 16px" : "48px" }}>
      {/* Hero */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
          marginBottom: isMobile ? "28px" : "48px",
        }}
      >
        <WitchyHero />
        <div>
          <h1
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: isMobile ? "1.5rem" : "2.2rem",
              color: C.black,
              lineHeight: 1.2,
              letterSpacing: "0.02em",
            }}
          >
            Welcome
            <br />
            to my
            <br />
            world
          </h1>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.7rem",
              color: C.midGray,
              marginTop: "12px",
              lineHeight: 1.7,
            }}
          >
            illustrator · maker ·<br />
            collector of magical things
          </p>
        </div>
      </div>

      {/* Taped masonry grid */}
      <div
        style={{ columns: isMobile ? "2 140px" : "3 190px", columnGap: "16px" }}
      >
        {HOME_CARDS.map((card, i) => {
          const tape = TAPE_CONFIGS[i % TAPE_CONFIGS.length];
          return (
            <div
              key={card.id}
              style={{
                breakInside: "avoid",
                marginBottom: "20px",
                position: "relative",
                paddingTop: "10px",
              }}
            >
              {/* Black masking tape strip */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: tape.x,
                  transform: `translateX(-50%) rotate(${tape.angle}deg)`,
                  width: "52px",
                  height: "14px",
                  background: "rgba(13,13,13,0.85)",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />
              <ProjectCard
                card={{ ...card, rotation: 0, x: 0, y: 0, width: "100%" }}
                isDraggable={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// WORK SECTION
// ─────────────────────────────────────────────────────────────────────────────

const ZINES_PROJECTS = [
  { id: 1, title: "Neon Dreams Zine", type: "print", imgHeight: "160px" },
  { id: 2, title: "Riso Greeting Cards", type: "print", imgHeight: "118px" },
  { id: 3, title: "Wild Garden Series", type: "illustration", imgHeight: "180px" },
  { id: 4, title: "Botanical Type Study", type: "illustration", imgHeight: "148px" },
  { id: 5, title: "Grid System Spec", type: "design", imgHeight: "124px" },
  { id: 6, title: "Soft Geometry Poster", type: "design", imgHeight: "166px" },
];

const NATURAL_DYES_PROJECTS = [
  { id: 1, title: "Indigo Bundle Resist", type: "illustration", imgHeight: "160px" },
  { id: 2, title: "Weld on Linen", type: "print", imgHeight: "148px" },
  { id: 3, title: "Madder Root Swatches", type: "design", imgHeight: "118px" },
  { id: 4, title: "Black Walnut Hull Study", type: "illustration", imgHeight: "180px" },
  { id: 5, title: "Onion Skin Mordant", type: "print", imgHeight: "130px" },
];

const ZinesSection = () => {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: isMobile ? "20px 16px" : "48px" }}>
      <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: isMobile ? "1.3rem" : "1.9rem", color: C.black, marginBottom: "6px", letterSpacing: "0.02em" }}>
        Zines
      </h2>
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: C.midGray, marginBottom: "28px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
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

const NaturalDyesSection = () => {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: isMobile ? "20px 16px" : "48px" }}>
      <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: isMobile ? "1.3rem" : "1.9rem", color: C.black, marginBottom: "6px", letterSpacing: "0.02em" }}>
        Natural Dyes
      </h2>
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: C.midGray, marginBottom: "28px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
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

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT SECTION
// ─────────────────────────────────────────────────────────────────────────────

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
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.62rem",
                color: C.black,
                opacity: 0.3,
              }}
            >
              [ photo here ]
            </span>
          </div>
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
            Hi! I'm a multidisciplinary illustrator and graphic designer with a
            love for texture, imperfection, and the handmade. My work lives
            somewhere between the analog and digital — printed zines, motion
            loops, and poster series that feel like they were cut out and glued
            together with a lot of love.
          </p>
          <HandDrawnLine />
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.78rem",
              lineHeight: "1.9",
              color: C.black,
              marginTop: "18px",
              marginBottom: "18px",
            }}
          >
            I'm inspired by old bookmarks, botanical prints, late-night
            convenience store lighting, and the way certain typefaces feel like
            a specific decade. I believe design should be joyful first, legible
            second.
          </p>
          <HandDrawnLine />
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.78rem",
              lineHeight: "1.9",
              color: C.black,
              marginTop: "18px",
              marginBottom: "28px",
            }}
          >
            Currently available for freelance illustration, zine collaborations,
            and cover art. Based in the studio with too many felt-tip pens.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              "Illustration",
              "Risograph",
              "Motion",
              "Editorial",
              "Lettering",
              "Collage",
              "Typography",
            ].map((skill) => (
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

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT SECTION
// ─────────────────────────────────────────────────────────────────────────────

const ContactButton = ({ href, label, primary }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        fontFamily: "'Space Mono', monospace",
        fontSize: "0.72rem",
        fontWeight: "700",
        padding: "11px 20px",
        background: hovered || primary ? C.black : C.white,
        border: `2px solid ${C.black}`,
        color: hovered || primary ? C.white : C.black,
        textDecoration: "none",
        textAlign: "center",
        boxShadow: hovered ? `4px 4px 0 ${C.darkGray}` : `3px 3px 0 ${C.black}`,
        transform: hovered ? "translate(-1px, -1px)" : "translate(0, 0)",
        transition:
          "transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease",
        cursor: "pointer",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </a>
  );
};

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
          Whether you have a project in mind, want to collaborate on a zine, or
          just want to say hi — my inbox is always open.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <ContactButton
            href="mailto:hello@example.com"
            label="✉  Email Me"
            primary
          />
          <ContactButton href="#" label="◎  Instagram" />
          <ContactButton href="#" label="◈  Behance" />
          <ContactButton href="#" label="⊹  Are.na" />
        </div>
      </MacWindow>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "home",         label: "Home",         rotation: "-1deg"   },
  { id: "zines",        label: "Zines",        rotation: "0.8deg"  },
  { id: "natural-dyes", label: "Natural Dyes", rotation: "-0.5deg" },
  { id: "about",        label: "About",        rotation: "0.4deg"  },
  { id: "contact",      label: "Contact",      rotation: "0.6deg"  },
];

const SCATTER_ITEMS = [
  { type: "moon", top: 40, left: 26, size: 14, opacity: 0.18 },
  { type: "star", top: 108, left: 145, size: 10, opacity: 0.14 },
  { type: "star", top: 180, left: 28, size: 8, opacity: 0.2 },
  { type: "moon", top: 268, left: 130, size: 12, opacity: 0.15 },
  { type: "star", top: 350, left: 24, size: 9, opacity: 0.18 },
  { type: "moon", top: 440, left: 138, size: 11, opacity: 0.14 },
  { type: "star", top: 520, left: 48, size: 8, opacity: 0.2 },
  { type: "moon", top: 608, left: 118, size: 10, opacity: 0.16 },
];

const NavButton = ({ item, isActive, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "0.68rem",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        padding: "9px 12px",
        border: `${isActive || hovered ? "2px" : "1.5px"} solid ${C.black}`,
        background: isActive ? C.black : hovered ? C.offWhite : "transparent",
        color: isActive ? C.white : C.black,
        cursor: "pointer",
        transform: hovered
          ? `rotate(calc(${item.rotation} + 1deg))`
          : `rotate(${item.rotation})`,
        transition: "transform 0.15s ease, background 0.15s ease",
        textAlign: "left",
        width: "100%",
        display: "block",
      }}
    >
      {item.label}
    </button>
  );
};

const Sidebar = ({ activeSection, setActiveSection, onHome }) => (
  <aside
    style={{
      position: "fixed",
      left: 0,
      top: 0,
      width: "200px",
      height: "100vh",
      background: C.white,
      borderRight: `2px solid ${C.black}`,
      padding: "28px 16px",
      zIndex: 100,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Logo — click to return to landing */}
    <div
      onClick={onHome}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "36px",
        cursor: "pointer",
      }}
    >
      <CrescentMoon size={20} />
      <h1
        style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: "0.95rem",
          color: C.black,
          lineHeight: 1.35,
          letterSpacing: "0.03em",
        }}
      >
        Liliana
        <br />
        Airhart
      </h1>
    </div>

    {/* Nav */}
    <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {NAV_ITEMS.map((item) => (
        <NavButton
          key={item.id}
          item={item}
          isActive={activeSection === item.id}
          onClick={() => setActiveSection(item.id)}
        />
      ))}
    </nav>

    {/* Scattered moons & stars */}
    <div style={{ position: "relative", flex: 1, marginTop: "16px" }}>
      {SCATTER_ITEMS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            opacity: s.opacity,
            pointerEvents: "none",
          }}
        >
          {s.type === "moon" ? (
            <CrescentMoon size={s.size} />
          ) : (
            <StarThin size={s.size} />
          )}
        </div>
      ))}
    </div>
  </aside>
);

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE TOP NAV
// ─────────────────────────────────────────────────────────────────────────────

const TopNav = ({ activeSection, setActiveSection, onHome }) => {
  const isMobile = useIsMobile();
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "54px",
        background: C.white,
        borderBottom: `2px solid ${C.black}`,
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        zIndex: 100,
        overflowX: "auto",
      }}
    >
      <div
        onClick={onHome}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          flexShrink: 0,
          cursor: "pointer",
          marginLeft: isMobile ? 0 : "auto",
          marginRight: isMobile ? 0 : "24px",
        }}
      >
        <CrescentMoon size={15} />
        <span
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "0.8rem",
            color: C.black,
            whiteSpace: "nowrap",
            letterSpacing: "0.03em",
          }}
        >
          Liliana Airhart
        </span>
      </div>
      <nav
        style={{
          display: "flex",
          gap: "6px",
          marginLeft: isMobile ? "auto" : 0,
        }}
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => item.id === "home" ? onHome() : setActiveSection(item.id)}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.58rem",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "5px 10px",
              border: `1.5px solid ${C.black}`,
              background: activeSection === item.id ? C.black : "transparent",
              color: activeSection === item.id ? C.white : C.black,
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN CONTENT
// ─────────────────────────────────────────────────────────────────────────────

const renderSection = (id) => {
  switch (id) {
    case "home":         return <HomeSection />;
    case "zines":        return <ZinesSection />;
    case "natural-dyes": return <NaturalDyesSection />;
    case "about":        return <AboutSection />;
    case "contact":      return <ContactSection />;
    default:             return <HomeSection />;
  }
};

const MainContent = ({ activeSection, isMobile }) => {
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
// WOOD CURSOR  (desktop only — hidden on touch screens via CSS)
// ─────────────────────────────────────────────────────────────────────────────

const WoodCursor = ({ color = "#0D0D0D" }) => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x - 17,
        top: pos.y - 17,
        pointerEvents: "none",
        zIndex: 99999,
        transformOrigin: "17px 17px",
        transform: clicking
          ? "scale(0.78) rotate(45deg)"
          : "scale(1) rotate(0deg)",
        transition: clicking
          ? "transform 0.06s ease-in"
          : "transform 0.22s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        style={{ filter: "drop-shadow(0px 1px 3px rgba(0,0,0,0.35))" }}
      >
        <path
          d="M 17 1 L 21 13 L 33 17 L 21 21 L 17 33 L 13 21 L 1 17 L 13 13 Z"
          fill={color}
        />
        <path
          d="M 13 13 L 17 1 L 21 13"
          stroke={
            color === "#0D0D0D" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.15)"
          }
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CURSOR TRAIL
// ─────────────────────────────────────────────────────────────────────────────

const SPARKLE_SHAPES = [
  (s, c) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 10 10" fill="${c}"><path d="M5 0 L6.2 3.8 L10 5 L6.2 6.2 L5 10 L3.8 6.2 L0 5 L3.8 3.8 Z"/></svg>`,
  (s, c) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.5" fill="${c}"/></svg>`,
  (s, c) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 10 10" stroke="${c}" stroke-width="1.8" stroke-linecap="round"><line x1="5" y1="1" x2="5" y2="9"/><line x1="1" y1="5" x2="9" y2="5"/></svg>`,
];

const CursorTrail = ({ color = "#0D0D0D" }) => {
  const containerRef = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const colorRef = useRef(color);

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e) => {
      const { x, y } = lastPos.current;
      const dx = e.clientX - x,
        dy = e.clientY - y;
      if (dx * dx + dy * dy < 180) return;
      lastPos.current = { x: e.clientX, y: e.clientY };

      const c = colorRef.current;
      const size = 4 + Math.random() * 7;
      const shape =
        SPARKLE_SHAPES[Math.floor(Math.random() * SPARKLE_SHAPES.length)];

      const el = document.createElement("div");
      el.style.cssText = `position:absolute;left:${e.clientX}px;top:${e.clientY}px;pointer-events:none;`;
      el.innerHTML = shape(size, c);
      container.appendChild(el);

      const driftX = (Math.random() - 0.5) * 30;
      const driftY = -10 - Math.random() * 20;
      const rot = (Math.random() - 0.5) * 80;

      const anim = el.animate(
        [
          {
            opacity: 0.85,
            transform: `translate(${-size / 2}px, ${
              -size / 2
            }px) scale(1) rotate(0deg)`,
          },
          {
            opacity: 0,
            transform: `translate(${-size / 2 + driftX}px, ${
              -size / 2 + driftY
            }px) scale(0.1) rotate(${rot}deg)`,
          },
        ],
        {
          duration: 500 + Math.random() * 300,
          easing: "ease-out",
          fill: "forwards",
        }
      );
      anim.onfinish = () => {
        if (container.contains(el)) container.removeChild(el);
      };
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 99997,
        overflow: "hidden",
      }}
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// LANDING PAGE — Gothic bookcase
// ─────────────────────────────────────────────────────────────────────────────

const CrystalBallSVG = () => (
  <svg width="68" height="88" viewBox="0 0 68 88" fill="none">
    <path
      d="M 20 64 Q 34 57 48 64 L 52 78 L 16 78 Z"
      fill="#1A1A1A"
      stroke="#3A3A3A"
      strokeWidth="1"
    />
    <rect
      x="29"
      y="60"
      width="10"
      height="8"
      fill="#1A1A1A"
      stroke="#3A3A3A"
      strokeWidth="1"
    />
    <circle
      cx="34"
      cy="33"
      r="28"
      fill="#111"
      stroke="#333"
      strokeWidth="1.5"
    />
    <circle
      cx="34"
      cy="33"
      r="22"
      fill="none"
      stroke="#1E1E1E"
      strokeWidth="0.8"
    />
    <path d="M 20 28 Q 28 20 40 28 Q 32 36 20 28 Z" fill="#1A1A1A" />
    <path d="M 22 36 Q 30 28 42 36 Q 34 44 22 36 Z" fill="#181818" />
    <path
      d="M 28 26 Q 24 33 28 40 Q 32 33 30 26 Z"
      fill="#2A2A2A"
      opacity="0.9"
    />
    <circle cx="42" cy="24" r="1.5" fill="#555" opacity="0.8" />
    <circle cx="46" cy="33" r="1" fill="#444" opacity="0.6" />
    <circle cx="40" cy="42" r="1.2" fill="#555" opacity="0.7" />
    <ellipse
      cx="26"
      cy="22"
      rx="7"
      ry="4.5"
      fill="white"
      opacity="0.06"
      transform="rotate(-20 26 22)"
    />
    <ellipse
      cx="23"
      cy="19"
      rx="3.5"
      ry="2"
      fill="white"
      opacity="0.1"
      transform="rotate(-20 23 19)"
    />
  </svg>
);

const EyeCover = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <path
      d="M 6 32 Q 32 6 58 32 Q 32 58 6 32 Z"
      stroke="#666"
      strokeWidth="1.5"
      fill="none"
    />
    <circle
      cx="32"
      cy="32"
      r="11"
      stroke="#666"
      strokeWidth="1.5"
      fill="none"
    />
    <circle cx="32" cy="32" r="5" fill="#666" />
    <line x1="32" y1="19" x2="32" y2="12" stroke="#555" strokeWidth="1" />
    <line x1="32" y1="45" x2="32" y2="52" stroke="#555" strokeWidth="1" />
    <line x1="44" y1="22" x2="49" y2="17" stroke="#555" strokeWidth="1" />
    <line x1="20" y1="22" x2="15" y2="17" stroke="#555" strokeWidth="1" />
    <line x1="44" y1="42" x2="49" y2="47" stroke="#555" strokeWidth="1" />
    <line x1="20" y1="42" x2="15" y2="47" stroke="#555" strokeWidth="1" />
  </svg>
);

const MoonCover = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <path
      d="M 40 12 Q 20 17 20 32 Q 20 47 40 52 Q 24 56 14 44 Q 5 32 10 20 Q 16 8 40 12 Z"
      fill="#5A5A5A"
    />
    <circle cx="46" cy="19" r="2.5" fill="#555" />
    <circle cx="52" cy="32" r="1.8" fill="#444" />
    <circle cx="47" cy="45" r="2" fill="#555" />
    <path
      d="M 48 11 L 49.4 15.2 L 54 16 L 49.4 16.8 L 48 21 L 46.6 16.8 L 42 16 L 46.6 15.2 Z"
      fill="#555"
    />
  </svg>
);

const FeatherCover = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <path
      d="M 32 6 Q 46 14 44 34 Q 40 50 32 58 Q 34 46 30 36 Q 24 20 32 6 Z"
      fill="#888"
      opacity="0.9"
    />
    <path
      d="M 32 6 Q 18 14 20 34 Q 24 50 32 58 Q 30 46 34 36 Q 40 20 32 6 Z"
      fill="#666"
      opacity="0.8"
    />
    <line x1="32" y1="10" x2="32" y2="56" stroke="#444" strokeWidth="1.2" />
    <line
      x1="32"
      y1="20"
      x2="23"
      y2="24"
      stroke="#555"
      strokeWidth="0.8"
      opacity="0.7"
    />
    <line
      x1="32"
      y1="26"
      x2="21"
      y2="32"
      stroke="#555"
      strokeWidth="0.8"
      opacity="0.7"
    />
    <line
      x1="32"
      y1="32"
      x2="22"
      y2="38"
      stroke="#555"
      strokeWidth="0.8"
      opacity="0.7"
    />
    <line
      x1="32"
      y1="20"
      x2="41"
      y2="23"
      stroke="#555"
      strokeWidth="0.8"
      opacity="0.7"
    />
    <line
      x1="32"
      y1="26"
      x2="43"
      y2="30"
      stroke="#555"
      strokeWidth="0.8"
      opacity="0.7"
    />
    <line
      x1="32"
      y1="32"
      x2="42"
      y2="36"
      stroke="#555"
      strokeWidth="0.8"
      opacity="0.7"
    />
  </svg>
);

const LeafCover = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <path d="M 32 6 Q 54 10 54 32 Q 54 56 32 58 Q 18 50 16 36 Q 14 20 32 6 Z" fill="#5A5A5A" opacity="0.85" />
    <path d="M 32 6 Q 10 18 12 36 Q 14 52 32 58 Q 26 44 28 30 Q 30 16 32 6 Z" fill="#444" opacity="0.75" />
    <line x1="32" y1="10" x2="32" y2="56" stroke="#333" strokeWidth="1.3" />
    <line x1="32" y1="22" x2="44" y2="30" stroke="#444" strokeWidth="0.9" opacity="0.7" />
    <line x1="32" y1="30" x2="46" y2="37" stroke="#444" strokeWidth="0.9" opacity="0.6" />
    <line x1="32" y1="38" x2="44" y2="44" stroke="#444" strokeWidth="0.9" opacity="0.5" />
    <line x1="32" y1="22" x2="20" y2="30" stroke="#444" strokeWidth="0.9" opacity="0.7" />
    <line x1="32" y1="30" x2="18" y2="37" stroke="#444" strokeWidth="0.9" opacity="0.6" />
    <line x1="32" y1="38" x2="20" y2="44" stroke="#444" strokeWidth="0.9" opacity="0.5" />
  </svg>
);

const COVER_ARTS = {
  eye: <EyeCover />,
  moon: <MoonCover />,
  feather: <FeatherCover />,
  leaf: <LeafCover />,
};

const SpineBook = ({ w, h, bg, mark }) => (
  <div
    style={{
      width: w,
      height: h,
      background: bg,
      border: "1px solid rgba(255,255,255,0.04)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      alignSelf: "flex-end",
      boxShadow: "1px 2px 5px rgba(0,0,0,0.6)",
    }}
  >
    {mark === "moon" && (
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="#333"
        style={{ opacity: 0.5 }}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    )}
    {mark === "star" && (
      <svg
        width="9"
        height="9"
        viewBox="0 0 24 24"
        fill="#333"
        style={{ opacity: 0.5 }}
      >
        <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
      </svg>
    )}
  </div>
);

const FaceBook = ({
  id,
  title,
  art,
  isHovered,
  onHover,
  onLeave,
  onNavigate,
}) => (
  <div
    onClick={() => onNavigate(id)}
    onMouseEnter={() => onHover(id)}
    onMouseLeave={onLeave}
    style={{
      width: 105,
      height: 162,
      background: "#0D0D0D",
      border: "1.5px solid #2A2A2A",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 8px 14px",
      cursor: "pointer",
      flexShrink: 0,
      alignSelf: "flex-end",
      transform: isHovered ? "translateY(-10px)" : "translateY(0)",
      transition:
        "transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease",
      boxShadow: isHovered
        ? "0 16px 40px rgba(0,0,0,0.95), 0 0 20px rgba(200,200,200,0.07)"
        : "4px 6px 16px rgba(0,0,0,0.7)",
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 5,
        border: "1px solid #1E1E1E",
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {COVER_ARTS[art]}
    </div>
    <div
      style={{
        fontFamily: "'Cinzel Decorative', serif",
        fontSize: "8px",
        color: "#888",
        letterSpacing: "0.18em",
        textAlign: "center",
      }}
    >
      {title}
    </div>
  </div>
);

const SHELF_1 = [
  { type: "spine", w: 18, h: 140, bg: "#1A1A1A" },
  { type: "spine", w: 26, h: 152, bg: "#141414", mark: "moon" },
  { type: "spine", w: 14, h: 128, bg: "#1C1C1C" },
  { type: "spine", w: 20, h: 145, bg: "#111", mark: "star" },
  { type: "face", id: "zines", title: "ZINES", art: "eye" },
  { type: "spine", w: 16, h: 130, bg: "#1A1A1A" },
  { type: "spine", w: 22, h: 144, bg: "#161616", mark: "star" },
  { type: "spine", w: 18, h: 138, bg: "#1E1E1E" },
  { type: "spine", w: 24, h: 148, bg: "#0D0D0D", mark: "moon" },
  { type: "face", id: "natural-dyes", title: "NATURAL DYES", art: "leaf" },
  { type: "spine", w: 20, h: 146, bg: "#111", mark: "star" },
  { type: "spine", w: 16, h: 132, bg: "#1C1C1C" },
  { type: "spine", w: 26, h: 150, bg: "#181818", mark: "moon" },
  { type: "spine", w: 18, h: 136, bg: "#141414" },
  { type: "spine", w: 14, h: 128, bg: "#1A1A1A", mark: "star" },
];

const SHELF_2 = [
  { type: "spine", w: 22, h: 138, bg: "#1E1E1E", mark: "moon" },
  { type: "spine", w: 16, h: 148, bg: "#141414" },
  { type: "spine", w: 28, h: 130, bg: "#111" },
  { type: "spine", w: 18, h: 145, bg: "#191919", mark: "star" },
  { type: "spine", w: 24, h: 140, bg: "#0D0D0D" },
  { type: "face", id: "about", title: "ABOUT", art: "moon" },
  { type: "spine", w: 16, h: 132, bg: "#1A1A1A" },
  { type: "spine", w: 22, h: 144, bg: "#161616", mark: "star" },
  { type: "face", id: "contact", title: "CONTACT", art: "feather" },
  { type: "spine", w: 20, h: 132, bg: "#181818", mark: "star" },
  { type: "spine", w: 14, h: 144, bg: "#1C1C1C" },
  { type: "spine", w: 26, h: 138, bg: "#141414", mark: "moon" },
  { type: "spine", w: 18, h: 150, bg: "#0F0F0F" },
  { type: "spine", w: 22, h: 136, bg: "#1A1A1A" },
  { type: "spine", w: 16, h: 142, bg: "#111", mark: "star" },
  { type: "crystal" },
  { type: "spine", w: 20, h: 130, bg: "#1E1E1E" },
  { type: "spine", w: 28, h: 146, bg: "#151515", mark: "moon" },
  { type: "spine", w: 14, h: 138, bg: "#191919" },
  { type: "spine", w: 22, h: 144, bg: "#141414", mark: "star" },
  { type: "spine", w: 18, h: 132, bg: "#0D0D0D" },
  { type: "spine", w: 24, h: 148, bg: "#1C1C1C" },
];

const FLOAT_STARS = [
  { x: "7%", y: "8%", size: 14, type: "four" },
  { x: "92%", y: "12%", size: 10, type: "thin" },
  { x: "4%", y: "55%", size: 8, type: "four" },
  { x: "95%", y: "62%", size: 12, type: "thin" },
  { x: "15%", y: "20%", size: 5, type: "dot" },
  { x: "87%", y: "38%", size: 5, type: "dot" },
  { x: "3%", y: "36%", size: 8, type: "thin" },
  { x: "91%", y: "80%", size: 10, type: "four" },
  { x: "10%", y: "82%", size: 5, type: "dot" },
  { x: "50%", y: "4%", size: 8, type: "four" },
  { x: "76%", y: "9%", size: 5, type: "dot" },
  { x: "23%", y: "5%", size: 4, type: "dot" },
];

const LandingPage = ({ onNavigate }) => {
  const [hovered, setHovered] = useState(null);
  const isMobile = useIsMobile();

  const renderShelf = (items) => (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "2px" }}>
      {items.map((item, i) => {
        if (item.type === "spine")
          return (
            <SpineBook
              key={i}
              w={item.w}
              h={item.h}
              bg={item.bg}
              mark={item.mark}
            />
          );
        if (item.type === "face")
          return (
            <FaceBook
              key={i}
              id={item.id}
              title={item.title}
              art={item.art}
              isHovered={hovered === item.id}
              onHover={setHovered}
              onLeave={() => setHovered(null)}
              onNavigate={onNavigate}
            />
          );
        if (item.type === "crystal")
          return (
            <div
              key={i}
              style={{
                alignSelf: "flex-end",
                flexShrink: 0,
                marginBottom: "-2px",
              }}
            >
              <CrystalBallSVG />
            </div>
          );
        return null;
      })}
    </div>
  );

  if (isMobile) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0D0D0D",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          gap: "40px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "32px",
              color: "#F0F0F0",
              letterSpacing: "0.1em",
              lineHeight: 1.3,
            }}
          >
            LILIANA
            <br />
            AIRHART
          </div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              color: "#555",
              letterSpacing: "0.25em",
              marginTop: "10px",
            }}
          >
            illustrator · maker
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          {[
            { id: "zines",        title: "ZINES",        art: "eye"     },
            { id: "natural-dyes", title: "NATURAL DYES", art: "leaf"    },
            { id: "about",        title: "ABOUT",        art: "moon"    },
            { id: "contact",      title: "CONTACT",      art: "feather" },
          ].map((b) => (
            <FaceBook
              key={b.id}
              id={b.id}
              title={b.title}
              art={b.art}
              isHovered={hovered === b.id}
              onHover={setHovered}
              onLeave={() => setHovered(null)}
              onNavigate={onNavigate}
            />
          ))}
        </div>
        <div
          style={{
            color: "#333",
            fontFamily: "'Space Mono', monospace",
            fontSize: "9px",
            letterSpacing: "0.2em",
          }}
        >
          tap a book to explore
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0D0D0D",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "52px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Scattered background stars */}
      {FLOAT_STARS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            opacity: 0.4,
            pointerEvents: "none",
          }}
        >
          {s.type === "four" && <FourStar size={s.size} color="#888" />}
          {s.type === "thin" && <StarThin size={s.size} color="#666" />}
          {s.type === "dot" && (
            <div
              style={{
                width: Math.max(s.size / 3, 2),
                height: Math.max(s.size / 3, 2),
                borderRadius: "50%",
                background: "#555",
              }}
            />
          )}
        </div>
      ))}

      {/* Name */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "52px",
          zIndex: 2,
          position: "relative",
        }}
      >
        <div
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "54px",
            color: "#F0F0F0",
            letterSpacing: "0.14em",
            lineHeight: 1,
          }}
        >
          LILIANA AIRHART
        </div>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            color: "#505050",
            letterSpacing: "0.28em",
            marginTop: "14px",
          }}
        >
          illustrator · maker · collector of magical things
        </div>
      </div>

      {/* Bookcase */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Crescent moon top-left */}
        <div
          style={{
            position: "absolute",
            top: "-48px",
            left: "20px",
            zIndex: 3,
            opacity: 0.65,
          }}
        >
          <CrescentMoon size={38} color="#888" />
        </div>
        {/* Floating stars near top of case */}
        <div
          style={{
            position: "absolute",
            top: "-36px",
            left: "155px",
            opacity: 0.45,
          }}
        >
          <FourStar size={12} color="#666" />
        </div>
        <div
          style={{
            position: "absolute",
            top: "-26px",
            right: "148px",
            opacity: 0.32,
          }}
        >
          <FourStar size={9} color="#555" />
        </div>
        <div
          style={{
            position: "absolute",
            top: "-20px",
            left: "320px",
            opacity: 0.28,
          }}
        >
          <StarThin size={8} color="#555" />
        </div>

        {/* Bookcase outer frame */}
        <div
          style={{
            border: "14px solid #111",
            borderBottom: "22px solid #111",
            background: "#080808",
            boxShadow:
              "0 12px 60px rgba(0,0,0,0.95), inset 0 0 50px rgba(0,0,0,0.5)",
            position: "relative",
          }}
        >
          <div style={{ display: "flex" }}>
            {/* Left upright */}
            <div
              style={{
                width: "18px",
                background: "linear-gradient(to right, #1A1A1A, #0F0F0F)",
                flexShrink: 0,
              }}
            />

            <div
              style={{
                padding: "22px 0 0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {renderShelf(SHELF_1)}
              {/* Shelf plank */}
              <div
                style={{
                  height: "13px",
                  background: "linear-gradient(to bottom, #1A1A1A, #111)",
                  margin: "0 -18px",
                  boxShadow: "0 5px 12px rgba(0,0,0,0.8)",
                }}
              />
              {/* Shelf 2 */}
              <div style={{ paddingTop: "18px" }}>{renderShelf(SHELF_2)}</div>
              {/* Bottom plank */}
              <div
                style={{
                  height: "13px",
                  background: "linear-gradient(to bottom, #1A1A1A, #111)",
                  margin: "0 -18px",
                }}
              />
            </div>

            {/* Right upright */}
            <div
              style={{
                width: "18px",
                background: "linear-gradient(to left, #1A1A1A, #0F0F0F)",
                flexShrink: 0,
              }}
            />
          </div>
        </div>
      </div>

      {/* Hint */}
      <div
        style={{
          marginTop: "30px",
          color: "#333",
          fontFamily: "'Space Mono', monospace",
          fontSize: "10px",
          letterSpacing: "0.22em",
          zIndex: 2,
          position: "relative",
        }}
      >
        ✦ click a book to explore ✦
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ROOM SHADER — dark room canvas, mouse is a flickering lantern
// ─────────────────────────────────────────────────────────────────────────────

const RoomShader = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frame;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialise dust motes
    const COUNT = 130;
    const motes = Array.from({ length: COUNT }, () => ({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      vx:    (Math.random() - 0.5) * 0.25,
      vy:    -0.07 - Math.random() * 0.32,
      r:     0.7 + Math.random() * 1.9,
      phase: Math.random() * Math.PI * 2,
      rate:  0.007 + Math.random() * 0.024,
    }));

    const mouse = { x: -2000, y: -2000 };
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      const { x: mx, y: my } = mouse;
      const t = Date.now() * 0.001;

      // Candle flicker — subtle radius variation
      const lightR = 210 + Math.sin(t * 2.1) * 8 + Math.sin(t * 5.3) * 4 + (Math.random() - 0.5) * 2;

      ctx.clearRect(0, 0, W, H);

      // ── Dark room ─────────────────────────────────────────────────────────
      ctx.fillStyle = "rgba(0,0,0,0.93)";
      ctx.fillRect(0, 0, W, H);

      // Punch a soft lantern hole using destination-out composite
      ctx.globalCompositeOperation = "destination-out";
      const hole = ctx.createRadialGradient(mx, my, 0, mx, my, lightR);
      hole.addColorStop(0,    "rgba(0,0,0,0.97)");
      hole.addColorStop(0.40, "rgba(0,0,0,0.82)");
      hole.addColorStop(0.70, "rgba(0,0,0,0.32)");
      hole.addColorStop(1,    "rgba(0,0,0,0)");
      ctx.fillStyle = hole;
      ctx.beginPath();
      ctx.arc(mx, my, lightR, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      // Warm amber wash over the revealed area
      const amber = ctx.createRadialGradient(mx, my, 0, mx, my, lightR);
      amber.addColorStop(0,   "rgba(255,200,100,0.11)");
      amber.addColorStop(0.5, "rgba(255,155,50,0.05)");
      amber.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = amber;
      ctx.beginPath();
      ctx.arc(mx, my, lightR, 0, Math.PI * 2);
      ctx.fill();

      // ── Dust motes ────────────────────────────────────────────────────────
      motes.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.rate;
        // Wrap around viewport
        if (p.y < -10)    { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10)    p.x = W + 10;
        if (p.x > W + 10) p.x = -10;

        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const twinkle = 0.5 + 0.5 * Math.sin(p.phase * 2.8);

        if (dist < lightR) {
          const prox  = 1 - dist / lightR;
          const alpha = 0.12 + prox * 0.78 * twinkle;
          const size  = p.r * (1 + prox * 2.0);

          // Core bright mote
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,245,215,${alpha})`;
          ctx.fill();

          // Soft halo for motes deep in the light
          if (prox > 0.25 && twinkle > 0.55) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, size * 4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,215,130,${alpha * 0.18})`;
            ctx.fill();
          }
        } else {
          // Nearly invisible in darkness
          const alpha = 0.012 + 0.018 * twinkle;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.55, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(190,185,215,${alpha})`;
          ctx.fill();
        }
      });

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9000 }}
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────────────────

const App = () => {
  const [activeSection, setActiveSection] = useState(null); // null = landing page
  const isMobile = useIsMobile();

  const goHome = () => setActiveSection(null);

  if (activeSection === null) {
    return (
      <>
        {!isMobile && <RoomShader />}
        {!isMobile && <WoodCursor color="#F0F0F0" />}
        {!isMobile && <CursorTrail color="#F0F0F0" />}
        <LandingPage onNavigate={setActiveSection} />
      </>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      {!isMobile && <RoomShader />}
      {!isMobile && <WoodCursor />}
      {!isMobile && <CursorTrail />}
      <TopNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onHome={goHome}
      />
      <MainContent activeSection={activeSection} isMobile={isMobile} />
    </div>
  );
};

export default App;
