import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import { ActiveArmdozerPointerModel } from "../model/active-armdozer-pointer-model";

/**
 * 表示
 * @param model モデル
 * @return アニメーション
 */
export function show(model: ActiveArmdozerPointerModel): Animate {
  return tween(model, (t) => t.to({ opacity: 1 }, 300));
}
