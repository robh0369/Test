import React, { useRef } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';
import Svg from 'react-native-svg';
import { PirateShipContent } from '../artwork/PirateShipSvg';
import { PIECE_W, PIECE_H } from '../constants/puzzle';

/**
 * DraggablePiece — shows one puzzle piece (viewBox-cropped ship SVG).
 * When the user starts dragging, it calls onDragStart with the piece info
 * and the PanResponder pan value so DragProxy can take over the gesture.
 *
 * In the tray this component is rendered as a static placeholder after
 * drag starts (hidden via opacity). The DragProxy component (in App.js)
 * actually floats above everything during the drag.
 */
export default function DraggablePiece({ piece, width, height, onDragStart }) {
  const { col, row } = piece;
  const vbX = col * PIECE_W;
  const vbY = row * PIECE_H;

  const viewRef = useRef(null);
  const isDragging = useRef(false);
  const opacity = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gs) =>
        Math.abs(gs.dx) > 4 || Math.abs(gs.dy) > 4,

      onPanResponderGrant: (evt) => {
        isDragging.current = true;
        // Measure our absolute position, then hand off to DragProxy
        viewRef.current?.measure((_x, _y, _w, _h, pageX, pageY) => {
          opacity.setValue(0.2);
          onDragStart({
            piece,
            originPageX: pageX,
            originPageY: pageY,
            initialTouchX: evt.nativeEvent.pageX,
            initialTouchY: evt.nativeEvent.pageY,
            width,
            height,
            onDropped: () => {
              isDragging.current = false;
              // piece will disappear from tray via state update — no need to restore opacity
            },
            onCancelled: () => {
              isDragging.current = false;
              Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }).start();
            },
          });
        });
      },

      // Move / release are handled by DragProxy once drag starts;
      // these are fallbacks if measure hasn't fired yet.
      onPanResponderMove: () => {},
      onPanResponderRelease: () => {},
      onPanResponderTerminate: () => {
        isDragging.current = false;
        opacity.setValue(1);
      },
    })
  ).current;

  return (
    <Animated.View
      ref={viewRef}
      collapsable={false}
      style={[styles.piece, { width, height, opacity }]}
      {...panResponder.panHandlers}
    >
      <Svg
        width={width}
        height={height}
        viewBox={`${vbX} ${vbY} ${PIECE_W} ${PIECE_H}`}
        style={styles.svg}
      >
        <PirateShipContent idSuffix={`tray_${piece.id}`} />
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  piece: {
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFD700',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  svg: {
    borderRadius: 4,
  },
});
