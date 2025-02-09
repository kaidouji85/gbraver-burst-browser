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
  return tween(model.animation, (t) =>
    t.to({ frame: 0 }, 300).onStart(() => {
      se.play(sounds.motor);
    }),
  ).chain(
    tween(model.position, (t) => t.to({ z: ARMDOZER_SPRITE_STANDARD_Z }, 0)),
  );
}
