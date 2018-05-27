// @flow

import type {BattleSceneAction} from "../../../../action/battle-scene";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state";
import {pushAttackButton} from "./push-attack-button";
import {startBattleScene} from "./start-battle-scene";

/**
 * 戦闘シーンアクションハンドラ
 *
 * @param action アクション
 * @param view 戦闘シーンのビュー
 * @param state 戦闘シーンの状態
 */
export function battleSceneActionHandler(action: BattleSceneAction, view: BattleSceneView, state: BattleSceneState): void {
  switch(action.type) {
    case 'pushAttackButton':
      return pushAttackButton(view, state, action);
    case 'startBattleScene':
      return startBattleScene(view, state, action);
    default:
      return;
  }
}