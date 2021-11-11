import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionType } from './action-types';

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initCellSlice: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellSlice = createSlice({
  name: 'cells-slice',
  initialState: initCellSlice,
  reducers: {
    [ActionType.MOVE_CELL]: (state, action: PayloadAction<MoveCellPayload>) => {
      const { direction, id } = action.payload;
      const index = state.order.findIndex((orderId) => orderId === id);
      if (index === -1) return;

      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      const swap = () => {
        const temp = state.order[index];
        state.order[index] = state.order[swapIndex];
        state.order[swapIndex] = temp;
      };
      if (index === 0 && state.order.length !== 1 && direction === 'down') {
        swap();
        return;
      }
      if (
        index !== 0 &&
        index === state.order.length - 1 &&
        direction === 'up'
      ) {
        swap();
        return;
      }
      if (index > 0 && index < state.order.length - 2) {
        swap();
        return;
      }
    },
    [ActionType.DELETE_CELL]: (
      state,
      action: PayloadAction<DeleteCellPayload>
    ) => {
      const { id } = action.payload;
      state.order = state.order.filter((indexOrder) => indexOrder !== id);
      delete state.data[id];
    },
    [ActionType.INSERT_CELL_AFTER]: (
      state,
      action: PayloadAction<InsertCellBeforePayload>
    ) => {
      const { id } = action.payload;
      const cell: Cell = {
        id: randomId(),
        content: '',
        type: action.payload.type,
      };
      state.data[cell.id] = cell;
      const index = state.order.findIndex((orderId) => orderId === id);
      if (index === -1) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(index + 1, 0, cell.id);
      }
    },
    [ActionType.UPDATE_CELL]: (
      state,
      action: PayloadAction<UpdateCellPayload>
    ) => {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
  },
});

export const cellsActions = cellSlice.actions;
export const cellsReducer = cellSlice.reducer;

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

interface MoveCellPayload {
  id: string;
  direction: MoveCellDirection;
}
interface DeleteCellPayload {
  id: string;
}
interface InsertCellBeforePayload {
  id: string | null;
  type: CellType;
}
interface UpdateCellPayload {
  id: string;
  content: string;
}
type CellType = 'code' | 'text';
type MoveCellDirection = 'up' | 'down';
export interface Cell {
  id: string;
  type: CellType;
  content: string;
}
