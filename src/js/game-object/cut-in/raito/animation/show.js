// @flow

import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { RaitoModel } from "../model/raito-model";
import { RaitoSounds } from "../sounds/raito-sounds";

/**
 * カットインを表示する
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function show(model: RaitoModel, sounds: RaitoSounds): Animate {
  return process(() => {
    model.opacity = 0;
    model.position.x = 200;
  })
    .chain(
      all(
        tween(model, (t) => t.to({ opacity: 1 }, 500)),
        tween(model.position, (t) => t.to({ x: 0 }, 500))
      )
    )
    .chain(
      process(() => {
        sounds.benefitEffect.play();
      })
    );
}
