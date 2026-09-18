import React, { useState } from "react";
import { C } from "../constants.js";
import { useIsMobile, CrescentMoon, FourStar, StarThin } from "../components.jsx";

// ── Landing-page-specific SVGs ───────────────────────────────────────────────

const CrystalBallSVG = () => (
  <svg width="68" height="88" viewBox="0 0 68 88" fill="none">
    <path d="M 20 64 Q 34 57 48 64 L 52 78 L 16 78 Z" fill="#1A1A1A" stroke="#3A3A3A" strokeWidth="1" />
    <rect x="29" y="60" width="10" height="8" fill="#1A1A1A" stroke="#3A3A3A" strokeWidth="1" />
    <circle cx="34" cy="33" r="28" fill="#111" stroke="#333" strokeWidth="1.5" />
    <circle cx="34" cy="33" r="22" fill="none" stroke="#1E1E1E" strokeWidth="0.8" />
    <path d="M 20 28 Q 28 20 40 28 Q 32 36 20 28 Z" fill="#1A1A1A" />
    <path d="M 22 36 Q 30 28 42 36 Q 34 44 22 36 Z" fill="#181818" />
    <path d="M 28 26 Q 24 33 28 40 Q 32 33 30 26 Z" fill="#2A2A2A" opacity="0.9" />
    <circle cx="42" cy="24" r="1.5" fill="#555" opacity="0.8" />
    <circle cx="46" cy="33" r="1"   fill="#444" opacity="0.6" />
    <circle cx="40" cy="42" r="1.2" fill="#555" opacity="0.7" />
    <ellipse cx="26" cy="22" rx="7"   ry="4.5" fill="white" opacity="0.06" transform="rotate(-20 26 22)" />
    <ellipse cx="23" cy="19" rx="3.5" ry="2"   fill="white" opacity="0.1"  transform="rotate(-20 23 19)" />
  </svg>
);

const EyeCover = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <path d="M 6 32 Q 32 6 58 32 Q 32 58 6 32 Z" stroke="#666" strokeWidth="1.5" fill="none" />
    <circle cx="32" cy="32" r="11" stroke="#666" strokeWidth="1.5" fill="none" />
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
    <path d="M 40 12 Q 20 17 20 32 Q 20 47 40 52 Q 24 56 14 44 Q 5 32 10 20 Q 16 8 40 12 Z" fill="#5A5A5A" />
    <circle cx="46" cy="19" r="2.5" fill="#555" />
    <circle cx="52" cy="32" r="1.8" fill="#444" />
    <circle cx="47" cy="45" r="2"   fill="#555" />
    <path d="M 48 11 L 49.4 15.2 L 54 16 L 49.4 16.8 L 48 21 L 46.6 16.8 L 42 16 L 46.6 15.2 Z" fill="#555" />
  </svg>
);

const FeatherCover = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <path d="M 32 6 Q 46 14 44 34 Q 40 50 32 58 Q 34 46 30 36 Q 24 20 32 6 Z" fill="#888" opacity="0.9" />
    <path d="M 32 6 Q 18 14 20 34 Q 24 50 32 58 Q 30 46 34 36 Q 40 20 32 6 Z" fill="#666" opacity="0.8" />
    <line x1="32" y1="10" x2="32" y2="56" stroke="#444" strokeWidth="1.2" />
    <line x1="32" y1="20" x2="23" y2="24" stroke="#555" strokeWidth="0.8" opacity="0.7" />
    <line x1="32" y1="26" x2="21" y2="32" stroke="#555" strokeWidth="0.8" opacity="0.7" />
    <line x1="32" y1="32" x2="22" y2="38" stroke="#555" strokeWidth="0.8" opacity="0.7" />
    <line x1="32" y1="20" x2="41" y2="23" stroke="#555" strokeWidth="0.8" opacity="0.7" />
    <line x1="32" y1="26" x2="43" y2="30" stroke="#555" strokeWidth="0.8" opacity="0.7" />
    <line x1="32" y1="32" x2="42" y2="36" stroke="#555" strokeWidth="0.8" opacity="0.7" />
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
  eye:     <EyeCover />,
  moon:    <MoonCover />,
  feather: <FeatherCover />,
  leaf:    <LeafCover />,
};

