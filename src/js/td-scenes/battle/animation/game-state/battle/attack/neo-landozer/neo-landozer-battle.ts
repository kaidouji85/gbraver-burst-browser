import { BattleResult } from "gbraver-burst-core";

import { NeoLandozer } from "../../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import { BattleAnimationParamX } from "../../animation-param";

/**
 * ネオランドーザ 戦闘アニメーション パラメータ
 * @template RESULT 戦闘結果
 */
export type NeoLandozerBattle<RESULT extends BattleResult> =
  BattleAnimationParamX<NeoLandozer, RESULT>;
