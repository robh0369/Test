import React from 'react';
import { View, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { COLS, ROWS } from '../constants/puzzle';
import { buildPieces } from '../data/pieces';
import DraggablePiece from './DraggablePiece';

const PIECE_MAP = Object.fromEntries(buildPieces().map((p) => [p.id, p]));

export default function PieceTray({ state, dispatch, onDragStart, isDragging }) {
  const { width } = useWindowDimensions();
  const boardW = width;
  const slotW = boardW / COLS;
  const slotH = (boardW * (ROWS / COLS)) / ROWS;

  const unplacedIds = state.trayOrder.filter(
    (id) => state.pieceStatus[id] === 'tray'
  );

  return (
    <View style={styles.tray}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={!isDragging}
        contentContainerStyle={styles.scrollContent}
      >
        {unplacedIds.map((id) => (
          <DraggablePiece
            key={id}
            piece={PIECE_MAP[id]}
            width={slotW}
            height={slotH}
            onDragStart={onDragStart}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tray: {
    flex: 1,
    backgroundColor: '#8B4513',
    borderTopWidth: 5,
    borderTopColor: '#FFD700',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
  },
});
