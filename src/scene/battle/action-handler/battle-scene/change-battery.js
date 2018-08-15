// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state";
import type {ChangeBattery} from "../../../../action/battle-scene/change-battery";

/**
 * バッテリーセレクタのバッテリーゲージが変更された場合の処理
 *
 * @param view ビュー
 * @param state 状態
 * @param action アクション
 */
export function changeBattery(view: BattleSceneView, state: BattleSceneState, action: ChangeBattery): void {
  console.log('changeBattery');
}