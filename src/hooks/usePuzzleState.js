import { useReducer, useRef, useCallback } from 'react';
import { buildPieces, shuffle } from '../data/pieces';
import { COLS, ROWS } from '../constants/puzzle';

function slotKey(row, col) {
  return `${row}_${col}`;
}

function slotKeyForPiece(pieceId) {
  // pieceId format: 'piece_row_col'
  const parts = pieceId.split('_');
  return `${parts[1]}_${parts[2]}`;
}

function buildInitialState() {
  const allPieces = buildPieces();
  const pieceStatus = {};
  const boardSlots = {};

  allPieces.forEach((p) => {
    pieceStatus[p.id] = 'tray';
  });

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      boardSlots[slotKey(row, col)] = null;
    }
  }

  return {
    pieceStatus,
    boardSlots,
    trayOrder: shuffle(allPieces.map((p) => p.id)),
    isComplete: false,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'PLACE_PIECE': {
      const { pieceId } = action;
      if (state.pieceStatus[pieceId] === 'placed') return state;

      const key = slotKeyForPiece(pieceId);
      const newPieceStatus = { ...state.pieceStatus, [pieceId]: 'placed' };
      const newBoardSlots = { ...state.boardSlots, [key]: pieceId };
      const isComplete = Object.values(newPieceStatus).every((s) => s === 'placed');

      return {
        ...state,
        pieceStatus: newPieceStatus,
        boardSlots: newBoardSlots,
        isComplete,
      };
    }

    case 'RESET': {
      return buildInitialState();
    }

    default:
      return state;
  }
}

export function usePuzzleState() {
  const [state, dispatch] = useReducer(reducer, null, buildInitialState);

  // Slot positions: { pieceId: { x, y } } — center coords in window space
  const slotPositions = useRef({});

  const registerSlot = useCallback((pieceId, coords) => {
    slotPositions.current[pieceId] = coords;
  }, []);

  return { state, dispatch, slotPositions, registerSlot };
}
