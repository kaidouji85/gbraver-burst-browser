import type { CriticalHit, Guard, NormalHit } from "gbraver-burst-core";

import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { empty } from "../../../../../../animation/delay";
import type { ArmdozerSprite } from "../../../../../../game-object/armdozer/armdozer-sprite";
import type {
  BattleAnimationParam,
  BattleAnimationParamX,
} from "../animation-param";

/**
 * 数字表示だけをする戦闘アニメーション
 *
 * @param param パラメータ
 * @returns アニメーション
 */
export function emptyAttackAnimation(param: BattleAnimationParam): Animate {
  if (param.result.name === "NormalHit") {
    const result: NormalHit = param.result;
    return viewDamage({ ...param, result });
  }

  if (param.result.name === "CriticalHit") {
    const result: CriticalHit = param.result;
    return viewDamage({ ...param, result });
  }

  if (param.result.name === "Guard") {
    const result: Guard = param.result;
    return viewDamage({ ...param, result });
  }

  return empty();
}

/** viewDamageが受け取ることができる戦闘結果 */
type ViewDamageResult = NormalHit | CriticalHit | Guard;

/**
 * ダメージ数字だけを表示する
 *
 * @param param アニメーションパラメータ
 * @returns アニメーション
 */
function viewDamage(
  param: BattleAnimationParamX<ArmdozerSprite, ViewDamageResult>,
): Animate {
  return all(
    param.defenderTD.damageIndicator.popUp(param.result.damage),
    param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),
  );
}
