import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { NeoLandozerAnimationProps } from "./animation-props";

/**
 * アームハンマー
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function armHammer(props: NeoLandozerAnimationProps): Animate {
  const { model } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 0 }, 0).onStart(() => {
      model.animation.type = "HM_ATTACK";
    }),
  ).chain(
    tween(model.animation, (t) => t.to({ frame: 1 }, 150)),
    tween(model.position, (t) => t.to({ x: "-100" }, 150)),
  );
}
