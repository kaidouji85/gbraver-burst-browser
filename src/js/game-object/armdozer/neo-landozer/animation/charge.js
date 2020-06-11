// @flow

import {Animate} from "../../../../animation/animate";
import type {NeoLandozerModel} from "../model/neo-landozer-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {NeoLandozerSounds} from "../sounds/neo-landozer-sounds";

/**
 * チャージ
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function charge(model: NeoLandozerModel, sounds: NeoLandozerSounds): Animate {
  return process(() => {
    model.animation.type = 'HM_CHARGE';
    model.animation.frame = 0;
    sounds.motor.play();
  }).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 300)
    )
  );
}