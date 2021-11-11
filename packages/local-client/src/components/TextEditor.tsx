import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import { useActions } from '../hooks';
import { Cell } from '../state';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        divRef.current &&
        event.target &&
        divRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });
    return () =>
      document.removeEventListener('click', listener, { capture: true });
  }, []);

  const onChange = (value: string | undefined) => {
    updateCell({
      id: cell.id,
      content: value || '',
    });
  };

  return (
    <div ref={divRef} className="container">
      <div onClick={() => setEditing(true)}>Add/Edit text...</div>
      {editing && <MDEditor value={cell.content} onChange={onChange} />}
      {!editing && <MDEditor.Markdown source={cell.content} />}
    </div>
  );
};

export default TextEditor;
