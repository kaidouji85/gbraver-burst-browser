import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import type { LightningDozerModel } from "../model/lightning-dozer-model";

/**
 * アクティブ状態を開始する
 * @param model モデル
 * @return アニメーション
 */
export function startActive(model: LightningDozerModel): Animate {
  return tween(model.active, t => t.to({
    opacity: 1
  }, 500));
}