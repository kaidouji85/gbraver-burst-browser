import type { CriticalHit, Guard, NormalHit } from "gbraver-burst-core";

import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { empty } from "../../../../../../animation/delay";
import type { ArmDozerSprite } from "../../../../../../game-object/armdozer/armdozer-sprite";
import type { BattleAnimationParam, BattleAnimationParamX } from "../animation-param";

/**
 * 数字表示だけをする戦闘アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function emptyAttackAnimation(param: BattleAnimationParam): Animate {
  if (param.result.name === "NormalHit") {
    const result = (param.result as NormalHit);
    return viewDamage({ ...param,
      result
    });
  }

  if (param.result.name === "CriticalHit") {
    const result = (param.result as CriticalHit);
    return viewDamage({ ...param,
      result
    });
  }

  if (param.result.name === "Guard") {
    const result = (param.result as Guard);
    return viewDamage({ ...param,
      result
    });
  }

  return empty();
}

/** viewDamageが受け取ることができる戦闘結果 */
type ViewDamageResult = NormalHit | CriticalHit | Guard;

/**
 * ダメージ数字だけを表示する
 *
 * @param param アニメーションパラメータ
 * @return アニメーション
 */
function viewDamage(param: BattleAnimationParamX<ArmDozerSprite, ViewDamageResult>): Animate {
  return all(param.defenderTD.damageIndicator.popUp(param.result.damage), param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp));
}