// @flow

import {Animate} from "../../../../animation/animate";
import type {ShinyaModel} from "../model/shinya-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {ShinyaSounds} from "../sounds/shinya-sounds";
import {all} from "../../../../animation/all";

/**
 * カットインを表示する
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function show(model: ShinyaModel, sounds: ShinyaSounds): Animate {
  return process(() => {
    model.opacity = 0;
    model.position.x = 400;
  })
    .chain(all(
      tween(model, t => t.to({opacity: 1}, 500)),
      tween(model.position, t => t.to({x: 200}, 500))
    ))
    .chain(process(() => {
      sounds.benefitEffect.play();
    }));
}