// ── Bookshelf components ─────────────────────────────────────────────────────

const SpineBook = ({ w, h, bg, mark }) => (
  <div
    style={{
      flex: `${w} 1 0`,
      minWidth: Math.round(w * 0.4),
      height: h,
      background: bg,
      border: "1px solid rgba(255,255,255,0.04)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-end",
      boxShadow: "1px 2px 5px rgba(0,0,0,0.6)",
    }}
  >
    {mark === "moon" && (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="#333" style={{ opacity: 0.5 }}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    )}
    {mark === "star" && (
      <svg width="9" height="9" viewBox="0 0 24 24" fill="#333" style={{ opacity: 0.5 }}>
        <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
      </svg>
    )}
  </div>
);

const FaceBook = ({ id, title, art, isHovered, onHover, onLeave, onNavigate }) => (
  <div
    onClick={(e) => onNavigate(id, e)}
    onMouseEnter={() => onHover(id)}
    onMouseLeave={onLeave}
    style={{
      width: 105,
      height: 162,
      background: "#0D0D0D",
      border: `1.5px solid ${isHovered ? "rgba(200,165,90,0.4)" : "#2A2A2A"}`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 8px 14px",
      cursor: "pointer",
      flexShrink: 0,
      alignSelf: "flex-end",
      transform: isHovered ? "translateY(-10px)" : "translateY(0)",
      transition: "transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease, border-color 0.22s ease",
      boxShadow: isHovered
        ? "0 16px 40px rgba(0,0,0,0.9), 0 0 16px rgba(255,210,130,0.35), 0 0 50px rgba(220,175,80,0.18)"
        : "4px 6px 16px rgba(0,0,0,0.7)",
      position: "relative",
    }}
  >
    <div style={{ position: "absolute", inset: 5, border: "1px solid #1E1E1E", pointerEvents: "none" }} />
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {COVER_ARTS[art]}
    </div>
    <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "8px", color: "#888", letterSpacing: "0.18em", textAlign: "center" }}>
      {title}
    </div>
  </div>
);

// Mobile-only card: same look as FaceBook, but sized to fill a 2-column grid
// instead of the fixed dimensions the desktop shelf needs for alignment.
const MobileFaceBook = ({ id, title, art, isHovered, onHover, onLeave, onNavigate }) => (
  <div
    onClick={(e) => onNavigate(id, e)}
    onMouseEnter={() => onHover(id)}
    onMouseLeave={onLeave}
    style={{
      width: "100%",
      aspectRatio: "1 / 1.2",
      background: "#0D0D0D",
      border: `1.5px solid ${isHovered ? "rgba(200,165,90,0.4)" : "#2A2A2A"}`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      padding: "14px 8px 14px",
      cursor: "pointer",
      transform: isHovered ? "translateY(-6px)" : "translateY(0)",
      transition: "transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease, border-color 0.22s ease",
      boxShadow: isHovered
        ? "0 16px 40px rgba(0,0,0,0.9), 0 0 16px rgba(255,210,130,0.35), 0 0 50px rgba(220,175,80,0.18)"
        : "4px 6px 16px rgba(0,0,0,0.7)",
      position: "relative",
    }}
  >
    <div style={{ position: "absolute", inset: 5, border: "1px solid #1E1E1E", pointerEvents: "none" }} />
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {COVER_ARTS[art]}
    </div>
    <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "14px", color: "#888", letterSpacing: "0.14em", textAlign: "center" }}>
      {title}
    </div>
  </div>
);

// ── Shelf data ───────────────────────────────────────────────────────────────

