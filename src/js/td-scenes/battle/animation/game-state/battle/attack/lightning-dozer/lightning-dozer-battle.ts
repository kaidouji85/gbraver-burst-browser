import { BattleResult } from "gbraver-burst-core";

import { LightningDozer } from "../../../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import { BattleAnimationParamX } from "../../animation-param";

/**
 * ライトニングドーザ 戦闘アニメーション パラメータ
 * @template RESULT 戦闘結果
 */
export type LightningDozerBattle<RESULT extends BattleResult> =
  BattleAnimationParamX<LightningDozer, RESULT>;
