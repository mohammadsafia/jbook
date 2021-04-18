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


const cellsReducer = (state: CellsState = initialState, action: CellAction): CellsState => {
  switch (action.type) {
    case CellActionType.UPDATE_CELL:
      return state;
    case CellActionType.DELETE_CELL:
      return state;
    case CellActionType.MOVE_CELL:
      return state;
    case CellActionType.INSERT_CELL_BEFORE:
      return state;
    default:
      return state;
  }
}

export default cellsReducer