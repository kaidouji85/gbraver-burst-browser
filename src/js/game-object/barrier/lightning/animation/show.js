// @flow

import {Animate} from "../../../../animation/animate";
import type {LightningBarrierModel} from "../model/lightning-barrier-model";
import {tween} from "../../../../animation/tween";
import {process} from '../../../../animation/process';
import {all} from "../../../../animation/all";

/**
 * バリアを表示する
 *
 * @param model モデル
 * @return アニメーション
 */
export function show(model: LightningBarrierModel): Animate {
  return all(
    process(() => {
      model.scale = 0.9;
    }).chain(tween(model, t => t.to({scale: 1}, 200))),

    tween(model, t => t.to({opacity: 1}, 500))
  );
}