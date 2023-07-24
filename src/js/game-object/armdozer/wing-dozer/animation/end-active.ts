import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import type { WingDozerModel } from "../model/wing-dozer-model";

/**
 * アクティブ状態を終了する
 * @param model モデル
 * @return アニメーション
 */
export function endActive(model: WingDozerModel): Animate {
  return tween(model.active, (t) =>
    t.to(
      {
        opacity: 0,
      },
      200,
    ),
  );
}
