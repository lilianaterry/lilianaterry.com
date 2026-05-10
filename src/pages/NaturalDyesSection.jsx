import React, { useState, useEffect } from "react";
import { C } from "../constants.js";
import { useIsMobile } from "../components.jsx";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const ALL_PARTS = ["berries", "flowers", "leaves", "roots", "stems", "pits"];
const ALL_FABRICS = ["cotton", "linen", "wool"];

// Each batch image: { src, fiber, part } — fiber and part appear on hover.
// Each plant: invasive (bool) drives the PNW Invasive badge; plantImg is the
// portrait photo shown in the left column of the detail page.

const PLANTS = [
  {
    id: "avocado",
    commonName: "Avocado",
    latinName: "Persea americana",
    invasive: false,
    plantImg: "/images/natural-dyes/avocado/avocado_after.jpg",
    parts: ["pits"],
    fabrics: ["cotton", "linen", "wool"],
    swatches: [
      "/images/natural-dyes/avocado/avocado_comparison.jpg",
      "/images/natural-dyes/avocado/avocado_comparison.jpg",
      "/images/natural-dyes/avocado/avocado_comparison.jpg",
    ],
    batches: [
      {
        id: "b1",
        label: "01",
        images: [
          {
            src: "/images/natural-dyes/avocado/avocado_comparison.jpg",
            fiber: "Linen",
            part: "Leaves",
          },
          {
            src: "/images/natural-dyes/avocado/avocado_comparison.jpg",
            fiber: "Linen",
            part: "Roots",
          },
          {
            src: "/images/natural-dyes/avocado/avocado_comparison.jpg",
            fiber: "Linen",
            part: "Flowers",
          },
          {
            src: "/images/natural-dyes/avocado/avocado_comparison.jpg",
            fiber: "Wool",
            part: "Leaves",
          },
          {
            src: "/images/natural-dyes/avocado/avocado_comparison.jpg",
            fiber: "Wool",
            part: "Roots",
          },
          {
            src: "/images/natural-dyes/avocado/avocado_comparison.jpg",
            fiber: "Wool",
            part: "Flowers",
          },
          {
            src: "/images/natural-dyes/avocado/avocado_comparison.jpg",
            fiber: "Cotton",
            part: "Leaves",
          },
          {
            src: "/images/natural-dyes/avocado/avocado_comparison.jpg",
            fiber: "Cotton",
            part: "Roots",
          },
          {
            src: "/images/natural-dyes/avocado/avocado_comparison.jpg",
            fiber: "Cotton",
            part: "Flowers",
          },
        ],
        dyePrep: {
          condition: "Fresh",
          parts: "Pits",
          pH: "9",
          ratio: "3:1",
          temp: "160°F / 71°C",
          extractionTime: "1 hr / 4 days",
          dyeTime: "1hr",
        },
        notes: "",
      },
    ],
  },
  {
    id: "weld",
    commonName: "Weld",
    latinName: "Reseda luteola",
    invasive: true,
    plantImg: "/images/natural-dyes/weld/plant.jpg",
    parts: ["flowers", "leaves", "stems"],
    fabrics: ["linen", "silk", "wool"],
    swatches: [
      "/images/natural-dyes/weld/swatch-1.jpg",
      "/images/natural-dyes/weld/swatch-2.jpg",
    ],
    batches: [
      {
        id: "b1",
        label: "01",
        images: [
          { src: "/images/natural-dyes/weld/b1-1.jpg", fiber: "", part: "" },
          { src: "/images/natural-dyes/weld/b1-2.jpg", fiber: "", part: "" },
          { src: "/images/natural-dyes/weld/b1-3.jpg", fiber: "", part: "" },
        ],
        dyePrep: {
          mordant: "Alum",
          parts: "Whole plant",
          preSoak: "—",
          ratio: "1:1",
          temp: "180°F / 82°C",
          time: "45 min.",
        },
        notes: "",
      },
    ],
  },
  {
    id: "madder",
    commonName: "Madder",
    latinName: "Rubia tinctorum",
    invasive: false,
    plantImg: "/images/natural-dyes/madder/plant.jpg",
    parts: ["roots"],
    fabrics: ["cotton", "linen", "wool"],
    swatches: [
      "/images/natural-dyes/madder/swatch-1.jpg",
      "/images/natural-dyes/madder/swatch-2.jpg",
      "/images/natural-dyes/madder/swatch-3.jpg",
    ],
    batches: [
      {
        id: "b1",
        label: "01",
        images: [
          { src: "/images/natural-dyes/madder/b1-1.jpg", fiber: "", part: "" },
          { src: "/images/natural-dyes/madder/b1-2.jpg", fiber: "", part: "" },
          { src: "/images/natural-dyes/madder/b1-3.jpg", fiber: "", part: "" },
          { src: "/images/natural-dyes/madder/b1-4.jpg", fiber: "", part: "" },
          { src: "/images/natural-dyes/madder/b1-5.jpg", fiber: "", part: "" },
          { src: "/images/natural-dyes/madder/b1-6.jpg", fiber: "", part: "" },
          { src: "/images/natural-dyes/madder/b1-7.jpg", fiber: "", part: "" },
          { src: "/images/natural-dyes/madder/b1-8.jpg", fiber: "", part: "" },
          { src: "/images/natural-dyes/madder/b1-9.jpg", fiber: "", part: "" },
        ],
        dyePrep: {
          mordant: "Alum",
          parts: "Dried roots",
          preSoak: "2 hours",
          ratio: "1:2",
          temp: "150°F / 65°C",
          time: "1 hr.",
        },
        notes:
          "Do not boil — heat above 170°F shifts colour toward orange-brown.",
      },
    ],
  },
  {
    id: "black-walnut",
    commonName: "Black Walnut",
    latinName: "Juglans nigra",
    invasive: false,
    plantImg: "/images/natural-dyes/black-walnut/plant.jpg",
    parts: ["hulls"],
    fabrics: ["cotton", "linen", "silk", "wool"],
    swatches: [
      "/images/natural-dyes/black-walnut/swatch-1.jpg",
      "/images/natural-dyes/black-walnut/swatch-2.jpg",
    ],
    batches: [
      {
        id: "b1",
        label: "01",
        images: [
          {
            src: "/images/natural-dyes/black-walnut/b1-1.jpg",
            fiber: "",
            part: "",
          },
          {
            src: "/images/natural-dyes/black-walnut/b1-2.jpg",
            fiber: "",
            part: "",
          },
          {
            src: "/images/natural-dyes/black-walnut/b1-3.jpg",
            fiber: "",
            part: "",
          },
        ],
        dyePrep: {
          mordant: "None (self-mordanting)",
          parts: "Green hulls",
          preSoak: "—",
          ratio: "2:1",
          temp: "Simmer",
          time: "2 hr.",
        },
        notes:
          "Wear gloves — juglone stains skin and is very difficult to remove.",
      },
    ],
  },
  {
    id: "onion-skin",
    commonName: "Onion Skin",
    latinName: "Allium cepa",
    invasive: false,
    plantImg: "/images/natural-dyes/onion-skin/plant.jpg",
    parts: ["skins"],
    fabrics: ["cotton", "silk", "wool"],
    swatches: [
      "/images/natural-dyes/onion-skin/swatch-1.jpg",
      "/images/natural-dyes/onion-skin/swatch-2.jpg",
      "/images/natural-dyes/onion-skin/swatch-3.jpg",
    ],
    batches: [
      {
        id: "b1",
        label: "01",
        images: [
          {
            src: "/images/natural-dyes/onion-skin/b1-1.jpg",
            fiber: "",
            part: "",
          },
          {
            src: "/images/natural-dyes/onion-skin/b1-2.jpg",
            fiber: "",
            part: "",
          },
          {
            src: "/images/natural-dyes/onion-skin/b1-3.jpg",
            fiber: "",
            part: "",
          },
          {
            src: "/images/natural-dyes/onion-skin/b1-4.jpg",
            fiber: "",
            part: "",
          },
          {
            src: "/images/natural-dyes/onion-skin/b1-5.jpg",
            fiber: "",
            part: "",
          },
          {
            src: "/images/natural-dyes/onion-skin/b1-6.jpg",
            fiber: "",
            part: "",
          },
        ],
        dyePrep: {
          mordant: "Alum",
          parts: "Dry outer skins",
          preSoak: "30 min.",
          ratio: "1:1",
          temp: "180°F / 82°C",
          time: "45 min.",
        },
        notes:
          "Yellow onion skins yield golden orange; red onion skins yield muted green-gold.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FILTER CONTENT (shared between desktop panel and mobile accordion)
// ─────────────────────────────────────────────────────────────────────────────

const FilterSection = ({ title, items, selected, onToggle }) => (
  <div style={{ marginBottom: "28px" }}>
    <p
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "0.55rem",
        fontWeight: "700",
        color: C.midGray,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        marginBottom: "12px",
      }}
    >
      {title}
    </p>
    {items.map((item) => (
      <label
        key={item.id}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "9px",
          cursor: "pointer",
          marginBottom: "9px",
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.68rem",
          color: selected.includes(item.id) ? C.black : C.darkGray,
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: "11px",
            height: "11px",
            border: `1.5px solid ${C.black}`,
            background: selected.includes(item.id) ? C.black : "transparent",
            flexShrink: 0,
            transition: "background 0.15s ease",
          }}
        />
        <input
          type="checkbox"
          checked={selected.includes(item.id)}
          onChange={() => onToggle(item.id)}
          style={{ display: "none" }}
        />
        {item.label}
      </label>
    ))}
  </div>
);

