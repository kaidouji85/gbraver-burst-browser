import { BattleResult } from "gbraver-burst-core";

import { Animate } from "../../../../../../../animation/animate";
import { empty } from "../../../../../../../animation/delay";
import { GranDozerBattle } from "./gran-dozer-battle";

/**
 * グランドーザ 攻撃アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function granDozerAttack(
  param: GranDozerBattle<BattleResult>,
): Animate {
  const { result } = param;
  switch (result.name) {
    default:
      return empty();
  }
}
