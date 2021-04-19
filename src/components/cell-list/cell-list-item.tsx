import { Cell } from "../../state";
import CodeCell from './../code-cell/code-cell';
import TextEditor from '../text-editor/text-editor';
export interface CellListItemProps {
  cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {

  let child: JSX.Element;

  if (cell.type === "code") {
    child = <CodeCell />
  } else {
    child = <TextEditor />
  }

  return (<div>{child}</div>);
}

export default CellListItem;