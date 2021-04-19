import produce from 'immer';
import { CellActionType } from '../action-types';
import { CellAction } from '../actions';
import { Cell } from '../cell';


interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell
  }
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {}
}


const cellsReducer = produce((state: CellsState, action: CellAction): CellsState => {
  switch (action.type) {
    case CellActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;

      return state;

    case CellActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter(id => id !== action.payload);

      return state;

    case CellActionType.MOVE_CELL:
      const { direction, id: cellId } = action.payload;
      const index = state.order.findIndex(id => id === cellId);

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      return state;

    case CellActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId(),
      }

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(id => id === action.payload.id);

      if (foundIndex < 0) {
        state.order.unshift(cell.id)
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id)
      }
      return state;
    default:
      return state;
  }
}, initialState);

const randomId = () => {
  return Math.random().toString(36).substr(2, 5)
}

export default cellsReducer