import './action-bar.css';

import { useActions } from './../../hooks/use-actions';


export interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCellAction, deleteCellAction } = useActions();
  return (
    <div className="action-bar">
      <button className="button is-primary is-small" onClick={() => moveCellAction(id, 'up')}>
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button className="button is-primary is-small" onClick={() => moveCellAction(id, 'down')}>
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button className="button is-primary is-small" onClick={() => deleteCellAction(id)}>
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
}

export default ActionBar;