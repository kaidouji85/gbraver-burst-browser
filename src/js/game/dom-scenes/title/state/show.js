// @flow

import type {TitleState} from "./title-state";

/**
 * 本シーンを表示する
 *
 * @param state 更新前のステート
 * @return 更新結果
 */
export function show(state: TitleState): TitleState {
  return {
    ...state,
    isVisible: true,
  };
}