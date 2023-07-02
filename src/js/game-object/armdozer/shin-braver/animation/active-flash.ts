import * as TWEEN from "@tweenjs/tween.js";

import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { ShinBraverModel } from "../model/shin-braver-model";

/**
 * アクティブ状態フラッシュ
 * @param model モデル
 * @param group TWEENグループ
 * @return アニメーション
 */
export function activeFlash(
  model: ShinBraverModel,
  group: TWEEN.Group
): Animate {
  return process(() => {
    model.active.strength = 0;
  })
    .chain(
      tween(
        model.active,
        (t) =>
          t.to(
            {
              strength: 1,
            },
            2000
          ),
        group
      )
    )
    .chain(delay(150, group))
    .chain(
      tween(
        model.active,
        (t) =>
          t.to(
            {
              strength: 0,
            },
            2000
          ),
        group
      )
    )
    .chain(delay(150, group));
}
