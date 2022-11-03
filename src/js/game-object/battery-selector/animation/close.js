// @flow

import { Animate } from "../../../animation/animate";
import { process } from "../../../animation/process";
import { tween } from "../../../animation/tween";
import type { BatterySelectorModel } from "../model";

/**
 * バッテリーセレクタを閉じる
 *
 * @param model モデル
 * @return アニメーション
 */
export function close(model: BatterySelectorModel): Animate {
  return process(() => {
    model.disabled = true;
    model.opacity = 1;
  }).chain(tween(model, (t) => t.to({ opacity: 0 }, 200)));
}
