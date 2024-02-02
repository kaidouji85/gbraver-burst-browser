import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import type { ResultIndicatorModel } from "../model/result-indicator-model";

/**
 * 非表示
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: ResultIndicatorModel): Animate {
  return onStart(() => {
    model.opacity = 0;
  });
}
