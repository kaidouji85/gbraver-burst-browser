// @flow

import {Animate} from "../../../../../animation/animate";
import {delay, empty} from "../../../../../animation/delay";
import {all} from "../../../../../animation/all";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";

/** 攻撃、防御側のバッテリーを表示する */
export function visibleBattery(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  if (gameState.effect.name !== 'Battle') {
    return empty();
  }

  const effect: Battle = gameState.effect;
  const attackerArmdozer = view.td.armdozers.find(v => v.playerId === effect.attacker);
  const attackerHUD = view.hud.indicators.find(v => v.playerId === effect.attacker);
  const attackerState = gameState.players.find(v => v.playerId === effect.attacker);
  const defenderArmdozer = view.td.armdozers.find(v => v.playerId !== effect.attacker);
  const defenderHUD = view.hud.indicators.find(v => v.playerId !== effect.attacker);
  const defenderState = gameState.players.find(v => v.playerId !== effect.attacker);

  if (!attackerArmdozer || !attackerHUD || !attackerState || !defenderArmdozer || !defenderHUD || !defenderState) {
    return empty();
  }

  return all(
    attackerArmdozer.batteryNumber.popUp(effect.attackerBattery),
    attackerHUD.gauge.battery(attackerState.armdozer.battery),
    defenderArmdozer.batteryNumber.popUp(effect.defenderBattery),
    defenderHUD.gauge.battery(defenderState.armdozer.battery),
    delay(1200).chain(
      view.td.turnIndicator.invisible()
    )
  );

}