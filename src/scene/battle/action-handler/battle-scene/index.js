// @flow

import type {BattleSceneAction} from "../../../../action/battle-scene/index";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state";
import {startBattleScene} from "./start-battle-scene";
import type {ProgressBattle} from "../../progress-battle";
import {changeBattery} from "./change-battery";

/**
 * 戦闘シーンアクションハンドラ
 *
 * @param action アクション
 * @param view 戦闘シーンのビュー
 * @param state 戦闘シーンの状態
 */
export function battleSceneActionHandler(action: BattleSceneAction, view: BattleSceneView, state: BattleSceneState, progressBattle: ProgressBattle): void {
  switch (action.type) {
    case 'startBattleScene':
      startBattleScene(view, state, action);
      return;
    case 'changeBattery':
      changeBattery(view, state, action);
      return;
    default:
      return;
  }
}