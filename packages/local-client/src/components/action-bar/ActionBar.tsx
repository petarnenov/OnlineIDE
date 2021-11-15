import './action-bar.css';
import React from 'react';
import { useActions } from '../../hooks';
import { postCells } from '../../state';

interface ActionBarProps {
  id: string;
}

// TODO: refactor to reusable action button component
const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell, postCells } = useActions();

  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => {
          moveCell({ id, direction: 'up' });
          postCells();
        }}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => {
          moveCell({ id, direction: 'down' })
          postCells()
        }}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => {
          deleteCell({ id })
          postCells()
        }
        }
      >
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
