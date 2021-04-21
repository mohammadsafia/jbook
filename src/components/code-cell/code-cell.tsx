import './code-cell.css';
import { Cell } from '../../state';
import { useActions } from '../../hooks'
import { useEffect } from 'react';
import CodeEditor from '../code-editor/code-editor';
import Preview from '../preview/preview';
import Resizable from '../resizable/resizable';
import { useTypedSelector, useCumulativeCode } from './../../hooks';
interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {

  const { updateCellAction, createBundleAction } = useActions();
  const bundle = useTypedSelector(({ bundles }) => bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id)


  useEffect(() => {
    if (!bundle) {
      createBundleAction(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundleAction(cell.id, cumulativeCode)
    }, 1000);
    return () => {
      clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [cumulativeCode, cell.id, createBundleAction])

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={value => updateCellAction(cell.id, value)}
            initialValue="// To show content you can use show() function ex. show( <h1>Hello World</h1> )"
          />
        </Resizable>
        {
          !bundle || bundle.loading ?
            <div className="progress-wrapper">
              <div className="progress-cover">
                <progress className="progress is-small is-primary">
                  Loading
                </progress>
              </div>
            </div>
            : <Preview code={bundle.code} bundlingStatus={bundle.err} />
        }
      </div>
    </Resizable>
  );
};

export default CodeCell;