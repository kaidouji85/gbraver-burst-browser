import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { LightningDozerAnimationProps } from "./animation-props";

/**
 * 礼（起き上がる）
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function bowUp(props: LightningDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 1 }, 0).onStart(() => {
      model.animation.type = "BOW";
      se.play(sounds.motor);
    }),
  )
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 0,
          },
          200,
        ),
      ),
    )
    .chain(
      tween(model.animation, (t) =>
        t.to({ frame: 1 }, 0).onStart(() => {
          model.animation.type = "UPRIGHT";
        }),
      ),
    );
}
