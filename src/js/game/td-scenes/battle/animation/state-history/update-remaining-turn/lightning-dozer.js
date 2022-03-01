// @flow

import type {EndArmdozerEffectParam, EndArmdozerEffectParamX} from "./animation-param";
import {LightningDozerTD} from "../../../view/td/armdozer-objects/lightning-dozer";
import type {ArmdozerEffect, TryReflect} from "gbraver-burst-core";
import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";

/**
 * ライトニングドーザ アームドーザ効果終了パラメータ
 *
 * @template EFFECT アームドーザ効果
 */
export type LightningDozerEndEffect<EFFECT> = EndArmdozerEffectParamX<LightningDozerTD, EFFECT>;

/**
 * ライトニングドーザパラメータにキャストする
 * キャストできない場合はnullを返す
 *
 * @param param キャスト元
 * @return キャスト結果
 */
export function castLightningDozerEndEffect(param: EndArmdozerEffectParam): ?LightningDozerEndEffect<ArmdozerEffect> {
  if (param.tdArmdozer instanceof LightningDozerTD) {
    const tdArmdozer: LightningDozerTD = param.tdArmdozer;
    return ((param: any): EndArmdozerEffectParamX<typeof tdArmdozer, typeof param.endArmdozerEffect>);
  }

  return null;
}

/**
 * ライトニングドーザ アームドーザ効果終了アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function lightningDozer(param: LightningDozerEndEffect<ArmdozerEffect>): Animate {
  if (param.endArmdozerEffect.type === 'TryReflect') {
    const castEffect: TryReflect = param.endArmdozerEffect;
    const castParam = ((param: any): LightningDozerEndEffect<typeof castEffect>);
    return tryReflect(castParam);
  }

  return empty();
}

/**
 * 反撃
 *
 * @param param パラメータ
 * @return アニメーション
 */
function tryReflect(param: LightningDozerEndEffect<TryReflect>): Animate {
  if (param.endArmdozerEffect.effect !== 'Lightning') {
    return empty();
  }

  return param.tdArmdozer.lightningBarrier.hidden();
}