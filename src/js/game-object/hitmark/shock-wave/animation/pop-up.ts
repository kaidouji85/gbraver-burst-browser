import TWEEN from "@tweenjs/tween.js";

import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type {
  ShockWaveLineModel,
  ShockWaveModel,
  ShockWaveRingModel,
} from "../model/shock-wave-model";

/** アニメーション再生時間 */
export const DURATION = 800;

/**
 * 衝撃波アニメーション
 *
 * @param model モデル
 * @return アニメーション
 */
export function popUp(model: ShockWaveModel): Animate {
  return all(
    ...model.lines.map((v) => lineAnimation(v)),
    ringAnimation(model.ring)
  );
}

/**
 * 衝撃波軌跡アニメーション
 *
 * @param model モデル
 * @return アニメーション
 */
function lineAnimation(model: ShockWaveLineModel): Animate {
  return process(() => {
    model.opacity = 1;
    model.scale = 0;
    model.distance = 8;
  }).chain(
    tween(model, (t) =>
      t
        .to(
          {
            opacity: 0,
            scale: model.toScale,
          },
          DURATION
        )
        .easing(TWEEN.Easing.Quadratic.Out)
    )
  );
}

/**
 * 衝撃波リングアニメーション
 *
 * @param model モデル
 * @return アニメーション
 */
function ringAnimation(model: ShockWaveRingModel): Animate {
  return process(() => {
    model.opacity = 1;
    model.scale = 0;
  }).chain(
    tween(model, (t) =>
      t
        .to(
          {
            opacity: 0,
            scale: 1,
          },
          DURATION
        )
        .easing(TWEEN.Easing.Quadratic.Out)
    )
  );
}
