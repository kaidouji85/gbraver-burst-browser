import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { RaitoModel } from "../model/raito-model";
import { RaitoSounds } from "../sounds/raito-sounds";

/** アニメ時間 */
const duration = 400;

/**
 * カットインを表示する
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function show(model: RaitoModel, sounds: RaitoSounds): Animate {
  return onStart(() => {
    model.opacity = 0;
    model.position.x = -25;
  })
    .chain(
      all(
        tween(model, (t) =>
          t.to(
            {
              opacity: 1,
            },
            duration,
          ),
        ),
        tween(model.position, (t) =>
          t.to(
            {
              x: 0,
            },
            duration,
          ),
        ),
      ),
    )
    .chain(
      onStart(() => {
        sounds.benefitEffect.play();
      }),
    );
}
