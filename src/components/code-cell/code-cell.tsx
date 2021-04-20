import { Cell } from '../../state';
import { useActions } from '../../hooks'
import { useEffect } from 'react';
import CodeEditor from '../code-editor/code-editor';
import Preview from '../preview/preview';
import Resizable from '../resizable/resizable';
import { useTypedSelector } from './../../hooks/use-typed-selector';
interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {

  const { updateCellAction, createBundleAction } = useActions();
  const bundle = useTypedSelector(({ bundles }) => bundles[cell.id]);


  useEffect(() => {
    if (!bundle) {
      createBundleAction(cell.id, cell.content);
      return;
    }

    const timer = setTimeout(async () => {
      createBundleAction(cell.id, cell.content)
    }, 1000);
    return () => {
      clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [cell.content, cell.id, createBundleAction])

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={value => updateCellAction(cell.id, value)}
            initialValue="const a = 1"
          />
        </Resizable>
        {bundle && (<Preview code={bundle.code} bundlingStatus={bundle.err} />)}
      </div>
    </Resizable>
  );
};

export default CodeCell;