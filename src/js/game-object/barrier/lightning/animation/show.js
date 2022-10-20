// @flow

import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { LightningBarrierModel } from "../model/lightning-barrier-model";
import { LightningBarrierSounds } from "../sounds/lightning-barrier-sounds";

/**
 * バリアを表示する
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function show(
  model: LightningBarrierModel,
  sounds: LightningBarrierSounds
): Animate {
  return process(() => {
    sounds.lightningBarrier.play();
  }).chain(tween(model, (t) => t.to({ opacity: 1 }, 1000)));
}
