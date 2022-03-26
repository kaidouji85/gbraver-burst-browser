// @flow
import type {ReflectIndocatorModel} from "../model/reflect-indocator-model";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import {delay} from "../../../animation/delay";
import {process} from '../../../animation/process';

/**
 * ポップアップ
 *
 * @param model モデル
 * @return アニメーション
 */
export function popUp(model: ReflectIndocatorModel): Animate {
  return process(() => {
    model.opacity = 0;
    model.scale = 1.2;
  })
    .chain(tween(model, t => t.to({opacity: 1, scale: 1}, 400)))
    .chain(delay(600))
    .chain(tween(model, t => t.to({opacity: 0, scale: 1.1}, 200)));
}