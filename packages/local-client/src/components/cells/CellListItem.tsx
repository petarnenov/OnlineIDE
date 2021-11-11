import './cell-list-item.css';
import React from 'react';
import { Cell } from '../../state';
import ActionBar from '../action-bar/ActionBar';
import CodeCell from '../CodeCell';
import TextEditor from '../TextEditor';

interface CellListsItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListsItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === 'code') {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <TextEditor cell={cell} />
      </>
    );
  }
  return (
    <div className="cell-list-item">
      <div>{child}</div>
    </div>
  );
};

export default CellListItem;
