
import { useState } from 'react';
import BaseBundler from '../bundler'

import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable'

interface CodeCellProps {

}

const CodeCell: React.FC<CodeCellProps> = () => {
  const [code, setCode] = useState('')
  const [input, setInput] = useState('');

  const onClick = async () => {
    const output = await BaseBundler(input)
    setCode(output);
  }

  return (
    <Resizable direction="vertical">
      <div>
        <CodeEditor
          onChange={value => setInput(value)}
          initialValue={input}
        />

        <div>
          <button onClick={onClick}>Submit</button>
        </div>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;;