import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import type { WingDozerModel } from "../model/wing-dozer-model";

/** アニメーション時間 */
const duration = 200;

/**
 * アクティブ状態を開始する
 * @param model モデル
 * @return アニメーション
 */
export function startActive(model: WingDozerModel): Animate {
  return all(
    tween(model.standard, (t) => t.to({ colorStrength: 0.8 }, duration)),
    tween(model.outline, (t) => t.to({ opacity: 1 }, duration)),
  );
}
