// @flow

import type {HowToPlayState} from "./how-to-play-state";

/**
 * 初期ステートを生成する
 * 
 * @return 初期ステート
 */
export function createInitialState(): HowToPlayState {
  return {
    isVisible: false,
    canOperation: false,
    page: 1,
    maxPage: 10,
  };
}
