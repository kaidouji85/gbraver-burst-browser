import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import type { WingDozerCutInModel } from "../model/wing-dozer-cutin-model";

/**
 * カットインを消す
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: WingDozerCutInModel): Animate {
  return tween(model, t => t.to({
    opacity: 0,
    scale: 1.1
  }, 300));
}