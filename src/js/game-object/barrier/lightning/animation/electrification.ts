import * as TWEEN from "@tweenjs/tween.js";

import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { LightningBarrierModel } from "../model/lightning-barrier-model";

/**
 * 帯電
 *
 * @param model モデル
 * @param group Tweenグループ
 * @return アニメーション
 */
export function electrification(
  model: LightningBarrierModel,
  group: TWEEN.Group,
): Animate {
  return onStart(() => {
    model.animation.frame = 0;
  }, group).chain(
    tween(
      model.animation,
      (t) =>
        t.to(
          {
            frame: 1,
          },
          1500,
        ),
      group,
    ),
  );
}
