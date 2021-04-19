import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { CellActionType } from './action-types';
import reducers from './reducers';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

store.dispatch({
  type: CellActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'text'
  }
})

store.dispatch({
  type: CellActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'text'
  }
})

store.dispatch({
  type: CellActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'code'
  }
})