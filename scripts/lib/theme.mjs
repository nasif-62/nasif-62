// Design tokens. These mirror the "Viewfinder" system on nasif.tech: warm paper
// and forest ink, hairlines, and a single accent (the owls' eyes).
// Every graphic is drawn once per theme; the README picks one with <picture>.

/** Blend `top` over `base` at `alpha` and return a solid hex. */
export function mix(base, top, alpha) {
  const ch = (hex, i) => parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16);
  const out = [0, 1, 2].map((i) => Math.round(ch(base, i) * (1 - alpha) + ch(top, i) * alpha));
  return `#${out.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function build({ name, card, sunk, text, text2, text3, accent, accentInk, onAccent, heat, hero }) {
  return {
    name,
    card, // card surface
    sunk, // recessed surface: chips, empty heatmap cells, tracks
    text,
    text2,
    text3,
    accent, // fills and marks only
    accentInk, // the accent when it has to be read as text or a thin line
    onAccent, // text on an accent fill
    line: mix(card, text, 0.13), // hairline
    line2: mix(card, text, 0.28), // stronger rule
    wash: mix(card, text, 0.05), // barely-there fill
    heat, // sequential ramp for the contribution grid, low to high
    hero,
  };
}

const INK = "#080c14";
const PAPER = "#eef1f6";
const TEAL = "#4fd1c5";

export const themes = {
  light: build({
    name: "light",
    card: "#f4f6fa",
    sunk: "#e4e8ef",
    text: "#0f1420",
    text2: "#465066",
    text3: "#6d7789",
    accent: TEAL,
    accentInk: "#0b6b62",
    onAccent: "#08121a",
    heat: ["#e4e8ef", "#8fdcd3", "#3fb8ab", "#16897e", "#0a5a53"],
    // The hero is a viewfinder, so it stays dark in both themes.
    hero: { bg: INK, text: PAPER, text2: "#aab3c4", text3: "#7c8698", line: mix(INK, PAPER, 0.16) },
  }),
  dark: build({
    name: "dark",
    card: "#10151f",
    sunk: "#1a2130",
    text: PAPER,
    text2: "#aab3c4",
    text3: "#7c8698",
    accent: TEAL,
    accentInk: TEAL,
    onAccent: "#08121a",
    heat: ["#1a2130", "#164a4a", "#1f7a74", "#30a79c", "#4fd1c5"],
    hero: { bg: INK, text: PAPER, text2: "#aab3c4", text3: "#7c8698", line: mix(INK, PAPER, 0.16) },
  }),
};

// Layout grid, in px at 1x. The README sets images at these exact widths so
// they sit on a shared column and wrap to one per row on a phone.
export const FULL = 828; // one per row
export const HALF = 412; // two per row
export const QUARTER = 204; // four per row
// Transparent margin inside every image. Images sit inline in a paragraph, so
// a row of two is separated by a space and stacked rows by the line's descent;
// these two insets even that out to the same ~10px gutter both ways.
export const INSET = 3;
export const INSET_Y = 1.5;
export const RADIUS = 14;
