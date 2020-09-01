// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {BatteryDeclaration, GameState} from "gbraver-burst-core";
import {Animate} from "../../../../../animation/animate";
import {delay, empty} from "../../../../../animation/delay";
import {all} from "../../../../../animation/all";
import {BattleSceneSounds} from "../../sounds";
import {process} from '../../../../../animation/process';

/**
 * バッテリー宣言アニメーション
 *
 * @param view ビュー
 * @param sounds 戦闘シーン効果音
 * @param sceneState シーンの状態
 * @param gameState ゲームの状態
 * @return アニメーション
 */
export function batteryDeclarationAnimation(view: BattleSceneView, sounds: BattleSceneSounds, sceneState: BattleSceneState, gameState: GameState): Animate {
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
  const attackerHUD = view.hud.players.find(v => v.playerId === attacker.playerId);
  const defenderTD = view.td.players.find(v => v.playerId === defender.playerId);
  const defenderHUD = view.hud.players.find(v => v.playerId === defender.playerId);
  if (!attackerTD || !attackerHUD || !defenderTD || !defenderHUD) {
    return empty();
  }

  const isAttacker = effect.attacker === sceneState.playerId;
  return all(
    view.td.gameObjects.turnIndicator.turnChange(isAttacker),
    attackerHUD.gauge.battery(attacker.armdozer.battery),
    attackerTD.batteryNumber.show(effect.attackerBattery),
    defenderHUD.gauge.battery(defender.armdozer.battery),
    defenderTD.batteryNumber.show(effect.defenderBattery),
  )
    .chain(process(() => {
      sounds.benefitEffect.play();
    }))
    .chain(delay(1000))
    .chain(all(
      attackerTD.batteryNumber.hidden(),
      defenderTD.batteryNumber.hidden(),
      view.td.gameObjects.turnIndicator.invisible(),
    ))
    .chain(delay(500));
}