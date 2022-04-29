// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {BatteryDeclaration, GameStateX} from "gbraver-burst-core";
import {Animate} from "../../../../../animation/animate";
import {delay, empty} from "../../../../../animation/delay";
import {all} from "../../../../../animation/all";
import {BattleSceneSounds} from "../../sounds/sounds";
import {process} from '../../../../../animation/process';
import type {TDPlayer} from "../../view/td/player";

/**
 * バッテリー宣言アニメーション
 *
 * @param td 3Dレイヤーのプレイヤーオブジェクト
 * @param value バッテリー値
 * @return アニメーション
 */
function declaration(td: TDPlayer, value: number): Animate {
  return td.batteryNumber.show(value)
    .chain(delay(800));
}

/**
 * バッテリー宣言の効果音
 * プレイヤー、敵側で同時再生したくないので、
 * declarationとは別関数に切り出している
 *
 * @param sounds 効果音
 * @return アニメーション
 */
function declarationSound(sounds: BattleSceneSounds): Animate {
  return process(() => {
    sounds.batteryDeclaration.play();
  });
}

/**
 * 補正ありのバッテリー宣言
 *
 * @param td 3Dレイヤーのプレイヤーオブジェクト
 * @param origin 本来のバッテリー
 * @param correct バッテリー補正値
 * @param value 出したバッテリー
 * @return アニメーション
 */
function declarationWithCorrect(td: TDPlayer, origin: number, correct: number, value: number): Animate {
  return td.batteryNumber.show(origin)
    .chain(delay(300))
    .chain(all(
      td.batteryNumber.change(value),
      td.batteryCorrect.popUp(correct)
    )).chain(delay(200));
}

/**
 * バッテリー補正ありの場合の効果音
 * declarationWithCorrectとタイミングを合わせている
 *
 * @param sounds 効果音
 * @return アニメーション
 */
function declarationSoundWithCorrect(sounds: BattleSceneSounds): Animate {
  return process(() => {
    sounds.batteryDeclaration.play();
  })
    .chain(delay(600))
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
    ? declarationWithCorrect(attackerTD, originalBatteryOfAttacker, attackerCorrect, attackerBattery)
    : declaration(attackerTD, attackerBattery);
  const defenderCorrect = defenderBattery - originalBatteryOfDefender;
  const defenderDeclaration = defenderCorrect !== 0
    ? declarationWithCorrect(defenderTD, originalBatteryOfDefender, defenderCorrect, defenderBattery)
    : declaration(defenderTD, defenderBattery);
  const sound = (attackerCorrect !== 0) || (defenderCorrect !== 0)
    ? declarationSoundWithCorrect(sounds)
    : declarationSound(sounds);

  return all(
    sound,
    view.td.gameObjects.turnIndicator.turnChange(isAttacker),
    attackerHUD.gauge.battery(attacker.armdozer.battery),
    attackerDeclaration,
    defenderHUD.gauge.battery(defender.armdozer.battery),
    defenderDeclaration,
  ).chain(
    delay(0),
    attackerTD.batteryNumber.hidden(),
    defenderTD.batteryNumber.hidden(),
    view.td.gameObjects.turnIndicator.invisible()
  );
}