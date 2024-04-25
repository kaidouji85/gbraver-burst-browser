import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { LightningDozerAnimationProps } from "./animation-props";

/**
 * アームハンマー
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function armHammer(props: LightningDozerAnimationProps): Animate {
  const { model } = props;
  return all(
    onStart(() => {
      model.animation.type = "HM_ATTACK";
      model.animation.frame = 0;
    }).chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 1,
          },
          100,
        ),
      ),
    ),
    tween(model.position, (t) =>
      t.to(
        {
          x: "-60",
        },
        100,
      ),
    ),
  );
}
