// @flow

import type {Battle, BattleResult, GameState, PlayerState} from "gbraver-burst-core";
import type {TDPlayer} from "../../../view/td/player";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import type {TDGameObjects} from "../../../view/td/game-objects";
import type {HUDGameObjects} from "../../../view/hud/game-objects";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import {TDCamera} from "../../../../../../game-object/camera/td";
import {PlainHUDCamera} from "../../../../../../game-object/camera/plain-hud";

/**
 * 戦闘アニメーション共通で使うパラメータ
 * 各種オブジェクトを攻撃側、防御側に振り分けている
 *
 * @type SPRITE 攻撃側スプライト
 * @type RESULT 戦闘結果
 */
export type BattleAnimationParam<SPRITE: ArmDozerSprite, RESULT: BattleResult> = {
  attackerBattery: number,
  attackerState: PlayerState,
  attackerTD: TDPlayer<SPRITE>,
  defenderBattery: number,
  defenderState: PlayerState,
  defenderTD: TDPlayer<ArmDozerSprite>,
  tdObjects: TDGameObjects,
  tdCamera: TDCamera,
  hudObjects: HUDGameObjects,
  hudCamera: PlainHUDCamera,
  isDeath: boolean,
  result: RESULT
};

/**
 * 各種オブジェクトから戦闘アニメパラメータを生成する
 *
 * @param view ビュー
 * @param sceneState 戦闘画面のステート
 * @param gameState ゲームステート
 * @return 戦闘アニメパラメータ
 */
export function toBattleAnimationParam(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): ?BattleAnimationParam<ArmDozerSprite, BattleResult> {
  if (gameState.effect.name !== 'Battle') {
    return null;
  }

  const effect: Battle = gameState.effect;
  const attackerState = gameState.players.find(v => v.playerId === effect.attacker);
  const attackerTD = view.td.players.find(v => v.playerId === effect.attacker);
  const defenderState = gameState.players.find(v => v.playerId !== effect.attacker);
  const defenderTD = view.td.players.find(v => v.playerId !== effect.attacker);
  if (!attackerState || !attackerTD || !defenderState || !defenderTD) {
    return null;
  }

  return {
    attackerBattery: 1, // TODO 削除する
    attackerState: attackerState,
    attackerTD: attackerTD,
    defenderBattery: 1, // TODO 削除する
    defenderState: defenderState,
    defenderTD: defenderTD,
    tdObjects: view.td.gameObjects,
    tdCamera: view.td.camera,
    hudObjects: view.hud.gameObjects,
    hudCamera: view.hud.camera,
    isDeath: effect.isDeath,
    result: effect.result,
  };
}
