import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_ATTACKER_Z } from "../../position";
import { WingDozerAnimationProps } from "./animation-props";

/**
 * チャージ
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function charge(props: WingDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return onStart(() => {
    model.animation.type = "UPPER_CHARGE";
    model.animation.frame = 0;
    model.position.z = ARMDOZER_SPRITE_ATTACKER_Z;
    se.play(sounds.motor);
  }).chain(
    tween(model.animation, (t) =>
      t.to(
        {
          frame: 1,
        },
        200,
      ),
    ),
  );
}
