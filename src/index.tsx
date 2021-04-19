
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { Provider } from 'react-redux';
import { store } from './state'
import ReactDOM from 'react-dom';
import CellList from './components/cell-list/cell-list';

const App = () => {
  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
