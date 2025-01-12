import { BattleResult } from "gbraver-burst-core";

import { WingDozer } from "../../../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import { BattleAnimationParamX } from "../../animation-param";

/**
 * ウィングドーザ 戦闘アニメーション パラメータ
 * @type Result 戦闘結果
 */
export type WingDozerBattle<Result extends BattleResult> =
  BattleAnimationParamX<WingDozer, Result>;
