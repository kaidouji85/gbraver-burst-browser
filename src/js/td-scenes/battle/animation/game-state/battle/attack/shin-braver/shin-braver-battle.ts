import { BattleResult } from "gbraver-burst-core";

import { ShinBraver } from "../../../../../../../game-object/armdozer/shin-braver/shin-braver";
import { BattleAnimationParamX } from "../../animation-param";

/**
 * シンブレイバー 戦闘アニメーション パラメータ
 * @template RESULT 戦闘結果
 */
export type ShinBraverBattle<RESULT extends BattleResult> =
  BattleAnimationParamX<ShinBraver, RESULT>;
