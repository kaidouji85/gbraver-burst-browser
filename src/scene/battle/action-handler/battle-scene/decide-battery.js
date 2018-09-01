// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state";
import type {DecideBattery} from "../../../../action/battle-scene/decide-battery";
import type {ProgressBattle} from "../../progress-battle";
import {battleAnimation} from "../../animation";

export async function decideBattery(view: BattleSceneView, state: BattleSceneState, action: DecideBattery, progressBattle: ProgressBattle): Promise<void> {
  const command = {
    type: 'BATTERY_COMMAND',
    battery: view.hudLayer.batterySelector.getBattery()
  };
  const gameState = await progressBattle(command);
  console.log(command);// TODO テストが終わったら消す
  console.log(gameState); // TODO テストが終わったら消す

  battleAnimation(view, state, gameState);
}