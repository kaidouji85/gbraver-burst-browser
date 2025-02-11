import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { GranDozerAnimationProps } from "./animation-props";

/**
 * チャージ
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function charge(props: GranDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return all(
    tween(model.animation, (t) =>
      t.to({ frame: 0 }, 0).onStart(() => {
        model.animation.type = "TACKLE_CHARGE";
        se.play(sounds.motor);
      }),
    ).chain(tween(model.animation, (t) => t.to({ frame: 1 }, 300))),
    tween(model.position, (t) => t.to({ x: "+100" }, 300)),
  );
}
