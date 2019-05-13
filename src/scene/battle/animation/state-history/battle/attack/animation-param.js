// @flow

import type {PlayerState} from "gbraver-burst-core/lib/game-state/player-state";
import type {TDPlayer} from "../../../../view/td/player";
import type {HUDPlayer} from "../../../../view/hud/player";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import type {TDGameObjects} from "../../../../view/td/game-objects";
import type {HUDGameObjects} from "../../../../view/hud/game-objects";

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
  return {
    attackerBattery: param.attackerBattery,
    attackerState: param.attackerState,
    attackerTD: param.attackerTD,
    attackerHUD: param.attackerHUD,
    defenderBattery: param.defenderBattery,
    defenderState: param.defenderState,
    defenderTD: param.defenderTD,
    defenderHUD: param.defenderHUD,
    tdObjects: param.tdObjects,
    hudObjects: param.hudObjects,
    result: result
  };
}