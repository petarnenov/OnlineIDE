import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch } from '.';
import {
  cellsActions,
  bundleActions,
  createBundle,
  fetchCells,
  postCells,
} from '../state';

export const useActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => {
    return bindActionCreators(
      {
        ...cellsActions,
        ...bundleActions,
        createBundle,
        fetchCells,
        postCells,
      },
      dispatch
    );
  }, [dispatch]);
};
