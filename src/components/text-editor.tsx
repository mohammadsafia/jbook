import { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';

export interface TextEditorProps {

}

const TextEditor: React.FC<TextEditorProps> = () => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = () => {
      setEditing(false);
    }

    document.addEventListener('click', listener, { capture: true })
    
    return () => {
      document.removeEventListener('click', listener, { capture: true })
    }
  }, [])

  if (editing) {
    return (
      <MDEditor />
    )
  }


  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={'# Header'} />
    </div>
  );
}

export default TextEditor;