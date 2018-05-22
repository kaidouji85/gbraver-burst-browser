// @flow

import type {BattleSceneState} from "../../state";
import {BattleSceneView} from "../../view";
import type {StartBattleScene} from "../../../../action/battle-scene/start-battle-scene";
import {animation} from '../../animation';

/**
 * 戦闘シーン開始
 *
 * @param view ビュー
 * @param state 状態
 */
export function startBattleScene(view: BattleSceneView, state: BattleSceneState, action: StartBattleScene): void {
  animation(action.initialState);
}