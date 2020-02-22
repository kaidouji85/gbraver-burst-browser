// @flow

import type {HowToPlayState} from "./how-to-play-state";

/**
 * 本ダイアログを表示する
 *
 * @param state 変更前の状態
 * @return 変更後の状態
 */
export function show(state: HowToPlayState): HowToPlayState {
  return {
    ...state,
    isVisible: true
  };
}