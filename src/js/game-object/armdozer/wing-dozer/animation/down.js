// @flow

import TWEEN from "@tweenjs/tween.js";
import type {WingDozerModel} from "../model/wing-dozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from '../../../../animation/process';
import {tween} from "../../../../animation/tween";
import {delay} from "../../../../animation/delay";
import {all} from "../../../../animation/all";

/**
 * ダウン
 * @param model モデル
 * @return アニメーション
 */
export function down(model: WingDozerModel): Animate {
  return all(
    process(() => {
      model.animation.type = 'KNOCK_BACK';
      model.animation.frame = 1;
    })
      .chain(delay(500))
      .chain(process(() => {
        model.animation.type = 'DOWN';
        model.animation.frame = 0;
      }))
      .chain(tween(model.animation, t => t.to({frame: 1}, 350))),

    tween(model.position,
      t => t.to({x: '+70'}, 1000).easing(TWEEN.Easing.Quadratic.Out)
    )
  );
}