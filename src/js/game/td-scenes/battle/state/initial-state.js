// @flow

import type {BattleSceneState} from "./battle-scene-state";
import type {PlayerId} from "gbraver-burst-core";

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