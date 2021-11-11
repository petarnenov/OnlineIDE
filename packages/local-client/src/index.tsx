import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/cells/CellList';

const App = () => {
  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  );
};

ReactDom.render(<App />, document.querySelector('#root'));
