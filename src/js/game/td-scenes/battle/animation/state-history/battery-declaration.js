// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core";
import {Animate} from "../../../../../animation/animate";
import {delay, empty} from "../../../../../animation/delay";
import type {BatteryDeclaration} from "gbraver-burst-core/lib/effect/battery-declaration/battery-declaration";
import {all} from "../../../../../animation/all";

/**
 * バッテリー宣言アニメーション
 *
 * @param view ビュー
 * @param sceneState シーンの状態
 * @param gameState ゲームの状態
 * @return アニメーション
 */
export function batteryDeclarationAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  if (gameState.effect.name !== 'BatteryDeclaration') {
    return empty();
  }

  const effect: BatteryDeclaration = gameState.effect;
  const attacker = gameState.players.find(v => v.playerId === gameState.activePlayerId);
  const defender = gameState.players.find(v => v.playerId !== gameState.activePlayerId);
  if (!attacker || !defender) {
    return empty();
  }

  const attackerTD = view.td.players.find(v => v.playerId === attacker.playerId);
  const defenderTD = view.td.players.find(v => v.playerId === defender.playerId);
  if (!attackerTD || !defenderTD) {
    return empty();
  }

  return all(
    all(
      attackerTD.batteryNumber.popUp(effect.attackerBattery),
      attackerTD.gauge.battery(attacker.armdozer.battery),
      defenderTD.batteryNumber.popUp(effect.defenderBattery),
      defenderTD.gauge.battery(defender.armdozer.battery),
    ),

    delay(1200).chain(
      view.td.gameObjects.turnIndicator.invisible()
    ).chain(delay(500))
  );
}