import { Feint } from "gbraver-burst-core";

import { Animate } from "../../../../../../../animation/animate";
import { delay, empty } from "../../../../../../../animation/delay";
import { GenesisBraverBattle } from "./genesis-braver-battle";

/**
 * フェイント
 * @param param パラメータ
 * @returns アニメーション
 */
export function feint(param: GenesisBraverBattle<Feint>): Animate {
  if (!param.result.isDefenderMoved) {
    return empty();
  }

  return param.defenderSprite.avoid().chain(delay(500));
}
