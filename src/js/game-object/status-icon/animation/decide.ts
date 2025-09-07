import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { StatusIconAnimationProps } from "./animation-props";

/**
 * 決定
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function decide(props: StatusIconAnimationProps): Animate {
  const { model, sounds, se } = props;
  return onStart(() => {
    model.scale = 1;
    se.play(sounds.changeValue);
  })
    .chain(tween(model, (t) => t.to({ scale: 1.18 }, 80)))
    .chain(tween(model, (t) => t.to({ scale: 1 }, 80)));
}
