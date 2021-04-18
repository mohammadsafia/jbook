
import { useState, useEffect } from 'react';
import BaseBundler from '../bundler'

import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable'

interface CodeCellProps {

}

const CodeCell: React.FC<CodeCellProps> = () => {
  const [code, setCode] = useState('')
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await BaseBundler(input)
      setCode(output);
    }, 1000);
    return () => {
      clearTimeout(timer);
    }
  }, [input])

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={value => setInput(value)}
            initialValue={input}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;;