const FilterContent = ({ filters, onChange, plants }) => {
  const toggle = (cat, val) => {
    const cur = filters[cat];
    onChange({
      ...filters,
      [cat]: cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val],
    });
  };
  return (
    <div>
      <FilterSection
        title="Plant"
        items={plants.map((p) => ({ id: p.id, label: p.commonName }))}
        selected={filters.plants}
        onToggle={(v) => toggle("plants", v)}
      />
      <FilterSection
        title="Plant Part"
        items={ALL_PARTS.map((p) => ({ id: p, label: p }))}
        selected={filters.parts}
        onToggle={(v) => toggle("parts", v)}
      />
      <FilterSection
        title="Fabric"
        items={ALL_FABRICS.map((f) => ({ id: f, label: f }))}
        selected={filters.fabrics}
        onToggle={(v) => toggle("fabrics", v)}
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// INDEX VIEW
// ─────────────────────────────────────────────────────────────────────────────

const NaturalDyesIndex = ({ plants, onSelectPlant }) => {
  const isMobile = useIsMobile();
  const [filterOpen, setFilterOpen] = useState(false);
  const [swatchSize, setSwatchSize] = useState(140);
  const [filters, setFilters] = useState({
    plants: [],
    parts: [],
    fabrics: [],
  });
  const [hoveredKey, setHoveredKey] = useState(null);

  const filtered = plants.filter((p) => {
    if (filters.plants.length && !filters.plants.includes(p.id)) return false;
    if (
      filters.parts.length &&
      !filters.parts.every((pt) => p.parts.includes(pt))
    )
      return false;
    if (
      filters.fabrics.length &&
      !filters.fabrics.every((f) => p.fabrics.includes(f))
    )
      return false;
    return true;
  });

  const swatches = filtered.flatMap((p) =>
    p.swatches.map((img) => ({ img, plant: p }))
  );
  const activeCount =
    filters.plants.length + filters.parts.length + filters.fabrics.length;
  const clearFilters = () => setFilters({ plants: [], parts: [], fabrics: [] });

  const swatchGrid =
    swatches.length > 0 ? (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(auto-fill, minmax(100px, 1fr))"
            : `repeat(auto-fill, minmax(${swatchSize}px, 1fr))`,
          gap: "8px",
        }}
      >
        {swatches.map(({ img, plant }, i) => {
          const key = `${plant.id}-${i}`;
          const hovered = hoveredKey === key;
          return (
            <div
              key={key}
              onClick={() => onSelectPlant(plant)}
              onMouseEnter={() => setHoveredKey(key)}
              onMouseLeave={() => setHoveredKey(null)}
              style={{
                aspectRatio: "1/1",
                position: "relative",
                cursor: "pointer",
                transform: hovered ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.25s ease",
                zIndex: hovered ? 1 : 0,
              }}
            >
              {/* Inner div clips the image */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  overflow: "hidden",
                  background: C.offWhite,
                }}
              >
                <img
                  src={img}
                  alt={plant.commonName}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* Centered hover overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: hovered
                    ? "rgba(13,13,13,0.65)"
                    : "rgba(13,13,13,0)",
                  transition: "background 0.25s ease",
                  pointerEvents: "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.78rem",
                    fontWeight: "700",
                    color: "#F0ECD8",
                    letterSpacing: "0.05em",
                    textAlign: "center",
                    padding: "0 10px",
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.2s ease",
                  }}
                >
                  {plant.commonName}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.72rem",
          color: C.midGray,
          marginTop: "48px",
        }}
      >
        No results match the current filters.
      </p>
    );

  return (
    <div style={{ padding: isMobile ? "20px 16px" : "48px" }}>
      {/* Header */}
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

      {/* Controls bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setFilterOpen((o) => !o)}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.6rem",
            fontWeight: "700",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: filterOpen || activeCount > 0 ? C.white : C.black,
            background: filterOpen || activeCount > 0 ? C.black : "transparent",
            border: `1.5px solid ${C.black}`,
            padding: "5px 12px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            transition: "background 0.15s ease, color 0.15s ease",
          }}
        >
          <span style={{ opacity: 0.7 }}>⊹</span>
          filter{activeCount > 0 ? ` (${activeCount})` : ""}
        </button>

        {activeCount > 0 && (
          <button
            onClick={clearFilters}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.58rem",
              color: C.midGray,
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
              letterSpacing: "0.04em",
            }}
          >
            clear
          </button>
        )}

        {!isMobile && (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.55rem",
                color: C.midGray,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              size
            </span>
            <input
              type="range"
              min="80"
              max="260"
              value={swatchSize}
              onChange={(e) => setSwatchSize(+e.target.value)}
              style={{ width: "110px" }}
            />
          </div>
        )}
      </div>

      {/* Mobile: inline accordion filter */}
      {isMobile && (
        <div
          style={{
            maxHeight: filterOpen ? "700px" : "0",
            opacity: filterOpen ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.35s ease, opacity 0.25s ease",
            marginBottom: filterOpen ? "20px" : "0",
          }}
        >
          <div
            style={{
              borderTop: `1px solid ${C.lightGray}`,
              paddingTop: "20px",
              paddingBottom: "4px",
            }}
          >
            <FilterContent
              filters={filters}
              onChange={setFilters}
              plants={plants}
            />
          </div>
        </div>
      )}

      {/* Desktop: two-column layout with inline fading filter panel */}
      {!isMobile ? (
        <div style={{ display: "flex", gap: filterOpen ? "36px" : "0" }}>
          {/* Filter panel — width-animated left column */}
          <div
            style={{
              width: filterOpen ? "200px" : "0",
              opacity: filterOpen ? 1 : 0,
              overflow: "hidden",
              flexShrink: 0,
              transition: "width 0.32s ease, opacity 0.25s ease",
            }}
          >
            {/* Fixed-width inner so text doesn't reflow during animation */}
            <div style={{ width: "200px" }}>
              <FilterContent
                filters={filters}
                onChange={setFilters}
                plants={plants}
              />
            </div>
          </div>

          {/* Swatch grid */}
          <div style={{ flex: 1, minWidth: 0 }}>{swatchGrid}</div>
        </div>
      ) : (
        swatchGrid
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PLANT DETAIL VIEW
// ─────────────────────────────────────────────────────────────────────────────

// Ornament divider spanning the 3×3 grid width, with centered label
const OrnamentDivider = ({ label }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "20px",
    }}
  >
    <div style={{ flex: 1, height: "1px", background: C.lightGray }} />
    <span
      style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "0.85rem",
        color: C.lightGray,
      }}
    >
      ✦
    </span>
    <span
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "0.88rem",
        fontWeight: "700",
        color: C.black,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "0.85rem",
        color: C.lightGray,
      }}
    >
      ✦
    </span>
    <div style={{ flex: 1, height: "1px", background: C.lightGray }} />
  </div>
);

