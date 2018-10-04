// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {DecideBattery} from "../../../../action/battle-scene/decide-battery";
import type {ProgressBattle} from "../../progress-battle/progress-battle";
import {stateHistoryAnimation} from "../../animation/state-history/index";
import {invisibleUI} from "../../animation/invisible-ui/invisible-u-i";
import {play} from "../../../../tween/multi-tween/play";

/** 攻撃バッテリーを決定した際のイベント */
export async function decideBattery(view: BattleSceneView, state: BattleSceneState, action: DecideBattery, progressBattle: ProgressBattle): Promise<void> {
  if (!state.canOperation) {
    return;
  }

  state.canOperation = false;
  await play(invisibleUI(view));
  const command = {
    type: 'BATTERY_COMMAND',
    battery: view.hudLayer.batterySelector.getBattery()
  };
  const gameState = await progressBattle(command);
  await play(stateHistoryAnimation(view, state, gameState));
  state.canOperation = true;
}
