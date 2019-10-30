// @flow

import type {TitleState} from "./title-state";

/**
 * 画面タッチ時のイベント
 *
 * @param state 更新前ステート
 * @return 更新後ステート
 */
export function onTouch(state: TitleState): TitleState {
  return {
    ...state,
    isVisible: false,
    canOperation: false
  };
}