import { Dispatch } from 'redux';
import { BundleActionType } from '../action-types';
import BaseBundler from './../../bundler';
import { BundleAction } from './../actions/bundle-actions';


export const createBundleAction = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<BundleAction>) => {
    dispatch({
      type: BundleActionType.BUNDLE_START,
      payload: { cellId }
    });

    const result = await BaseBundler(input);

    dispatch({
      type: BundleActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result
      }
    })
  }
}