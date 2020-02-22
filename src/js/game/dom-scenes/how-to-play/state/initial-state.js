// @flow

import type {HowToPlayState} from "./how-to-play-state";

/**
 * 初期状態を生成する
 *
 * @return 初期状態
 */
export function createInitialState(): HowToPlayState {
  return {
    isVisible: true
  };
}