import './code-editor.css';
import React, { useRef } from 'react';
import Editor, { OnChange, OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>(null);
  let interval: number;

  const onEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.getModel()?.updateOptions({
      tabSize: 2,
    });
  };

  const onChangeEditor: OnChange = (value) => {
    window.clearTimeout(interval);
    interval = window.setTimeout(() => {
      if (!value) return;
      onChange(value);
    }, 1000);
  };

  const onClickFormat = () => {
    const currentValue = editorRef.current.getValue();
    const formatValue = prettier
      .format(currentValue, {
        parser: 'babel',
        plugins: [parser],
        tabWidth: 2,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');
    editorRef.current.setValue(formatValue);
  };

  return (
    <>
      <div className="editor-wrapper">
        <button
          className="button button-format is-primary is-small"
          onClick={onClickFormat}
        >
          Format
        </button>
        <Editor
          onChange={onChangeEditor}
          onMount={onEditorDidMount}
          defaultValue={initialValue}
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          options={{
            wordWrap: 'on',
            minimap: {
              enabled: false,
            },
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 16,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </>
  );
};

export default CodeEditor;
