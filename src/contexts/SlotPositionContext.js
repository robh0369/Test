import { createContext, useContext } from 'react';

const SlotPositionContext = createContext({
  slotPositions: {},
  registerSlot: () => {},
});

export default SlotPositionContext;

export function useSlotPositions() {
  return useContext(SlotPositionContext);
}
