import { Easing } from "@tweenjs/tween.js";

import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import {
  ShockWaveLineModel,
  ShockWaveRingModel,
} from "../model/shock-wave-model";
import { ShockWaveAnimationProps } from "./animation-props";

/** アニメーション再生時間 */
export const DURATION = 800;

/**
 * 衝撃波軌跡アニメーション
 * @param model モデル
 * @returns アニメーション
 */
function lineAnimation(model: ShockWaveLineModel): Animate {
  return onStart(() => {
    model.opacity = 1;
    model.scale = 0;
    model.distance = 8;
  }).chain(
    tween(model, (t) =>
      t
        .to({ opacity: 0, scale: model.toScale }, DURATION)
        .easing(Easing.Quadratic.Out),
    ),
  );
}

/**
 * 衝撃波リングアニメーション
 *
 * @param model モデル
 * @returns アニメーション
 */
function ringAnimation(model: ShockWaveRingModel): Animate {
  return onStart(() => {
    model.opacity = 1;
    model.scale = 0;
  }).chain(
    tween(model, (t) =>
      t.to({ opacity: 0, scale: 1 }, DURATION).easing(Easing.Quadratic.Out),
    ),
  );
}

/**
 * 衝撃波アニメーション
 * @param props プロパティ
 * @returns アニメーション
 */
export function popUp(props: ShockWaveAnimationProps): Animate {
  const { model } = props;
  return all(
    ...model.lines.map((v) => lineAnimation(v)),
    ringAnimation(model.ring),
  );
}
