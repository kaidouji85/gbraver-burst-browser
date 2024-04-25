import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { DamageIndicatorAnimationProps } from "./animation-props";

/**
 * ダメージを表示する
 *
 * @param props アニメーションプロパティ
 * @param damage ダメージ
 * @returns アニメーション
 */
export function popUp(
  props: DamageIndicatorAnimationProps,
  damage: number,
): Animate {
  const { model } = props;
  return onStart(() => {
    model.opacity = 0;
    model.damage = damage;
    model.scale = 1.1;
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            opacity: 1,
            scale: 1,
          },
          200,
        ),
      ),
    )
    .chain(delay(1300))
    .chain(
      tween(model, (t) =>
        t.to(
          {
            opacity: 0,
            scale: 1.05,
          },
          200,
        ),
      ),
    );
}
