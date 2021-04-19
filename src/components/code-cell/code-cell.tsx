
import { useState, useEffect } from 'react';
import BaseBundler from '../../bundler'
import { Cell } from '../../state';

import CodeEditor from '../code-editor/code-editor';
import Preview from '../preview/preview';
import Resizable from '../resizable/resizable'

import { useActions } from '../../hooks'
interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState('')
  const [err, setErr] = useState('');

  const { updateCellAction } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await BaseBundler(cell.content)
      setCode(output.code);
      setErr(output.err);
    }, 750);
    return () => {
      clearTimeout(timer);
    }
  }, [cell.content])

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={value => updateCellAction(cell.id, value)}
            initialValue="const a = 1"
          />
        </Resizable>
        <Preview code={code} bundlingStatus={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;;