import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_STANDARD_Z } from "../../position";
import { GranDozerAnimationProps } from "./animation-props";

/**
 * タックル -> 立ち
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function tackleToStand(props: GranDozerAnimationProps): Animate {
  const { model, se, sounds } = props;
  return tween(model, (t) =>
    t.to({ animation: { frame: 0 } }, 300).onStart(() => {
      se.play(sounds.motor);
    }),
  ).chain(
    tween(model, (t) =>
      t
        .to(
          {
            position: { z: ARMDOZER_SPRITE_STANDARD_Z },
            animation: { frame: 0 },
          },
          0,
        )
        .onStart(() => {
          model.animation.type = "STAND";
        }),
    ),
  );
}
