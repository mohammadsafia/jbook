import * as esbuild from 'esbuild-wasm';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface AppProps {

}
const App: React.FC<AppProps> = () => {
  const ref = useRef<esbuild.Service>()
  const [input, setInput] = useState<string>('');
  const [code, setCode] = useState<string>('');



  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    });
  }

  useEffect(() => {
    startService()
  }, [])


  const onClick = async () => {
    if (!ref.current) return;

    const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015'
    })

    setCode(result.code)
  }

  return <div>
    <textarea value={input}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
      name="name" id="name" cols={30} rows={10}
    ></textarea>
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
    <pre>
      {code}
    </pre>
  </div>
};

ReactDOM.render(<App />, document.querySelector('#root'))