// @flow

import type {LoadingState} from "./loading-state";

/**
 * 本シーンを表示する
 *
 * @param state 変更前の状態
 * @return 変更後の状態
 */
export function show(state: LoadingState): LoadingState {
  return {
    ...state,
    isVisible: true
  };
}

/**
 * 本シーンを非表示にする
 *
 * @param state 変更前の状態
 * @return 変更後の状態
 */
export function hidden(state: LoadingState): LoadingState {
  return {
    ...state,
    isVisible: false
  };
}