// @flow

import TWEEN from '@tweenjs/tween.js';
import {Animate} from "../../../../animation/animate";
import type {LightningBarrierModel} from "../model/lightning-barrier-model";
import {tween} from "../../../../animation/tween";
import {process} from "../../../../animation/process";

/**
 * 帯電
 *
 * @param model モデル
 * @param group Tweenグループ
 * @return アニメーション
 */
export function electrification(model: LightningBarrierModel, group: typeof TWEEN.Group): Animate {
  return process(() => {
    model.animation.frame = 0;
  }, group).chain(
    tween(model.animation, t => t.to({frame: 1}, 1500), group)
  );
}