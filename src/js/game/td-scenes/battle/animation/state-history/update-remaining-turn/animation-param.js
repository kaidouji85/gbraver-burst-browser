// @flow

import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import type {TDArmdozer} from "../../../view/td/armdozer";
import type {ArmdozerEffect} from "gbraver-burst-core/lib/state/armdozer-effect";

/**
 * アームドーザ効果終了アニメーション パラメータ
 * 本タイプは引数、戻り値などに直接使ってはいけない
 *
 * @type SPRITE スプライト
 * @type TD_ARMDOZER 3Dレイヤーアームドーザ固有オブジェクト
 * @type EFFECT 終了したアームドーザ効果
 */
export type EndArmdozerAnimationParamX<SPRITE: ArmDozerSprite, TD_ARMDOZER: TDArmdozer, EFFECT> = {
  sprite: SPRITE,
  tdArmdozer: TD_ARMDOZER,
  endArmdozerEffect: ArmdozerEffect
};

/**
 * アームドーザ効果終了アニメーション パラメータ
 */
export type EndArmdozerAnimationParam = EndArmdozerAnimationParamX<ArmDozerSprite, TDArmdozer, ArmdozerEffect>;