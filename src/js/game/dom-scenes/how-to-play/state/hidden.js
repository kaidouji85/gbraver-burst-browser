// @flow

import type {HowToPlayState} from "./how-to-play-state";

/**
 * シーン非表示
 *
 * @param state 変更前ステート
 * @return 変更後ステート
 */
export function hidden(state: HowToPlayState): HowToPlayState {
  return {
    ...state,
    isVisible: false
  };
}