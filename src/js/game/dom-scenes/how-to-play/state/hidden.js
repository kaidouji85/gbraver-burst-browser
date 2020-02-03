// @flow

import type {HowToPlayState} from "./how-to-play-state";

/**
 * シーンを非表示にする
 *
 * @param state 更新前のステート
 * @return 更新後のステート
 */
export function hidden(state: HowToPlayState): HowToPlayState {
  return {
    ...state,
    isVisible: false,
    canOperation: false
  };
}