import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { LightningShotAnimationProps } from "./animation-props";
import { all } from "../../../../animation/all";

/**
 * 電撃ショットを発射する
 * @param props 電撃ショットのアニメーションプロパティ
 * @returns アニメーション
 */
export function shot(props: LightningShotAnimationProps): Animate {
  const { model, sounds } = props;
  return tween(model, (t) =>
    t
      .onStart(() => {
        sounds.lightningAttack.sound.play();
      })
      .to({ animation: { frame: 0 }, opacity: 0 }, 0),
  ).chain(
    all(
      tween(model, (t) => t.to({ animation: { frame: 1 } }, 1000)),
      tween(model, (t) => t.to({ opacity: 1 }, 500)).chain(
        tween(model, (t) => t.to({ opacity: 0 }, 500)),
      ),
    ),
  );
}
