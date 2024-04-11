import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_STANDARD_Z } from "../../position";
import { LightningDozerAnimationProps } from "./animation-props";

/**
 * チャージ
 *
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function charge(props: LightningDozerAnimationProps): Animate {
  const { model, sounds } = props;
  return onStart(() => {
    model.animation.type = "HM_CHARGE";
    model.animation.frame = 0;
    model.position.z = ARMDOZER_SPRITE_STANDARD_Z;
    sounds.motor.sound.play();
  }).chain(
    tween(model.animation, (t) =>
      t.to(
        {
          frame: 1,
        },
        300,
      ),
    ),
  );
}
