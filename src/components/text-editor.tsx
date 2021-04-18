import MDEditor from '@uiw/react-md-editor';

export interface TextEditorProps {

}

const TextEditor: React.FC<TextEditorProps> = () => {
  return (
    <div>
      <MDEditor.Markdown source={'$'} />
    </div>
  );
}

export default TextEditor;