// @flow

import type {TitleState} from "./title-state";

/**
 * 初期状態を生成する
 *
 * @return 初期状態
 */
export function createInitialState(): TitleState {
  return {
    canOperation: true
  };
}