// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {BatteryDeclaration, GameStateX} from "gbraver-burst-core";
import {Animate} from "../../../../../animation/animate";
import {delay, empty} from "../../../../../animation/delay";
import {all} from "../../../../../animation/all";
import {BattleSceneSounds} from "../../sounds";
import {process} from '../../../../../animation/process';
import {BatteryNumber} from "../../../../../game-object/battery-number/battery-number";
import {BatteryCorrect} from "../../../../../game-object/battery-correct/battery-correct";

/**
 * 補正ありのバッテリー宣言
 *
 * @param batteryNumber バッテリー数値スプライト
 * @param batteryCorrect バッテリー補正スプライト
 * @param origin 本来のバッテリー
 * @param correct バッテリー補正値
 * @param value 出したバッテリー
 * @return アニメーション
 */
function declarationWithCorrect(batteryNumber: BatteryNumber, batteryCorrect: BatteryCorrect, origin: number, correct: number, value: number): Animate {
  return all(
    batteryNumber.show(origin),
    batteryCorrect.show(correct)
  )
    .chain(delay(500))
    .chain(all(
      batteryNumber.hidden(),
      batteryCorrect.hidden()
    ))
    .chain(batteryNumber.show(value));
}

/**
 * バッテリー補正ありの場合の効果音
 * declarationWithCorrectとタイミングを合わせている
 *
 * @param sounds 効果音
 * @return アニメーション
 */
function soundWithCorrect(sounds: BattleSceneSounds): Animate {
  return process(() => {
    sounds.batteryDeclaration.play();
  })
    .chain(delay(800))
    .chain(process(()=> {
      sounds.batteryDeclaration.play();
    }))
}

/**
 * バッテリー宣言アニメーション
 *
 * @param view ビュー
 * @param sounds 戦闘シーン効果音
 * @param sceneState シーンの状態
 * @param gameState ゲームの状態
 * @return アニメーション
 */
export function batteryDeclarationAnimation(view: BattleSceneView, sounds: BattleSceneSounds, sceneState: BattleSceneState, gameState: GameStateX<BatteryDeclaration>): Animate {
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

  const isAttacker = gameState.effect.attacker === sceneState.playerId;
  const {attackerBattery, originalBatteryOfAttacker, defenderBattery, originalBatteryOfDefender} = gameState.effect;
  const attackerCorrect = attackerBattery - originalBatteryOfAttacker;
  const attackerDeclaration = attackerCorrect !== 0
    ? declarationWithCorrect(attackerTD.batteryNumber, attackerTD.batteryCorrect, originalBatteryOfAttacker, attackerCorrect, attackerBattery)
    : attackerTD.batteryNumber.show(attackerBattery);
  const defenderCorrect = defenderBattery - originalBatteryOfDefender;
  const defenderDeclaration = defenderCorrect !== 0
    ? declarationWithCorrect(defenderTD.batteryNumber, defenderTD.batteryCorrect, originalBatteryOfDefender, defenderCorrect, defenderBattery)
    : defenderTD.batteryNumber.show(defenderBattery);
  const sound = (attackerCorrect !== 0) || (defenderCorrect !== 0)
    ? soundWithCorrect(sounds)
    : process(() => {
      sounds.batteryDeclaration.play();
    });

  return all(
    sound,
    view.td.gameObjects.turnIndicator.turnChange(isAttacker),
    attackerHUD.gauge.battery(attacker.armdozer.battery),
    attackerDeclaration,
    defenderHUD.gauge.battery(defender.armdozer.battery),
    defenderDeclaration,
  )
    .chain(delay(1000))
    .chain(all(
      attackerTD.batteryNumber.hidden(),
      defenderTD.batteryNumber.hidden(),
      view.td.gameObjects.turnIndicator.invisible(),
    ))
    .chain(delay(500));
}