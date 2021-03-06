import './action-bar.css';
import React from 'react';
import { useActions } from '../../hooks';

interface ActionBarProps {
  id: string;
}

// TODO: refactor to reusable action button component
const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="action-bar">
      <span style={{ marginRight: '5px' }}>ID: {id}</span>
      <button
        className="button is-primary is-small"
        onClick={() => {
          moveCell({ id, direction: 'up' });
        }}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => {
          moveCell({ id, direction: 'down' });
        }}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => {
          deleteCell({ id });
        }}
      >
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
