// @flow

import type {HowToPlayState} from "./how-to-play-state";

/**
 * シーンを表示する
 *
 * @param state 変更前の状態
 * @return 変更後の状態
 */
export function show(state: HowToPlayState): HowToPlayState {
  return {
    ...state,
    page: 1,
    isVisible: true,
    canOperation: true
  };
}