// @flow

import type {TitleState} from "./title-state";

/**
 * 本シーンを非表示にする
 *
 * @param state 変更前のステート
 * @return 更新結果
 */
export function hidden(state: TitleState): TitleState {
  return {
    ...state,
    isVisible: false,
    canOperation: false,
  };
}