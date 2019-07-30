// @flow

import {Animate} from "../../../../animation/animate";
import {tween} from "../../../../animation/tween";
import type {Battle3DCameraModel} from "../model/model";

/**
 * ズームイン
 *
 * @param duration ミリ秒単位のアニメーション時間
 * @return アニメーション
 */
export function zoomIn(model: Battle3DCameraModel, duration: number): Animate {
  return tween(model.position, t => t
    .to({z: '-100'}, duration)
  );
}