import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import { ActiveArmdozerPointerModel } from "../model/active-armdozer-pointer-model";

/**
 * 消す
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: ActiveArmdozerPointerModel): Animate {
  return tween(model, (t) => t.to({ opacity: 0 }, 300));
}
