
import 'bulmaswatch/superhero/bulmaswatch.min.css';

import { useState } from 'react';
import ReactDOM from 'react-dom';

import bundle from './bundler'

import CodeEditor from './components/code-editor';
import Preview from './components/preview';


const App = () => {
  const [code, setCode] = useState<string>('')
  const [input, setInput] = useState('');

  const onClick = async () => {
    const output = await bundle(input)
    setCode(output);
  }

  return (
    <div>
      <CodeEditor onChange={(value: string) => setInput(value)} initialValue={input} />

      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
