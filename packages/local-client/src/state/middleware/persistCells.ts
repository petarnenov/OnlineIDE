import { Action, Dispatch } from '@reduxjs/toolkit';
import { ActionType, postCells } from '..';

// TODO: set proper type instead any in Dispatch
export const usePersistCells = ({ dispatch }: { dispatch: Dispatch<any> }) => {
  let timer: NodeJS.Timeout;
  return (next: (action: Action<string>) => void) => {
    return (action: Action<string>) => {
      const actionType = action.type;
      const prefixCells = 'cells-slice';
      next(action);
      if (
        [
          `${prefixCells}/${ActionType.MOVE_CELL}`,
          `${prefixCells}/${ActionType.DELETE_CELL}`,
          `${prefixCells}/${ActionType.UPDATE_CELL}`,
          `${prefixCells}/${ActionType.INSERT_CELL_AFTER}`,
        ].includes(actionType)
      ) {
        // debouncing
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          dispatch(postCells());
        }, 500);
      }
    };
  };
};
