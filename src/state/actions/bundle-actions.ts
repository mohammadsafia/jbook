import { BundleActionType } from "../action-types";

export interface BundleStartAction {
  type: BundleActionType.BUNDLE_START;
  payload: {
    cellId: string;
  }
}

export interface BundleCompleteAction {
  type: BundleActionType.BUNDLE_COMPLETE,
  payload: {
    cellId: string;
    bundle: {
      code: string,
      err: string
    }
  }
}

export type BundleAction = BundleStartAction | BundleCompleteAction