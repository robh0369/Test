import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, InteractionManager } from 'react-native';
import Svg from 'react-native-svg';
import { PirateShipContent } from '../artwork/PirateShipSvg';
import { PIECE_W, PIECE_H } from '../constants/puzzle';
import { useSlotPositions } from '../contexts/SlotPositionContext';

export default function PuzzleSlot({ piece, isPlaced, slotW, slotH }) {
  const { registerSlot } = useSlotPositions();
  const viewRef = useRef(null);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      if (viewRef.current) {
        viewRef.current.measure((_x, _y, _w, _h, pageX, pageY) => {
          registerSlot(piece.id, {
            x: pageX + slotW / 2,
            y: pageY + slotH / 2,
          });
        });
      }
    });
    return () => task.cancel();
  }, [piece.id, slotW, slotH, registerSlot]);

  const vbX = piece.col * PIECE_W;
  const vbY = piece.row * PIECE_H;

  return (
    <View
      ref={viewRef}
      collapsable={false}
      style={[
        styles.slot,
        { width: slotW, height: slotH },
        isPlaced ? styles.slotFilled : styles.slotEmpty,
      ]}
    >
      {isPlaced && (
        <Svg
          width={slotW}
          height={slotH}
          viewBox={`${vbX} ${vbY} ${PIECE_W} ${PIECE_H}`}
        >
          <PirateShipContent idSuffix={`placed_${piece.id}`} />
        </Svg>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  slot: {
    borderWidth: 1.5,
    borderRadius: 6,
    overflow: 'hidden',
  },
  slotEmpty: {
    borderColor: 'rgba(255,255,255,0.35)',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  slotFilled: {
    borderColor: '#FFD600',
    borderStyle: 'solid',
    borderWidth: 2,
  },
});
