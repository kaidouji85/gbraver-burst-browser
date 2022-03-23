// @flow
import {Animate} from "../../../animation/animate";
import {process} from '../../../animation/process';
import type {ResultIndicatorModel} from "../model/result-indicator-model";

/**
 * 非表示
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: ResultIndicatorModel): Animate {
  return process(() => {
    model.opacity = 0;
  })
}