import { Group } from "@tweenjs/tween.js";

import type { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { TimeScaleAnimationProps } from "./animation-props";

/**
 * タイムスケールの値を入れ替える
 * @param props アニメーションプロパティ
 * @param group TWEENグループ
 * @param timeScale タイムスケール
 * @returns アニメーション
 */
export function toggle(
  props: TimeScaleAnimationProps,
  group: Group,
  timeScale: number,
): Animate {
  const { model, sounds, se } = props;
  return onStart(() => {
    model.timeScale = timeScale;
    model.scale = 1;
    se.play(sounds.changeValue);
  }, group)
    .chain(
      tween(
        model,
        (t) =>
          t.to(
            {
              scale: 1.1,
            },
            100,
          ),
        group,
      ),
    )
    .chain(
      tween(
        model,
        (t) =>
          t.to(
            {
              scale: 1,
            },
            100,
          ),
        group,
      ),
    );
}
