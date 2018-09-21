// @flow

import type {BattleSceneState} from "../../state/battle-scene-state";
import {BattleSceneView} from "../../view";
import type {StartBattleScene} from "../../../../action/battle-scene/start-battle-scene";
import {stateHistoryAnimation} from '../../animation/state-history/index';
import {play} from "../../../../tween/multi-tween/play";

/**
 * 戦闘シーン開始
 *
 * @param view ビュー
 * @param state 状態
 */
export async function startBattleScene(view: BattleSceneView, state: BattleSceneState, action: StartBattleScene): Promise<void> {
  await play(stateHistoryAnimation(view, state, action.initialState));
}