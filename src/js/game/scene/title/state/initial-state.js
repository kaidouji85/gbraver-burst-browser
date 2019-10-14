// @flow

import type {TitleSceneState} from "./title-scene-state";

/**
 * タイトルシーンステートを生成する
 *
 * @return タイトルシーンステート
 */
export function createInitialState(): TitleSceneState {
  return {
    canOperation: true
  };
}