const SHELF_1 = [
  { type: "spine", w: 18, h: 140, bg: "#1A1A1A" },
  { type: "spine", w: 26, h: 152, bg: "#141414", mark: "moon" },
  { type: "spine", w: 14, h: 128, bg: "#1C1C1C" },
  { type: "spine", w: 20, h: 145, bg: "#111",    mark: "star" },
  { type: "face",  id: "zines", title: "ZINES", art: "eye" },
  { type: "spine", w: 16, h: 130, bg: "#1A1A1A" },
  { type: "spine", w: 22, h: 144, bg: "#161616", mark: "star" },
  { type: "spine", w: 18, h: 138, bg: "#1E1E1E" },
  { type: "spine", w: 24, h: 148, bg: "#0D0D0D", mark: "moon" },
  { type: "face",  id: "natural-dyes", title: "NATURAL DYES", art: "leaf" },
  { type: "spine", w: 20, h: 146, bg: "#111",    mark: "star" },
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
  { type: "face",  id: "about", title: "ABOUT", art: "moon" },
  { type: "spine", w: 16, h: 132, bg: "#1A1A1A" },
  { type: "spine", w: 22, h: 144, bg: "#161616", mark: "star" },
  { type: "face",  id: "contact", title: "CONTACT", art: "feather" },
  { type: "spine", w: 20, h: 132, bg: "#181818", mark: "star" },
  { type: "spine", w: 14, h: 144, bg: "#1C1C1C" },
  { type: "spine", w: 26, h: 138, bg: "#141414", mark: "moon" },
  { type: "spine", w: 18, h: 150, bg: "#0F0F0F" },
  { type: "spine", w: 22, h: 136, bg: "#1A1A1A" },
  { type: "spine", w: 16, h: 142, bg: "#111",    mark: "star" },
  { type: "crystal" },
  { type: "spine", w: 20, h: 130, bg: "#1E1E1E" },
  { type: "spine", w: 28, h: 146, bg: "#151515", mark: "moon" },
  { type: "spine", w: 14, h: 138, bg: "#191919" },
  { type: "spine", w: 22, h: 144, bg: "#141414", mark: "star" },
  { type: "spine", w: 18, h: 132, bg: "#0D0D0D" },
  { type: "spine", w: 24, h: 148, bg: "#1C1C1C" },
];

const FLOAT_STARS = [
  { x: "7%",  y: "8%",  size: 14, type: "four" },
  { x: "92%", y: "12%", size: 10, type: "thin" },
  { x: "4%",  y: "55%", size: 8,  type: "four" },
  { x: "95%", y: "62%", size: 12, type: "thin" },
  { x: "15%", y: "20%", size: 5,  type: "dot"  },
  { x: "87%", y: "38%", size: 5,  type: "dot"  },
  { x: "3%",  y: "36%", size: 8,  type: "thin" },
  { x: "91%", y: "80%", size: 10, type: "four" },
  { x: "10%", y: "82%", size: 5,  type: "dot"  },
  { x: "50%", y: "4%",  size: 8,  type: "four" },
  { x: "76%", y: "9%",  size: 5,  type: "dot"  },
  { x: "23%", y: "5%",  size: 4,  type: "dot"  },
];

// ── LandingPage ──────────────────────────────────────────────────────────────

