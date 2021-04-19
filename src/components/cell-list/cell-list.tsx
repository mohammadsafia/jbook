import { Fragment } from 'react'
import { useTypedSelector } from '../../hooks';
import CellListItem from './cell-list-item';
import AddCell from '../add-cell/add-cell'
export interface CellListProps {

}

const CellList: React.FC<CellListProps> = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => order.map((id) => data[id]));

  const renderedCells = cells.map((cell) =>
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>)
  return (
    <div>
      {renderedCells}
      <AddCell nextCellId={null} forceVisible={cells.length === 0} />
    </div>
  )
}

export default CellList;