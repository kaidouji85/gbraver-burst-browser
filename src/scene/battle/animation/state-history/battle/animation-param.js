// @flow

import type {PlayerState} from "gbraver-burst-core/lib/game-state/player-state";
import type {TDPlayer} from "../../../view/td/player";
import type {HUDPlayer} from "../../../view/hud/player";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";
import type {TDGameObjects} from "../../../view/td/game-objects";
import type {HUDGameObjects} from "../../../view/hud/game-objects";
import {overWriteTDSprite} from "../../../view/td/player";

/**
 * 戦闘アニメーション共通で使うパラメータ
 * 各種オブジェクトを攻撃側、防御側に振り分けている
 *
 * @type SPRITE 攻撃側スプライト
 * @type RESULT 戦闘結果
 */
export type BattleAnimationParam<SPRITE, RESULT> = {
  attackerBattery: number,
  attackerState: PlayerState,
  attackerTD: TDPlayer<SPRITE>,
  attackerHUD: HUDPlayer,
  defenderBattery: number,
  defenderState: PlayerState,
  defenderTD: TDPlayer<ArmDozerSprite>,
  defenderHUD: HUDPlayer,
  tdObjects: TDGameObjects,
  hudObjects: HUDGameObjects,
  result: RESULT
};

/**
 * 戦闘アニメーションパラメータの戦闘結果を引数の内容で上書きする
 * さらに、resultのデータ型を引数の内容に変更する
 *
 * @param param 上書き対象
 * @param result 上書きする戦闘結果
 * @return 上書き結果
 */
export function overWriteResult<SPRITE, OLD_RESULT, NEW_RESULT>(
  param: BattleAnimationParam<SPRITE, OLD_RESULT>,
  result: NEW_RESULT
): BattleAnimationParam<SPRITE, NEW_RESULT> {
  const ignoreResult: $Diff<BattleAnimationParam<SPRITE, OLD_RESULT>, { result: OLD_RESULT }> = param;
  return {
    ...ignoreResult,
    result: result
  };
}

/**
 * 戦闘アニメーションパラメータのスプライトを引数の内容で上書きする
 *
 * @param param 上書き対象
 * @param sprite 上書きするスプライト
 * @return 上書き結果
 */
export function overWriteAttackerTD<OLD_SPRITE, NEW_SPRITE, RESULT>(
  param: BattleAnimationParam<OLD_SPRITE, RESULT>,
  sprite: NEW_SPRITE
): BattleAnimationParam<NEW_SPRITE, RESULT> {
  const ignoreAttackerTD: $Diff<BattleAnimationParam<OLD_SPRITE, RESULT>, { attackerTD: TDPlayer<OLD_SPRITE> }> = param;
  const attackerTD = overWriteTDSprite(param.attackerTD, sprite);
  return {
    ...ignoreAttackerTD,
    attackerTD: attackerTD
  };
}