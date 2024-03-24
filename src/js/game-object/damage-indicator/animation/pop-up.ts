import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { DamageIndicatorModel } from "../model/damage-indicator-model";

/**
 * ダメージを表示する
 *
 * @param model モデル
 * @param damage ダメージ
 * @return アニメーション
 */
export function popUp(model: DamageIndicatorModel, damage: number): Animate {
  return onStart(() => {
    model.opacity = 0;
    model.damage = damage;
    model.scale = 1.1;
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            opacity: 1,
            scale: 1,
          },
          200,
        ),
      ),
    )
    .chain(delay(1300))
    .chain(
      tween(model, (t) =>
        t.to(
          {
            opacity: 0,
            scale: 1.05,
          },
          200,
        ),
      ),
    );
}
