// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {DecideBattery} from "../../../../action/battle-scene/decide-battery";
import type {ProgressBattle} from "../../progress-battle/progress-battle";
import {stateHistoryAnimation} from "../../animation/state-history/index";
import {closeUI} from "../../animation/close-ui/close-ui";
import {play} from "../../../../tween/multi-tween/play";

/** 攻撃バッテリーを決定した際のイベント */
export async function decideBattery(view: BattleSceneView, state: BattleSceneState, action: DecideBattery, progressBattle: ProgressBattle): Promise<void> {
  await play(closeUI(view));

  const command = {
    type: 'BATTERY_COMMAND',
    battery: view.hudLayer.batterySelector.getBattery()
  };
  const gameState = await progressBattle(command);
  console.log(command);// TODO テストが終わったら消す
  console.log(gameState); // TODO テストが終わったら消す

  await play(stateHistoryAnimation(view, state, gameState));
}

