import { COLS, ROWS } from '../constants/puzzle';

export function buildPieces() {
  const pieces = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      pieces.push({
        id: `piece_${row}_${col}`,
        col,
        row,
      });
    }
  }
  return pieces;
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
