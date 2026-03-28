export const COLS = 4;
export const ROWS = 5;
export const PIECE_COUNT = COLS * ROWS; // 20

// Logical SVG canvas dimensions
export const SHIP_WIDTH = 400;
export const SHIP_HEIGHT = 500;

// Each piece's SVG sub-region
export const PIECE_W = SHIP_WIDTH / COLS;   // 100
export const PIECE_H = SHIP_HEIGHT / ROWS;  // 100

// How close (px) a dropped piece's center must be to a slot center to snap
export const SNAP_TOLERANCE = 70;
