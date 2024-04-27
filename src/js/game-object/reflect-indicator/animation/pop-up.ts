import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { ReflectIndocatorModel } from "../model/reflect-indocator-model";

/**
 * ポップアップ
 *
 * @param model モデル
 * @returns アニメーション
 */
export function popUp(model: ReflectIndocatorModel): Animate {
  return onStart(() => {
    model.opacity = 0;
    model.scale = 1.2;
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            opacity: 1,
            scale: 1,
          },
          400,
        ),
      ),
    )
    .chain(delay(600))
    .chain(
      tween(model, (t) =>
        t.to(
          {
            opacity: 0,
            scale: 1.1,
          },
          200,
        ),
      ),
    );
}
