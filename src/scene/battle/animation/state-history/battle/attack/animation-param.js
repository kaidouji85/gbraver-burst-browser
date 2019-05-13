// @flow

import type {PlayerState} from "gbraver-burst-core/lib/game-state/player-state";
import type {TDPlayer} from "../../../../view/td/player";
import type {HUDPlayer} from "../../../../view/hud/player";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import type {TDGameObjects} from "../../../../view/td/game-objects";
import type {HUDGameObjects} from "../../../../view/hud/game-objects";
import {overWriteTDSprite} from "../../../../view/td/player";

/**
 * 攻撃アニメーションパラメータ
 *
 * @type SPRITE 攻撃側スプライト
 * @type RESULT 戦闘結果
 */
export type AttackAnimationParam<SPRITE, RESULT> = {
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
 * 攻撃アニメーションパラメータの戦闘結果を引数の内容で上書きする
 * さらに、resultのデータ型を引数の内容に変更する
 *
 * @param param 上書き対象
 * @param result 上書きする戦闘結果
 * @return 上書き結果
 */
export function overWriteAttackAnimResult<S, OLD_RESULT, NEW_RESULT>(param: AttackAnimationParam<S, OLD_RESULT>, result: NEW_RESULT): AttackAnimationParam<S, NEW_RESULT> {
  const ignoreResult: $Diff<AttackAnimationParam<S, OLD_RESULT>, {result: OLD_RESULT}> = param;
  return {
    ...ignoreResult,
    result: result
  };
}

/**
 * 戦闘アニメーションパラメータのスプライトを引数の内容で上書きする
 *
 * @param param 上書き対象
 * @param result 上書きするスプライト
 * @return 上書き結果
 */
export function overWriteAttackerTD<OLD_SPRITE, NEW_SPRITE, R>(param: AttackAnimationParam<OLD_SPRITE, R>, sprite: NEW_SPRITE): AttackAnimationParam<NEW_SPRITE, R>{
  const ignoreAttackerTD: $Diff<AttackAnimationParam<OLD_SPRITE, R>, {attackerTD: TDPlayer<OLD_SPRITE>}> = param;
  const attackerTD = overWriteTDSprite(param.attackerTD, sprite);
  return {
    ...ignoreAttackerTD,
    attackerTD: attackerTD
  };
}