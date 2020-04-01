// @flow

import {LightningDozer} from "../../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import type {EndArmdozerEffectParam, EndArmdozerEffectParamX} from "./animation-param";
import {LightningDozerTD} from "../../../view/td/armdozer/lightning-dozer";
import type {ArmdozerEffect, TryReflect} from "gbraver-burst-core";
import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";

/**
 * ライトニングドーザ アームドーザ効果終了パラメータ
 *
 * @type EFFECT アームドーザ効果
 */
export type LightningDozerEndArmdozerEffect<EFFECT> = EndArmdozerEffectParamX<LightningDozer, LightningDozerTD, EFFECT>;

/**
 * ライトニングドーザ アームドーザ効果終了パラメータに変換する
 * 変換できない場合はnullを返す
 *
 * @param param
 * @return 変換結果
 */
export function toLightningDozerEndArmdozerEffect(param: EndArmdozerEffectParam): ?LightningDozerEndArmdozerEffect<ArmdozerEffect> {
  if ((param.sprite instanceof LightningDozer) && (param.tdArmdozer instanceof LightningDozerTD)) {
    const sprite: LightningDozer = param.sprite;
    const tdArmdozer: LightningDozerTD = param.tdArmdozer;
    return ((param: any): EndArmdozerEffectParamX<typeof sprite, typeof tdArmdozer, typeof param.endArmdozerEffect>);
  }

  return null;
}

/**
 * ライトニングドーザ アームドーザ効果終了アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function lightningDozer(param: LightningDozerEndArmdozerEffect<ArmdozerEffect>): Animate {
  if (param.endArmdozerEffect.type === 'TryReflect') {
    const castEffect: TryReflect = param.endArmdozerEffect;
    const castParam = ((param: any): LightningDozerEndArmdozerEffect<typeof castEffect>);
    return tryRefrect(castParam);
  }

  return empty();
}

/**
 * 反撃
 *
 * @param param パラメータ
 * @return アニメーション
 */
function tryRefrect(param: LightningDozerEndArmdozerEffect<TryReflect>): Animate {
  if (param.endArmdozerEffect.effect !== 'Lightning') {
    return empty();
  }

  return param.tdArmdozer.lightningBarrier.hidden();
}