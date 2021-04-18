import { CellActionType } from '../action-types';


export interface MoveCellAction {
  type: CellActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: 'up' | 'down';
  }
}

export interface DeleteCellAction {
  type: CellActionType.DELETE_CELL;
  payload: string;
}

export interface InsertCellBeforeAction {
  type: CellActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    type: 'code' | 'text';
  }
}

export interface UpdateCellAction {
  type: CellActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string
  }
}


export type CellAction = MoveCellAction | DeleteCellAction | InsertCellBeforeAction | UpdateCellAction