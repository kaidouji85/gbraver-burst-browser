// @flow

import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import type {ArmdozerEffect} from "gbraver-burst-core";
import type {TDArmdozerObjects} from "../../../view/td/armdozer-objects/armdozer-objects";

/**
 * アームドーザ効果終了アニメーション パラメータ
 * 本タイプは引数、戻り値などに直接使ってはいけない
 *
 * @type SPRITE スプライト
 * @type TD_ARMDOZER 3Dレイヤーアームドーザ固有オブジェクト
 * @type EFFECT 終了したアームドーザ効果
 */
export type EndArmdozerEffectParamX<SPRITE: ArmDozerSprite, TD_ARMDOZER: TDArmdozerObjects, EFFECT> = {
  sprite: SPRITE,
  tdArmdozer: TD_ARMDOZER,
  endArmdozerEffect: ArmdozerEffect
};

/**
 * アームドーザ効果終了アニメーション パラメータ
 */
export type EndArmdozerEffectParam = EndArmdozerEffectParamX<ArmDozerSprite, TDArmdozerObjects, ArmdozerEffect>;