import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { tween } from "../../../../animation/tween";
import { LightningShotAnimationProps } from "./animation-props";

/**
 * アニメーションフレームを進める
 * @param props 電撃ショットのアニメーションプロパティ
 * @param duration アニメーション時間
 * @returns アニメーション
 */
function animateFrame(
  props: LightningShotAnimationProps,
  duration: number = 1000,
): Animate {
  const { model } = props;
  return tween(model, (t) => t.to({ animation: { frame: 0 } }, 0)).chain(
    tween(model, (t) => t.to({ animation: { frame: 1 } }, duration)),
  );
}

/**
 * 電撃ショットを表示する
 * @param props 電撃ショットのアニメーションプロパティ
 * @param duration アニメーション時間
 * @returns アニメーション
 */
function show(
  props: LightningShotAnimationProps,
  duration: number = 300,
): Animate {
  const { model, sounds } = props;
  return tween(model, (t) =>
    t
      .onStart(() => {
        sounds.lightningAttack.sound.play();
      })
      .to({ opacity: 0 }, 0),
  ).chain(tween(model, (t) => t.to({ opacity: 1 }, duration)));
}

/**
 * 電撃ショットを非表示にする
 * @param props 電撃ショットのアニメーションプロパティ
 * @param duration アニメーション時間
 * @returns アニメーション
 */
function hidden(
  props: LightningShotAnimationProps,
  duration: number = 300,
): Animate {
  const { model } = props;
  return tween(model, (t) => t.to({ opacity: 0 }, duration));
}

/**
 * 電撃ショットを発射する
 * @param props 電撃ショットのアニメーションプロパティ
 * @returns アニメーション
 */
export function shot(props: LightningShotAnimationProps): Animate {
  const animateInterval = 250;
  return all(
    animateFrame(props, animateInterval)
      .chain(animateFrame(props, animateInterval))
      .chain(animateFrame(props, animateInterval))
      .chain(animateFrame(props, animateInterval)),

    show(props, 100).chain(delay(800)).chain(hidden(props, 100)),
  );
}
