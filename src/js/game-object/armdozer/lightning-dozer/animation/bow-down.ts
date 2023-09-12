import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import {LightningDozerModel} from "../model/lightning-dozer-model";
import {LightningDozerSounds} from "../sounds/lightning-dozer-sounds";

/**
 * 礼（倒れる）
 * @param model ライトニングドーザモデル
 * @param sounds ライトニングドーザサウンド
 * @return アニメーション
 */
export function bowDown(
  model: LightningDozerModel,
  sounds: LightningDozerSounds,
): Animate {
  return process(() => {
    model.animation.type = "BOW";
    model.animation.frame = 0;
    sounds.motor.play();
  }).chain(
    tween(model.animation, (t) =>
      t.to(
        {
          frame: 1,
        },
        200,
      ),
    ),
  );
}
