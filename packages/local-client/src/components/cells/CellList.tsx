import './cell-list.css';
import React, { Fragment } from 'react';
import { useAppSelector } from '../../hooks';
import AddCell from './AddCell';
import CellListItem from './CellListItem';

interface CellListProps {}

const CellList: React.FC<CellListProps> = () => {
  const cells = useAppSelector((state) => {
    const {
      cells: { order, data },
    } = state;
    return order.map((id) => data[id]);
  });
  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell prevCellId={null} forceVisible={cells.length === 0} />
      {renderedCells}
    </div>
  );
};

export default CellList;
