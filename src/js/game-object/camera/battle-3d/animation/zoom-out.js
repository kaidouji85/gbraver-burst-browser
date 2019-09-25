// @flow

import {Animate} from "../../../../animation/animate";
import {tween} from "../../../../animation/tween";
import type {Battle3DCameraModel} from "../model/model";

/** ズームアウト */
export function zoomOut(model: Battle3DCameraModel, duration: number): Animate {
  return tween(model.position, t => t
    .to({z: '+100'}, duration)
  );
}