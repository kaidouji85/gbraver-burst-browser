// @flow

import {WingDozer} from "../../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import type {Burst} from "gbraver-burst-core";
import type {BurstAnimationParam, BurstAnimationParamX} from "./animation-param";
import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";
// TODO gbraver-burst-coreから直接インポートする
import type {ContinuousAttack} from "gbraver-burst-core/lib/player/burst";

/**
 * ウィングドーザ バーストアニメーション パラメータ
 *
 * @type BURST バースト
 */
export type WingDozerBurst<BURST> = BurstAnimationParamX<WingDozer, any, any, BURST>;

/**
 * ウィングドーザバーストアニメーションパラメータにキャストする
 * キャストできない場合はnullを返す
 *
 * @param origin キャスト元
 * @return キャスト結果
 */
export function castWingDozerBurst(origin: BurstAnimationParam): ?WingDozerBurst<Burst> {
  if (!(origin.burstSprite instanceof WingDozer)) {
    return null;
  }

  const sprite: WingDozer = origin.burstSprite;
  return ((origin: any): BurstAnimationParamX<typeof sprite, any, any, Burst>);
}

/**
 * ウィングドーザのバーストアニメーション
 * 
 * @param param パラメータ
 * @return アニメーション
 */
export function wingDozerBurst(param: WingDozerBurst<Burst>): Animate {
  if (param.burst.type === 'ContinuousAttack') {
    const continuousAttack: ContinuousAttack = param.burst;
    const castParam = ((param: any): WingDozerBurst<typeof continuousAttack>);
    return wingDozerContinuousAttack(castParam);
  }
  return empty();
}


/**
 * ウィングドーザ 連続攻撃
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function wingDozerContinuousAttack(param: WingDozerBurst<ContinuousAttack>): Animate {
  return empty();
}
