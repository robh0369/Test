import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { COLS, ROWS } from '../constants/puzzle';
import PuzzleSlot from './PuzzleSlot';
import { buildPieces } from '../data/pieces';

const ALL_PIECES = buildPieces();

export default function PuzzleBoard({ state }) {
  const { width } = useWindowDimensions();
  const boardW = width;
  const boardH = width * (ROWS / COLS); // 4:5 aspect ratio
  const slotW = boardW / COLS;
  const slotH = boardH / ROWS;

  return (
    <View style={[styles.board, { width: boardW, height: boardH }]}>
      <View style={styles.grid}>
        {ALL_PIECES.map((piece) => (
          <PuzzleSlot
            key={piece.id}
            piece={piece}
            isPlaced={state.pieceStatus[piece.id] === 'placed'}
            slotW={slotW}
            slotH={slotH}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    backgroundColor: '#D4A574',
    borderWidth: 4,
    borderColor: '#8B4513',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