// Only shown when plant.invasive === true.
// One-line black badge with white text + a shimmer sweep on mount.
const InvasiveBadge = () => (
  <>
    <style>{`
      @keyframes invasiveShimmer {
        0%   { transform: translateX(-120%); }
        100% { transform: translateX(120%); }
      }
      .invasive-shimmer {
        animation: invasiveShimmer 1.1s ease-in-out 0.5s 1 forwards;
        transform: translateX(-120%);
      }
    `}</style>
    <div
      style={{
        marginTop: "12px",
        background: C.black,
        padding: "6px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "7px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Shimmer sweep */}
      <div
        className="invasive-shimmer"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.28) 50%, transparent 75%)",
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "0.82rem",
          color: "#FFFFFF",
          lineHeight: 1,
          position: "relative",
        }}
      >
        ⚘
      </span>
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.52rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#FFFFFF",
          position: "relative",
        }}
      >
        PNW Invasive
      </span>
    </div>
  </>
);

const MOCK_COLORS = [
  "#B8C4CC", "#C9B87A", "#C47A65", "#8A7060",
  "#B89A5A", "#8A9E8A", "#B89090", "#C4B090", "#A090B0",
];

// 3×3 grid cell — colored mock bg until real image loads; hover shows fiber/part, no shadow
const BatchImageCell = ({ img, plantName, batchLabel, index }) => {
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const hasMeta = img && (img.fiber || img.part);
  const showColor = !img?.src || imgFailed;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        aspectRatio: "1/1",
        overflow: "hidden",
        background: showColor ? MOCK_COLORS[index % MOCK_COLORS.length] : C.offWhite,
        position: "relative",
      }}
    >
      {img?.src && !imgFailed && (
        <img
          src={img.src}
          alt={`${plantName} batch ${batchLabel} — ${index + 1}`}
          onError={() => setImgFailed(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}
      {hasMeta && hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            pointerEvents: "none",
          }}
        >
          {img.fiber && (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#555555",
                  marginBottom: "3px",
                }}
              >
                Fiber
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.96rem",
                  fontWeight: "700",
                  color: C.black,
                }}
              >
                {img.fiber}
              </div>
            </div>
          )}
          {img.part && (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#555555",
                  marginBottom: "3px",
                }}
              >
                Part
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.96rem",
                  fontWeight: "700",
                  color: C.black,
                }}
              >
                {img.part}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const dyePrepRows = [
  ["Condition", "condition"],
  ["Parts", "parts"],
  ["pH", "pH"],
  ["Ratio", "ratio"],
  ["Temp", "temp"],
  ["Extraction Time", "extractionTime"],
  ["Dye Time", "dyeTime"],
];

