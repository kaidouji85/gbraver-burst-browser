// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {BatteryDeclaration, GameState} from "gbraver-burst-core";
import {Animate} from "../../../../../animation/animate";
import {delay, empty} from "../../../../../animation/delay";
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
  const attackerHUD = view.hud.playres.find(v => v.playerId === attacker.playerId);
  const defenderTD = view.td.players.find(v => v.playerId === defender.playerId);
  const defenderHUD = view.hud.playres.find(v => v.playerId === defender.playerId);
  if (!attackerTD || !attackerHUD || !defenderTD || !defenderHUD) {
    return empty();
  }

  const isAttacker = effect.attacker === sceneState.playerId;
  return all(
    all(
      view.td.gameObjects.turnIndicator.turnChange(isAttacker),
      attackerTD.batteryNumber.popUp(effect.attackerBattery),
      attackerHUD.gauge.battery(attacker.armdozer.battery),
      defenderTD.batteryNumber.popUp(effect.defenderBattery),
      defenderHUD.gauge.battery(defender.armdozer.battery),
    ),

    delay(1200).chain(
      view.td.gameObjects.turnIndicator.invisible()
    ).chain(delay(500))
  );
}