const LandingPage = ({ onNavigate }) => {
  const [hovered, setHovered] = useState(null);
  const isMobile = useIsMobile();

  const handleBookClick = (id, e) => onNavigate(id, e);

  const renderShelf = (items) => (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", width: "100%" }}>
      {items.map((item, i) => {
        if (item.type === "spine")
          return <SpineBook key={i} w={item.w} h={item.h} bg={item.bg} mark={item.mark} />;
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
              onNavigate={handleBookClick}
            />
          );
        if (item.type === "crystal")
          return (
            <div key={i} style={{ alignSelf: "flex-end", flexShrink: 0, marginBottom: "-2px" }}>
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
          <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "32px", color: "#F0F0F0", letterSpacing: "0.1em", lineHeight: 1.3 }}>
            LILIANA<br />AIRHART
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#555", letterSpacing: "0.25em", marginTop: "10px" }}>
            illustrator · maker
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          {[
            { id: "zines",        title: "ZINES",        art: "eye"     },
            { id: "natural-dyes", title: "NATURAL DYES", art: "leaf"    },
            { id: "about",        title: "ABOUT",        art: "moon"    },
            { id: "contact",      title: "CONTACT",      art: "feather" },
          ].map((b) => (
            <MobileFaceBook
              key={b.id}
              id={b.id}
              title={b.title}
              art={b.art}
              isHovered={hovered === b.id}
              onHover={setHovered}
              onLeave={() => setHovered(null)}
              onNavigate={handleBookClick}
            />
          ))}
        </div>
        <div style={{ color: "#333", fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.2em" }}>
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
      {FLOAT_STARS.map((s, i) => (
        <div key={i} style={{ position: "absolute", left: s.x, top: s.y, opacity: 0.4, pointerEvents: "none" }}>
          {s.type === "four" && <FourStar size={s.size} color="#888" />}
          {s.type === "thin" && <StarThin size={s.size} color="#666" />}
          {s.type === "dot"  && <div style={{ width: Math.max(s.size / 3, 2), height: Math.max(s.size / 3, 2), borderRadius: "50%", background: "#555" }} />}
        </div>
      ))}

      <div style={{ textAlign: "center", marginBottom: "52px", zIndex: 2, position: "relative" }}>
        <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "54px", color: "#F0F0F0", letterSpacing: "0.14em", lineHeight: 1 }}>
          LILIANA AIRHART
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#505050", letterSpacing: "0.28em", marginTop: "14px" }}>
          illustrator · maker · collector of magical things
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ position: "absolute", top: "-48px", left: "20px", zIndex: 3, opacity: 0.65 }}>
          <CrescentMoon size={38} color="#888" />
        </div>
        <div style={{ position: "absolute", top: "-36px", left: "155px", opacity: 0.45 }}>
          <FourStar size={12} color="#666" />
        </div>
        <div style={{ position: "absolute", top: "-26px", right: "148px", opacity: 0.32 }}>
          <FourStar size={9} color="#555" />
        </div>
        <div style={{ position: "absolute", top: "-20px", left: "320px", opacity: 0.28 }}>
          <StarThin size={8} color="#555" />
        </div>

        <div
          style={{
            border: "14px solid #111",
            borderBottom: "22px solid #111",
            background: "#080808",
            boxShadow: "0 12px 60px rgba(0,0,0,0.95), inset 0 0 50px rgba(0,0,0,0.5)",
            position: "relative",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ width: "18px", background: "linear-gradient(to right, #1A1A1A, #0F0F0F)", flexShrink: 0 }} />
            <div style={{ padding: "22px 0 0", display: "flex", flexDirection: "column", width: "660px" }}>
              {renderShelf(SHELF_1)}
              <div style={{ height: "13px", background: "linear-gradient(to bottom, #1A1A1A, #111)", margin: "0 -18px", boxShadow: "0 5px 12px rgba(0,0,0,0.8)" }} />
              <div style={{ paddingTop: "18px" }}>{renderShelf(SHELF_2)}</div>
              <div style={{ height: "13px", background: "linear-gradient(to bottom, #1A1A1A, #111)", margin: "0 -18px" }} />
            </div>
            <div style={{ width: "18px", background: "linear-gradient(to left, #1A1A1A, #0F0F0F)", flexShrink: 0 }} />
          </div>
        </div>
      </div>

      <div style={{ marginTop: "30px", color: "#333", fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.22em", zIndex: 2, position: "relative" }}>
        ✦ click a book to explore ✦
      </div>
    </div>
  );
};

export default LandingPage;
