import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import SlotPositionContext from './src/contexts/SlotPositionContext';
import { usePuzzleState } from './src/hooks/usePuzzleState';
import PuzzleBoard from './src/components/PuzzleBoard';
import PieceTray from './src/components/PieceTray';
import DragProxy from './src/components/DragProxy';
import Celebration from './src/components/Celebration';

export default function App() {
  const { state, dispatch, slotPositions, registerSlot } = usePuzzleState();
  const [activeDrag, setActiveDrag] = useState(null);

  function handleDragStart(dragInfo) {
    setActiveDrag(dragInfo);
  }

  function handleDropped(pieceId) {
    dispatch({ type: 'PLACE_PIECE', pieceId });
    setActiveDrag(null);
  }

  function handleCancelled() {
    setActiveDrag(null);
  }

  function handleRestart() {
    dispatch({ type: 'RESET' });
  }

  return (
    <SlotPositionContext.Provider value={{ slotPositions, registerSlot }}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />

        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>🏴‍☠️ Pirate Puzzle!</Text>
        </View>

        {/* Puzzle board */}
        <PuzzleBoard state={state} />

        {/* Piece tray */}
        <PieceTray
          state={state}
          dispatch={dispatch}
          onDragStart={handleDragStart}
          isDragging={activeDrag !== null}
        />

        {/* Floating drag proxy (above everything) */}
        {activeDrag && (
          <DragProxy
            drag={activeDrag}
            slotPositions={slotPositions}
            onDropped={handleDropped}
            onCancelled={handleCancelled}
          />
        )}

        {/* Celebration overlay */}
        <Celebration visible={state.isComplete} onRestart={handleRestart} />
      </SafeAreaView>
    </SlotPositionContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a6b8a',
  },
  header: {
    paddingVertical: 6,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD600',
    letterSpacing: 1,
  },
});
