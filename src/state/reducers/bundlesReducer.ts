import produce from 'immer';
import { BundleActionType } from '../action-types';
import { BundleAction } from '../actions';


interface BundleState {
  [key: string]: {
    loading: boolean;
    code: string;
    err: string
  } | undefined;
}


const initialState: BundleState = {};

const bundleReducer = produce((state: BundleState, action: BundleAction): BundleState => {
  switch (action.type) {
    case BundleActionType.BUNDLE_START:
      state[action.payload.cellId] = {
        loading: true,
        code: '',
        err: ''
      }
      return state;
    case BundleActionType.BUNDLE_COMPLETE:
      state[action.payload.cellId] = {
        loading: false,
        code: action.payload.bundle.code,
        err: action.payload.bundle.err
      }
      return state;
    default:
      return state;
  }
}, initialState);


export default bundleReducer