import { CellActionType } from '../action-types';
import { UpdateCellAction, InsertCellAfterAction, DeleteCellAction, MoveCellAction, CellDirection } from '../actions';
import { CellTypes } from '../cell';


export const updateCellAction = (id: string, content: string): UpdateCellAction => ({
  type: CellActionType.UPDATE_CELL,
  payload: {
    id,
    content
  }
})

export const deleteCellAction = (id: string): DeleteCellAction => ({
  type: CellActionType.DELETE_CELL,
  payload: id
})

export const moveCellAction = (id: string, direction: CellDirection): MoveCellAction => ({
  type: CellActionType.MOVE_CELL,
  payload: {
    id,
    direction
  }
});

export const insertCellAfterAction = (id: string | null, type: CellTypes): InsertCellAfterAction => ({
  type: CellActionType.INSERT_CELL_AFTER,
  payload: {
    id,
    type
  }
})