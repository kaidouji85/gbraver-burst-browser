import { BattleResult } from "gbraver-burst-core";

import { GenesisBraver } from "../../../../../../../game-object/armdozer/genesis-braver/genesis-braver";
import { BattleAnimationParamX } from "../../animation-param";

/**
 * ジェネシスブレイバー 戦闘アニメーション パラメータ
 * @template RESULT 戦闘結果
 */
export type GenesisBraverBattle<RESULT extends BattleResult> =
  BattleAnimationParamX<GenesisBraver, RESULT>;
