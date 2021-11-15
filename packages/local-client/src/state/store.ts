import { configureStore } from '@reduxjs/toolkit';
import { bundlesReducer } from './bundle-slice';
import { cellsReducer, cellsActions } from './cells-slice';

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
    bundles: bundlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

