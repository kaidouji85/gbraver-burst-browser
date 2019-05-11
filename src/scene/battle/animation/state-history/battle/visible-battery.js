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
  const attackerTD = view.td.players.find(v => v.playerId === effect.attacker);
  const attackerHUD = view.hud.players.find(v => v.playerId === effect.attacker);
  const attackerState = gameState.players.find(v => v.playerId === effect.attacker);
  const defenderTD = view.td.players.find(v => v.playerId !== effect.attacker);
  const defenderHUD = view.hud.players.find(v => v.playerId !== effect.attacker);
  const defenderState = gameState.players.find(v => v.playerId !== effect.attacker);

  if (!attackerTD || !attackerHUD || !attackerState || !defenderTD || !defenderHUD || !defenderState) {
    return empty();
  }

  return all(
    attackerTD.batteryNumber.popUp(effect.attackerBattery),
    attackerHUD.gauge.battery(attackerState.armdozer.battery),
    defenderTD.batteryNumber.popUp(effect.defenderBattery),
    defenderHUD.gauge.battery(defenderState.armdozer.battery),
    delay(1200).chain(
      view.td.gameObjects.turnIndicator.invisible()
    )
  );

}