const PlantDetail = ({ plant, onBack }) => {
  const isMobile = useIsMobile();

  return (
    <div style={{ padding: isMobile ? "20px 16px" : "48px" }}>
      {/* Back */}
      <button
        onClick={onBack}
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.72rem",
          fontWeight: "700",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: C.black,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          marginBottom: "36px",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          opacity: 0.6,
        }}
      >
        ← natural dyes
      </button>

      {/* Plant name */}
      <h2
        style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: isMobile ? "1.3rem" : "1.9rem",
          color: C.black,
          marginBottom: "6px",
          letterSpacing: "0.02em",
        }}
      >
        {plant.commonName}
      </h2>
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.78rem",
          color: C.midGray,
          fontStyle: "italic",
          marginBottom: "44px",
        }}
      >
        {plant.latinName}
      </p>

      {/* Batches — [photo left | batch label + grid + prep right] */}
      <div style={{ display: "flex", flexDirection: "column", gap: "72px" }}>
        {plant.batches.map((batch, batchIdx) => (
          <div key={batch.id}>
            {/* Desktop two-column layout — 2×2 grid so photo top aligns with 3×3 grid top */}
            {!isMobile ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  columnGap: "40px",
                  rowGap: "0",
                  alignItems: "start",
                }}
              >
                {/* Row 1, Col 1: empty spacer (height matches batch label row) */}
                <div />

                {/* Row 1, Col 2: batch label */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "10px",
                    marginBottom: "18px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.68rem",
                      color: C.midGray,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    Batch
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      color: C.black,
                    }}
                  >
                    {batch.label}
                  </span>
                </div>

                {/* Row 2, Col 1: portrait photo (first batch only) + invasive badge */}
                <div>
                  {batchIdx === 0 && (
                    <>
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "3/4",
                          overflow: "hidden",
                          background: C.offWhite,
                        }}
                      >
                        {plant.plantImg && (
                          <img
                            src={plant.plantImg}
                            alt={`${plant.commonName} plant`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        )}
                      </div>
                      {plant.invasive && <InvasiveBadge />}
                    </>
                  )}
                </div>

                {/* Row 2, Col 2: 3×3 + prep + notes */}
                <div>
                  {/* 3×3 image grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "8px",
                      marginBottom: "28px",
                    }}
                  >
                    {Array.from({ length: 9 }).map((_, i) => (
                      <BatchImageCell
                        key={i}
                        img={batch.images[i] ?? null}
                        plantName={plant.commonName}
                        batchLabel={batch.label}
                        index={i}
                      />
                    ))}
                  </div>

                  {/* Dye prep */}
                  <div style={{ marginBottom: "20px" }}>
                    <OrnamentDivider label="Dye Preparation" />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto auto",
                          columnGap: "18px",
                          rowGap: "7px",
                        }}
                      >
                        {dyePrepRows.map(([label, key]) => (
                          <React.Fragment key={key}>
                            <span
                              style={{
                                fontFamily: "'Space Mono', monospace",
                                fontSize: "0.68rem",
                                color: C.midGray,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                textAlign: "right",
                                alignSelf: "baseline",
                              }}
                            >
                              {label}
                            </span>
                            <span
                              style={{
                                fontFamily: "'Space Mono', monospace",
                                fontSize: "0.88rem",
                                fontWeight: "700",
                                color: C.black,
                                textAlign: "left",
                                alignSelf: "baseline",
                              }}
                            >
                              {batch.dyePrep[key] || "—"}
                            </span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {batch.notes && (
                    <div
                      style={{
                        borderTop: `1px solid ${C.lightGray}`,
                        paddingTop: "16px",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "0.68rem",
                          color: C.midGray,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          marginBottom: "8px",
                        }}
                      >
                        Notes
                      </p>
                      <p
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "0.88rem",
                          color: C.darkGray,
                          lineHeight: 1.85,
                        }}
                      >
                        {batch.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Mobile: stacked */
              <div>
                {batchIdx === 0 && (
                  <div style={{ marginBottom: "20px" }}>
                    <div
                      style={{
                        width: "120px",
                        aspectRatio: "3/4",
                        overflow: "hidden",
                        background: C.offWhite,
                      }}
                    >
                      {plant.plantImg && (
                        <img
                          src={plant.plantImg}
                          alt={`${plant.commonName} plant`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      )}
                    </div>
                    {plant.invasive && (
                      <div style={{ width: "120px" }}>
                        <InvasiveBadge />
                      </div>
                    )}
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "10px",
                    marginBottom: "18px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.68rem",
                      color: C.midGray,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    Batch
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      color: C.black,
                    }}
                  >
                    {batch.label}
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "8px",
                    marginBottom: "28px",
                  }}
                >
                  {Array.from({ length: 9 }).map((_, i) => (
                    <BatchImageCell
                      key={i}
                      img={batch.images[i] ?? null}
                      plantName={plant.commonName}
                      batchLabel={batch.label}
                      index={i}
                    />
                  ))}
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <OrnamentDivider label="Dye Preparation" />
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "auto auto",
                        columnGap: "18px",
                        rowGap: "7px",
                      }}
                    >
                      {dyePrepRows.map(([label, key]) => (
                        <React.Fragment key={key}>
                          <span
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              fontSize: "0.68rem",
                              color: C.midGray,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              textAlign: "right",
                              alignSelf: "baseline",
                            }}
                          >
                            {label}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              fontSize: "0.88rem",
                              fontWeight: "700",
                              color: C.black,
                              textAlign: "left",
                              alignSelf: "baseline",
                            }}
                          >
                            {batch.dyePrep[key] || "—"}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {batch.notes && (
                  <div
                    style={{
                      borderTop: `1px solid ${C.lightGray}`,
                      paddingTop: "16px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.68rem",
                        color: C.midGray,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: "8px",
                      }}
                    >
                      Notes
                    </p>
                    <p
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.88rem",
                        color: C.darkGray,
                        lineHeight: 1.85,
                      }}
                    >
                      {batch.notes}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────

const NaturalDyesSection = ({ plantId = null, onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [plantId]);

  const selectedPlant = plantId
    ? PLANTS.find((p) => p.id === plantId) ?? null
    : null;

  if (selectedPlant) {
    return (
      <PlantDetail plant={selectedPlant} onBack={() => onNavigate(null)} />
    );
  }
  return (
    <NaturalDyesIndex
      plants={PLANTS}
      onSelectPlant={(plant) => onNavigate(plant.id)}
    />
  );
};

export default NaturalDyesSection;
