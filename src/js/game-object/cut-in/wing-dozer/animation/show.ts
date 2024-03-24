import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { WingDozerCutInModel } from "../model/wing-dozer-cutin-model";

/**
 * カットインを表示する
 *
 * @param model モデル
 * @return アニメーション
 */
export function show(model: WingDozerCutInModel): Animate {
  return all(
    onStart(() => {
      model.animation.type = "BURST_UP";
      model.animation.frame = 0;
    })
      .chain(
        tween(model.animation, (t) =>
          t.to(
            {
              frame: 1,
            },
            300,
          ),
        ),
      )
      .chain(delay(500))
      .chain(
        onStart(() => {
          model.animation.type = "BURST_DOWN";
          model.animation.frame = 0;
        }),
      )
      .chain(
        tween(model.animation, (t) =>
          t.to(
            {
              frame: 1,
            },
            300,
          ),
        ),
      ),
    onStart(() => {
      model.opacity = 0;
    }).chain(
      tween(model, (t) =>
        t.to(
          {
            opacity: 1,
          },
          600,
        ),
      ),
    ),
    onStart(() => {
      model.scale = 0.9;
    }).chain(
      tween(model, (t) =>
        t.to(
          {
            scale: 1,
          },
          300,
        ),
      ),
    ),
  );
}
