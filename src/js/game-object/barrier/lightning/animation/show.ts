import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { LightningBarrierAnimationProps } from "./animation-props";

/**
 * バリアを表示する
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function show(
  props: LightningBarrierAnimationProps
): Animate {
  const { model, sounds } = props;
  return onStart(() => {
    sounds.lightningBarrier.sound.play();
  }).chain(
    tween(model, (t) =>
      t.to(
        {
          opacity: 1,
        },
        1000,
      ),
    ),
  );
}
