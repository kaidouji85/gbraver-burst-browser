// @flow

import type {PlayerId} from "gbraver-burst-core";
import type {BattleSceneState} from "./battle-scene-state";

/** 
 * 初期状態を生成する
 * 
 * @param playerId プレイヤーID
 * @param animationTimeScale アニメーションタイムスケール
 * @return 生成結果
 */
export function createInitialState(playerId: PlayerId, animationTimeScale: number): BattleSceneState {
  return {playerId, animationTimeScale};
}