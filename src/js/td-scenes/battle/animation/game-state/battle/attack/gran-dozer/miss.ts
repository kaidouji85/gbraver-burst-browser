import { Miss } from "gbraver-burst-core";

import { all } from "../../../../../../../animation/all";
import { Animate } from "../../../../../../../animation/animate";
import { delay } from "../../../../../../../animation/delay";
import { GranDozerBattle } from "./gran-dozer-battle";

/**
 * ミス
 * @param param パラメータ
 * @returns アニメーション
 */
export function miss(param: GranDozerBattle<Miss>): Animate {
  return param.attackerSprite
    .charge()
    .chain(delay(500))
    .chain(
      all(
        param.attackerSprite.tackle(),
        delay(100).chain(param.defenderSprite.avoid().chain(delay(500))),
      ),
    )
    .chain(param.attackerSprite.tackleToStand())
    .chain(delay(500));
}
