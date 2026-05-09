import React, { useState, useRef, useEffect } from "react";
import { C, THUMB_BG, NAV_ITEMS } from "./constants.js";
import { useIsMobile } from "./hooks.js";

export { useIsMobile };

// ─────────────────────────────────────────────────────────────────────────────
// SVG ICONS
// ─────────────────────────────────────────────────────────────────────────────

export const CrescentMoon = ({ size = 20, color = C.black }) => (
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

export const StarThin = ({ size = 16, color = C.black }) => (
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

export const FourStar = ({ size = 20, color = C.black }) => (
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

export const WitchyHero = () => (
  <svg
    width="96"
    height="96"
    viewBox="0 0 96 96"
    fill="none"
    style={{ flexShrink: 0 }}
  >
    <circle cx="48" cy="48" r="36" fill={C.black} />
    <circle cx="60" cy="42" r="28" fill={C.white} />
    <path d="M16 18 L17.4 23.6 L23 25 L17.4 26.4 L16 32 L14.6 26.4 L9 25 L14.6 23.6 Z" fill={C.black} />
    <path d="M80 14 L81.2 18.8 L86 20 L81.2 21.2 L80 26 L78.8 21.2 L74 20 L78.8 18.8 Z" fill={C.black} />
    <path d="M83 68 L83.8 71.2 L87 72 L83.8 72.8 L83 76 L82.2 72.8 L79 72 L82.2 71.2 Z" fill={C.black} />
    <path d="M13 66 L13.6 68.4 L16 69 L13.6 69.6 L13 72 L12.4 69.6 L10 69 L12.4 68.4 Z" fill={C.black} />
    <circle cx="30" cy="14" r="2" fill={C.black} />
    <circle cx="76" cy="80" r="1.5" fill={C.black} />
    <circle cx="18" cy="50" r="1.5" fill={C.black} />
    <circle cx="88" cy="44" r="1" fill={C.black} />
  </svg>
);

export const HandDrawnLine = () => (
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
// PROJECT CARD
// ─────────────────────────────────────────────────────────────────────────────

export const getThumbIcon = (type) => {
  const light = type === "design" || type === "digital";
  const col = light ? C.white : C.black;
  switch (type) {
    case "illustration": return <FourStar size={38} color={col} />;
    case "design":       return <CrescentMoon size={34} color={col} />;
    case "animation":    return <CrescentMoon size={34} color={col} />;
    case "print":        return <StarThin size={34} color={col} />;
    case "digital":      return <FourStar size={38} color={col} />;
    default:             return <FourStar size={34} color={col} />;
  }
};

export const StampBadge = ({ type }) => (
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

export const ProjectCard = ({ card, isDraggable, onDragStart }) => {
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
        transform: `rotate(${card.rotation || 0}deg)${hovered && !isDraggable ? " translateY(-2px)" : ""}`,
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

export const MacWindow = ({ title, children, initialPos = { x: 0, y: 0 } }) => {
  const [pos, setPos] = useState(initialPos);
  const [isOpen, setIsOpen] = useState(true);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
    };
    const onUp = () => { dragging.current = false; };
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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", padding: "60px" }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: C.midGray }}>
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
        <div title="Close" onClick={() => setIsOpen(false)} style={{ width: "12px", height: "12px", borderRadius: "50%", background: C.white, opacity: 1, cursor: "pointer", flexShrink: 0 }} />
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: C.white, opacity: 0.5, flexShrink: 0 }} />
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: C.white, opacity: 0.2, flexShrink: 0 }} />
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
      <div style={{ padding: "28px 30px 32px" }}>{children}</div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT BUTTON
// ─────────────────────────────────────────────────────────────────────────────

export const ContactButton = ({ href, label, primary }) => {
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
        transition: "transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease",
        cursor: "pointer",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </a>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────────────────────

const SCATTER_ITEMS = [
  { type: "moon", top: 40,  left: 26,  size: 14, opacity: 0.18 },
  { type: "star", top: 108, left: 145, size: 10, opacity: 0.14 },
  { type: "star", top: 180, left: 28,  size: 8,  opacity: 0.2  },
  { type: "moon", top: 268, left: 130, size: 12, opacity: 0.15 },
  { type: "star", top: 350, left: 24,  size: 9,  opacity: 0.18 },
  { type: "moon", top: 440, left: 138, size: 11, opacity: 0.14 },
  { type: "star", top: 520, left: 48,  size: 8,  opacity: 0.2  },
  { type: "moon", top: 608, left: 118, size: 10, opacity: 0.16 },
];

export const NavButton = ({ item, isActive, onClick }) => {
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

export const Sidebar = ({ activeSection, setActiveSection, onHome }) => (
  <aside
    style={{
      position: "fixed",
      left: 0, top: 0,
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
    <div
      onClick={onHome}
      style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "36px", cursor: "pointer" }}
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
        Liliana<br />Airhart
      </h1>
    </div>
    <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {NAV_ITEMS.map((item) => (
        <NavButton key={item.id} item={item} isActive={activeSection === item.id} onClick={() => setActiveSection(item.id)} />
      ))}
    </nav>
    <div style={{ position: "relative", flex: 1, marginTop: "16px" }}>
      {SCATTER_ITEMS.map((s, i) => (
        <div key={i} style={{ position: "absolute", top: s.top, left: s.left, opacity: s.opacity, pointerEvents: "none" }}>
          {s.type === "moon" ? <CrescentMoon size={s.size} /> : <StarThin size={s.size} />}
        </div>
      ))}
    </div>
  </aside>
);

export const TopNav = ({ activeSection, setActiveSection, onHome }) => {
  const isMobile = useIsMobile();
  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
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
      <nav style={{ display: "flex", gap: "6px", marginLeft: isMobile ? "auto" : 0 }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
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
// CURSOR
// ─────────────────────────────────────────────────────────────────────────────

export const StarCursor = ({ color = "#0D0D0D" }) => {
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
        transform: clicking ? "scale(0.78) rotate(45deg)" : "scale(1) rotate(0deg)",
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
        <path d="M 17 1 L 21 13 L 33 17 L 21 21 L 17 33 L 13 21 L 1 17 L 13 13 Z" fill={color} />
        <path
          d="M 13 13 L 17 1 L 21 13"
          stroke={color === "#0D0D0D" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.15)"}
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

const SPARKLE_SHAPES = [
  (s, c) => `<svg width="${s}" height="${s}" viewBox="0 0 10 10" fill="${c}"><path d="M5 0 L6.2 3.8 L10 5 L6.2 6.2 L5 10 L3.8 6.2 L0 5 L3.8 3.8 Z"/></svg>`,
  (s, c) => `<svg width="${s}" height="${s}" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.5" fill="${c}"/></svg>`,
  (s, c) => `<svg width="${s}" height="${s}" viewBox="0 0 10 10" stroke="${c}" stroke-width="1.8" stroke-linecap="round"><line x1="5" y1="1" x2="5" y2="9"/><line x1="1" y1="5" x2="9" y2="5"/></svg>`,
];

export const CursorTrail = ({ color = "#0D0D0D" }) => {
  const containerRef = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const colorRef = useRef(color);

  useEffect(() => { colorRef.current = color; }, [color]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e) => {
      const { x, y } = lastPos.current;
      const dx = e.clientX - x, dy = e.clientY - y;
      if (dx * dx + dy * dy < 180) return;
      lastPos.current = { x: e.clientX, y: e.clientY };

      const c = colorRef.current;
      const size = 4 + Math.random() * 7;
      const shape = SPARKLE_SHAPES[Math.floor(Math.random() * SPARKLE_SHAPES.length)];

      const el = document.createElement("div");
      el.style.cssText = `position:absolute;left:${e.clientX}px;top:${e.clientY}px;pointer-events:none;`;
      el.innerHTML = shape(size, c);
      container.appendChild(el);

      const driftX = (Math.random() - 0.5) * 30;
      const driftY = -10 - Math.random() * 20;
      const rot = (Math.random() - 0.5) * 80;

      const anim = el.animate(
        [
          { opacity: 0.85, transform: `translate(${-size / 2}px, ${-size / 2}px) scale(1) rotate(0deg)` },
          { opacity: 0,    transform: `translate(${-size / 2 + driftX}px, ${-size / 2 + driftY}px) scale(0.1) rotate(${rot}deg)` },
        ],
        { duration: 500 + Math.random() * 300, easing: "ease-out", fill: "forwards" }
      );
      anim.onfinish = () => { if (container.contains(el)) container.removeChild(el); };
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99997, overflow: "hidden" }}
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ROOM SHADER
// ─────────────────────────────────────────────────────────────────────────────

export const RoomShader = ({ intensity = 1, transitionRef = null }) => {
  const canvasRef = useRef(null);
  const intensityRef = useRef(intensity);
  useEffect(() => { intensityRef.current = intensity; }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frame;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 130;
    const motes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -0.07 - Math.random() * 0.32,
      r: 0.7 + Math.random() * 1.9,
      phase: Math.random() * Math.PI * 2,
      rate: 0.007 + Math.random() * 0.024,
    }));

    const mouse = { x: -2000, y: -2000 };
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      let mx = mouse.x, my = mouse.y;
      const t = Date.now() * 0.001;
      const iv = intensityRef.current;
      const tr = transitionRef ? transitionRef.current : null;

      const overlayAlpha = 0.05 + 0.75 * iv;
      const baseR = 280 + Math.sin(t * 2.1) * 10 + Math.sin(t * 5.3) * 5 + (Math.random() - 0.5) * 2;
      let lightR = baseR * (1 + (1 - iv) * 1.5);
      const amberStrength = iv;

      let drawAlpha = overlayAlpha;
      let drawAmber = amberStrength;
      let whiteOpacity = 0;

      if (tr && !tr._done) {
        const EXPAND_DUR = 680;
        const WHITE_DUR  = 380;
        const elapsed = performance.now() - tr.startTime;

        if (elapsed < EXPAND_DUR) {
          const p    = elapsed / EXPAND_DUR;
          const ease = 1 - Math.pow(1 - p, 2.5);
          const fullR = Math.sqrt(Math.max(tr.cx, W - tr.cx) ** 2 + Math.max(tr.cy, H - tr.cy) ** 2) + 80;
          mx        = tr.cx;
          my        = tr.cy;
          lightR    = lightR + (fullR - lightR) * ease;
          drawAlpha = overlayAlpha * (1 - ease);
          drawAmber = amberStrength * (1 - ease * 0.6);
        } else {
          const p = Math.min((elapsed - EXPAND_DUR) / WHITE_DUR, 1);
          whiteOpacity = p;
          drawAlpha    = 0;
          drawAmber    = 0;
          mx = tr.cx;
          my = tr.cy;
          if (p >= 1 && !tr._done) {
            tr._done = true;
            tr.onComplete?.();
          }
        }
      }

      ctx.clearRect(0, 0, W, H);

      if (whiteOpacity < 1) {
        if (drawAlpha > 0.002) {
          ctx.fillStyle = `rgba(0,0,0,${drawAlpha})`;
          ctx.fillRect(0, 0, W, H);
        }

        ctx.globalCompositeOperation = "destination-out";
        const hole = ctx.createRadialGradient(mx, my, 0, mx, my, lightR);
        hole.addColorStop(0,    "rgba(0,0,0,0.97)");
        hole.addColorStop(0.4,  "rgba(0,0,0,0.82)");
        hole.addColorStop(0.7,  "rgba(0,0,0,0.32)");
        hole.addColorStop(1,    "rgba(0,0,0,0)");
        ctx.fillStyle = hole;
        ctx.beginPath();
        ctx.arc(mx, my, lightR, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";

        if (drawAmber > 0.001) {
          const amber = ctx.createRadialGradient(mx, my, 0, mx, my, lightR);
          amber.addColorStop(0,   `rgba(255,200,100,${0.11 * drawAmber})`);
          amber.addColorStop(0.5, `rgba(255,155,50,${0.05 * drawAmber})`);
          amber.addColorStop(1,   "rgba(0,0,0,0)");
          ctx.fillStyle = amber;
          ctx.beginPath();
          ctx.arc(mx, my, lightR, 0, Math.PI * 2);
          ctx.fill();
        }

        motes.forEach((p) => {
          p.x += p.vx; p.y += p.vy; p.phase += p.rate;
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
            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,245,215,${alpha})`;
            ctx.fill();
            if (prox > 0.25 && twinkle > 0.55) {
              ctx.beginPath();
              ctx.arc(p.x, p.y, size * 4, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255,215,130,${alpha * 0.18})`;
              ctx.fill();
            }
          } else {
            const alpha = 0.012 + 0.018 * twinkle;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 0.55, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(190,185,215,${alpha})`;
            ctx.fill();
          }
        });
      }

      if (whiteOpacity > 0) {
        ctx.fillStyle = `rgba(255,255,255,${whiteOpacity})`;
        ctx.fillRect(0, 0, W, H);
      }

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9000 }} />;
};

// ─────────────────────────────────────────────────────────────────────────────
// LIGHT SHADER
// ─────────────────────────────────────────────────────────────────────────────

export const LightShader = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frame;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 180;
    const motes = Array.from({ length: COUNT }, () => ({
      x:           Math.random() * window.innerWidth,
      y:           Math.random() * window.innerHeight,
      vx:          (Math.random() - 0.5) * 0.18,
      vy:          -0.05 - Math.random() * 0.22,
      baseVy:      -0.05 - Math.random() * 0.22,
      r:           1.0 + Math.random() * 2.2,
      phase:       Math.random() * Math.PI * 2,
      rate:        0.005 + Math.random() * 0.016,
      baseOpacity: 0.1 + Math.random() * 0.14,
    }));

    const mouse = { x: -2000, y: -2000 };
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const REPEL_R = 140;

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      const { x: mx, y: my } = mouse;

      ctx.clearRect(0, 0, W, H);

      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.28, W / 2, H / 2, H * 0.82);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.055)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      motes.forEach((p) => {
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_R && dist > 0) {
          const force = (1 - dist / REPEL_R) * 0.9;
          p.vx += (dx / dist) * force * 0.14;
          p.vy += (dy / dist) * force * 0.14;
        }

        p.vx *= 0.96;
        p.vy = p.vy * 0.96 + p.baseVy * 0.04;
        p.x += p.vx; p.y += p.vy; p.phase += p.rate;

        if (p.y < -10)    { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10)    p.x = W + 10;
        if (p.x > W + 10) p.x = -10;

        const twinkle = 0.55 + 0.45 * Math.sin(p.phase * 2.2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20,10,35,${p.baseOpacity * twinkle})`;
        ctx.fill();
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

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9000 }} />;
};
