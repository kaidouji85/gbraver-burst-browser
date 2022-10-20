// @flow

import TWEEN from "@tweenjs/tween.js";

import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { WingDozerModel } from "../model/wing-dozer-model";

/**
 * ダウン
 * @param model モデル
 * @return アニメーション
 */
export function down(model: WingDozerModel): Animate {
  return all(
    process(() => {
      model.animation.type = "KNOCK_BACK";
      model.animation.frame = 1;
    })
      .chain(delay(500))
      .chain(
        process(() => {
          model.animation.type = "DOWN";
          model.animation.frame = 0;
        })
      )
      .chain(tween(model.animation, (t) => t.to({ frame: 1 }, 350))),

    tween(model.position, (t) =>
      t.to({ x: "+70" }, 1000).easing(TWEEN.Easing.Quadratic.Out)
    )
  );
}
