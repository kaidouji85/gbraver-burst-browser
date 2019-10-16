// @flow

import type {PlayerState} from "gbraver-burst-core/lib/game-state/player-state";
import type {TDPlayer} from "../../../view/td/player";
import {overWriteTDSprite} from "../../../view/td/player";
import type {HUDPlayer} from "../../../view/hud/player";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import type {TDGameObjects} from "../../../view/td/game-objects";
import type {HUDGameObjects} from "../../../view/hud/game-objects";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {BattleResult} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/battle";
import {Battle3DCamera} from "../../../../../../game-object/camera/battle-3d";
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
  attackerHUD: HUDPlayer,
  defenderBattery: number,
  defenderState: PlayerState,
  defenderTD: TDPlayer<ArmDozerSprite>,
  defenderHUD: HUDPlayer,
  tdObjects: TDGameObjects,
  tdCamera: Battle3DCamera,
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
  const attackerHUD = view.hud.players.find(v => v.playerId === effect.attacker);
  const defenderState = gameState.players.find(v => v.playerId !== effect.attacker);
  const defenderTD = view.td.players.find(v => v.playerId !== effect.attacker);
  const defenderHUD = view.hud.players.find(v => v.playerId !== effect.attacker);
  if (!attackerState || !attackerTD || !attackerHUD || !defenderState || !defenderTD || !defenderHUD) {
    return null;
  }

  return {
    attackerBattery: effect.attackerBattery,
    attackerState: attackerState,
    attackerTD: attackerTD,
    attackerHUD: attackerHUD,
    defenderBattery: effect.defenderBattery,
    defenderState: defenderState,
    defenderTD: defenderTD,
    defenderHUD: defenderHUD,
    tdObjects: view.td.gameObjects,
    tdCamera: view.td.camera,
    hudObjects: view.hud.gameObjects,
    hudCamera: view.hud.camera,
    isDeath: effect.isDeath,
    result: effect.result,
  };
}

/**
 * 戦闘アニメーションパラメータの戦闘結果を引数の内容で上書きする
 * さらに、resultのデータ型を引数の内容に変更する
 *
 * @param param 上書き対象
 * @param result 上書きする戦闘結果
 * @return 上書き結果
 */
export function overWriteResult<SPRITE: ArmDozerSprite, OLD_RESULT: BattleResult, NEW_RESULT: BattleResult>(
  param: BattleAnimationParam<SPRITE, OLD_RESULT>,
  result: NEW_RESULT
): BattleAnimationParam<SPRITE, NEW_RESULT> {
  const ignoreResult: $Diff<BattleAnimationParam<SPRITE, OLD_RESULT>, { result: OLD_RESULT }> = param;
  return {
    ...ignoreResult,
    result: result
  };
}
