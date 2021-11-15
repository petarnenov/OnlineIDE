import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '.';
import { ActionType } from './action-types';

export const fetchCells = createAsyncThunk<Cell[], void, { state: RootState }>(
  'fetchCells',
  async () => {
    const result: Cell[] = await (await fetch('/cells')).json();
    return result;
  }
);

export const postCells = createAsyncThunk<void, void, { state: RootState }>(
  'postCells',
  async (_, { getState }) => {
    const { order, data } = getState().cells;
    const cells = order.map((key) => data[key]);

    await fetch('/cells', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cells }),
    });
  }
);

export type CellData = {
  [key: string]: Cell;
};
export interface CellState {
  loading: boolean;
  error: string | null | undefined;
  order: string[];
  data: CellData;
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
      if (index !== 0 && index < state.order.length - 1) {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCells.pending, (state, action) => {
        state = {
          loading: true,
          error: null,
          order: [],
          data: {},
        };
      })
      .addCase(fetchCells.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.map((cell: Cell) => cell.id);
        state.data = action.payload.reduce<CellData>((acc, cell: Cell) => {
          acc[cell.id] = {
            id: cell.id,
            type: cell.type,
            content: cell.content,
          };
          return acc;
        }, {});
        state.error = null;
      })
      .addCase(fetchCells.rejected, (state, action) => {
        state = {
          loading: false,
          error: action.error.message,
          order: [],
          data: {},
        };
      })
      .addCase(postCells.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCells.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(postCells.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const cellsActions = cellSlice.actions;
export const cellsReducer = cellSlice.reducer;

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export interface MoveCellPayload {
  id: string;
  direction: MoveCellDirection;
}
export interface DeleteCellPayload {
  id: string;
}
export interface InsertCellBeforePayload {
  id: string | null;
  type: CellType;
}
export interface UpdateCellPayload {
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
