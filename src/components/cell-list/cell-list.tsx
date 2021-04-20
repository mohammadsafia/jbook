import './cell-list.css';
import { Fragment } from 'react';
import { useTypedSelector } from '../../hooks';
import CellListItem from './cell-list-item';
import AddCell from '../add-cell/add-cell'
export interface CellListProps {

}

const CellList: React.FC<CellListProps> = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => order.map((id) => data[id]));

  const renderedCells = cells.map((cell) =>
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>)
  return (
    <div className="cell-list">
      <AddCell previousCellId={null} forceVisible={cells.length === 0} />
      {renderedCells}
    </div>
  )
}

export default CellList;