// @flow

import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { WingDozerModel } from "../model/wing-dozer-model";
import { WingDozerSounds } from "../sounds/wing-dozer-sounds";

/**
 * ダッシュ
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function dash(model: WingDozerModel, sounds: WingDozerSounds): Animate {
  return process(() => {
    model.animation.type = "DASH_UP";
    model.animation.frame = 0;
    sounds.motor.play();
  })
    .chain(tween(model.animation, (t) => t.to({ frame: 1 }, 300)))
    .chain(delay(500))
    .chain(
      process(() => {
        model.animation.type = "DASH_DOWN";
        model.animation.frame = 0;
        sounds.motor.play();
      })
    )
    .chain(tween(model.animation, (t) => t.to({ frame: 1 }, 300)));
}
