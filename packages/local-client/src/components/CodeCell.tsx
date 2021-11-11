import './code-cell.css';
import CodeEditor from '../components/CodeEditor';
import Preview from '../components/Preview';
import Resizable from './Resizable';
import { useEffect } from 'react';
import { Cell } from '../state';
import { useAppSelector, useActions } from '../hooks';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const currentBundle = useAppSelector((state) => state.bundles?.[cell.id]);
  const { updateCell, createBundle } = useActions();

  useEffect(() => {
    if (!currentBundle) {
      createBundle(cell.id);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id);
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={''}
            onChange={(value) => updateCell({ id: cell.id, content: value })}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!currentBundle || currentBundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading...
              </progress>
            </div>
          ) : (
            <Preview
              code={currentBundle?.code || ''}
              version={Date.now()}
              err={currentBundle?.err || ''}
            />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
