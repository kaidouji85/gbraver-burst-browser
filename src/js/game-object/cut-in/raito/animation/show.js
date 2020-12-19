// @flow

import {Animate} from "../../../../animation/animate";
import type {RaitoModel} from "../model/raito-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {RaitoSounds} from "../sounds/raito-sounds";

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
    model.scale = 2;
  })
    .chain(tween(model, t => t.to({opacity: 1, scale: 1}, 500)))
    .chain(process(() => {
      sounds.benefitEffect.play();
    }));
}