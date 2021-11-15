import { configureStore } from '@reduxjs/toolkit';
import { usePersistCells } from './middleware';

import { bundlesReducer } from './bundle-slice';
import { cellsReducer } from './cells-slice';

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
    bundles: bundlesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usePersistCells),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
