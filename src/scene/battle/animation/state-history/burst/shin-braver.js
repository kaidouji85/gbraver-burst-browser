// @flow

import type {BurstAnimationParam} from "./animation-param";
import {Animate} from "../../../../../animation/animate";
import {ShinBraver} from "../../../../../game-object/armdozer/shin-braver/shin-braver";
import {empty} from "../../../../../animation/delay";
import type {BurstEffect} from "gbraver-burst-core/lib/effect/burst/burst-effect";

/**
 * シンブレイバーのバーストアニメーション
 *
 * @param param バーストアニメーションパラメータ
 * @return バーストアニメーション
 */
export function shinBraverBurst(param: BurstAnimationParam<ShinBraver, BurstEffect>): Animate {
  return empty();
}