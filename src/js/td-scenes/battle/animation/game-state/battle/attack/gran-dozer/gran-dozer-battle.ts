import { BattleResult } from "gbraver-burst-core";

import { GranDozer } from "../../../../../../../game-object/armdozer/gran-dozer/gran-dozer";
import { BattleAnimationParamX } from "../../animation-param";

/**
 * グランドーザ 戦闘アニメーション パラメータ
 * @template RESULT 戦闘結果
 */
export type GranDozerBattle<RESULT extends BattleResult> =
  BattleAnimationParamX<GranDozer, RESULT>;
