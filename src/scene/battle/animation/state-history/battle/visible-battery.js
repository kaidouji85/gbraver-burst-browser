// @flow

import {Animate} from "../../../../../animation/animate";
import {delay, empty} from "../../../../../animation/delay";
import type {BattleAnimationObjects} from "./animation-objects";
import {all} from "../../../../../animation/all";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";
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
  const armdozers = [view.td.player, view.td.enemy];
  const attackerArmdozer = armdozers.find(v => v.playerId === effect.attacker);
  const attackerState = gameState.players.find(v => v.playerId === effect.attacker);
  const defenderArmdozer = armdozers.find(v => v.playerId !== effect.attacker);
  const defenderState = gameState.players.find(v => v.playerId !== effect.attacker);

  if (!attackerArmdozer || !attackerState || !defenderArmdozer || !defenderState) {
    return empty();
  }

  return all(
    attackerArmdozer.batteryNumber.popUp(effect.attackerBattery),
    attackerArmdozer.gauge.battery(attackerState.armdozer.battery),
    defenderArmdozer.batteryNumber.popUp(effect.defenderBattery),
    defenderArmdozer.gauge.battery(defenderState.armdozer.battery),
    delay(1200).chain(
      view.td.turnIndicator.invisible()
    )
  );

}