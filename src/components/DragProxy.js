import React, { useRef, useEffect } from 'react';
import { Animated, PanResponder, StyleSheet } from 'react-native';
import Svg from 'react-native-svg';
import { PirateShipContent } from '../artwork/PirateShipSvg';
import { PIECE_W, PIECE_H, SNAP_TOLERANCE } from '../constants/puzzle';

/**
 * DragProxy — a root-level floating piece that handles the actual drag gesture.
 * Rendered in App.js so it sits above all other views, bypassing ScrollView clipping.
 *
 * drag prop shape:
 *   { piece, originPageX, originPageY, initialTouchX, initialTouchY,
 *     width, height, onDropped, onCancelled }
 */
export default function DragProxy({ drag, slotPositions, onDropped, onCancelled }) {
  const { piece, originPageX, originPageY, initialTouchX, initialTouchY, width, height } = drag;
  const { col, row } = piece;
  const vbX = col * PIECE_W;
  const vbY = row * PIECE_H;

  // Offset from piece top-left to where finger landed
  const fingerOffsetX = initialTouchX - originPageX;
  const fingerOffsetY = initialTouchY - originPageY;

  // Start the proxy exactly at the piece's screen position
  const pan = useRef(new Animated.ValueXY({ x: originPageX, y: originPageY })).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (evt) => {
        pan.setValue({
          x: evt.nativeEvent.pageX - fingerOffsetX,
          y: evt.nativeEvent.pageY - fingerOffsetY,
        });
      },

      onPanResponderRelease: (evt) => {
        const fingerX = evt.nativeEvent.pageX;
        const fingerY = evt.nativeEvent.pageY;
        // Piece center while being dropped
        const dropCX = fingerX - fingerOffsetX + width / 2;
        const dropCY = fingerY - fingerOffsetY + height / 2;

        const slots = slotPositions.current;
        const slotCenter = slots[piece.id];

        if (slotCenter) {
          const dx = dropCX - slotCenter.x;
          const dy = dropCY - slotCenter.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist <= SNAP_TOLERANCE) {
            // Snap to correct slot
            Animated.spring(pan, {
              toValue: {
                x: slotCenter.x - width / 2,
                y: slotCenter.y - height / 2,
              },
              useNativeDriver: false,
              speed: 20,
              bounciness: 8,
            }).start(() => {
              drag.onDropped();
              onDropped(piece.id);
            });
            return;
          }
        }

        // Not close enough — spring back to origin
        Animated.spring(pan, {
          toValue: { x: originPageX, y: originPageY },
          useNativeDriver: false,
          speed: 16,
          bounciness: 6,
        }).start(() => {
          drag.onCancelled();
          onCancelled();
        });
      },

      onPanResponderTerminate: () => {
        Animated.spring(pan, {
          toValue: { x: originPageX, y: originPageY },
          useNativeDriver: false,
        }).start(() => {
          drag.onCancelled();
          onCancelled();
        });
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.proxy,
        { width, height, left: pan.x, top: pan.y },
      ]}
      {...panResponder.panHandlers}
    >
      <Svg
        width={width}
        height={height}
        viewBox={`${vbX} ${vbY} ${PIECE_W} ${PIECE_H}`}
      >
        <PirateShipContent idSuffix={`proxy_${piece.id}`} />
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  proxy: {
    position: 'absolute',
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: '#FFD700',
    elevation: 20,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
});
