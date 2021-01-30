// @flow

import type {ShinBraverModel} from "../model/shin-braver-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {Animate} from "../../../../animation/animate";
import {ShinBraverSounds} from "../sounds/shin-braver-sounds";

/**
 * ストレートパンチ
 * 
 * @param model モデル
 * @return アニメーション
 */
export function straightPunch(model: ShinBraverModel): Animate {
  return process(() => {
    model.animation.type = 'SP_ATTACK';
    model.animation.frame = 0;
  }).chain(
    tween(model.animation, t => t.to({frame: 1}, 250)),
    tween(model.position, t => t.to({x: '-80'}, 250)),
  );
}
