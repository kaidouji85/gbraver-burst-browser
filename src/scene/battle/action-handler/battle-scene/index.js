// @flow

import type {BattleSceneAction} from "../../../../action/battle-scene";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state";
import {pushAttackButton} from "./push-attack-button";
import {startBattleScene} from "./start-battle-scene";
import type {ProgressBattle} from "../../progress-battle";
import {pushOkButton} from "./push-ok-button";

/**
 * 戦闘シーンアクションハンドラ
 *
 * @param action アクション
 * @param view 戦闘シーンのビュー
 * @param state 戦闘シーンの状態
 */
export function battleSceneActionHandler(action: BattleSceneAction, view: BattleSceneView, state: BattleSceneState, progressBattle: ProgressBattle): void {
  if (action.type === 'pushAttackButton') {
    pushAttackButton(view, state, action);
  }

  if (action.type === 'startBattleScene') {
    startBattleScene(view, state, action);
  }

  if (action.type === 'pushOkButton') {
    pushOkButton(view, state, progressBattle);
  }
}