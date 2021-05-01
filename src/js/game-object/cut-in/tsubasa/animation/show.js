// @flow

import {Animate} from "../../../../animation/animate";
import type {TsubasaModel} from "../model/tsubasa-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {TsubasaSounds} from "../sounds/tsubasa-sounds";
import {all} from "../../../../animation/all";

/**
 * カットインを表示する
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function show(model: TsubasaModel, sounds: TsubasaSounds): Animate {
  return process(() => {
    model.opacity = 0;
    model.position.x = 200;
  })
    .chain(all(
      tween(model, t => t.to({opacity: 1}, 500)),
      tween(model.position, t => t.to({x: 0}, 500)),
    ))
    .chain(process(() => {
      sounds.benefitEffect.play();
    }));
}