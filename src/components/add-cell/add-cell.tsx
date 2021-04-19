import './add-cell.css';


import { useActions } from './../../hooks/use-actions';

export interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId, forceVisible }) => {
  const { insertCellAfterAction } = useActions()
  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-cell__buttons">
        <button className="button is-rounded is-primary is-small" onClick={() => insertCellAfterAction(previousCellId, 'code')}>
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button className="button is-rounded is-primary is-small" onClick={() => insertCellAfterAction(previousCellId, 'text')}>
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="add-cell__divider"></div>
    </div>
  );
}

export default AddCell;