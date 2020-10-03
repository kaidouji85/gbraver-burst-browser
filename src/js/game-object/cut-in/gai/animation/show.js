// @flow

import {Animate} from "../../../../animation/animate";
import type {GaiModel} from "../model/gai-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {GaiSounds} from "../sounds/gai-sounds";

/**
 * カットインを表示する
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function show(model: GaiModel, sounds: GaiSounds): Animate {
  return process(() => {
    model.opacity = 0;
    model.scale = 2;
  })
    .chain(tween(model, t => t.to({opacity: 1, scale: 1}, 500)))
    .chain(process(() => {
      sounds.benefitEffect.play();
    }));
}