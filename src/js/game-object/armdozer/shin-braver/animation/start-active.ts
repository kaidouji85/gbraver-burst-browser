import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import type { ShinBraverModel } from "../model/shin-braver-model";

/**
 * アクティブ状態を開始する
 * @param model モデル
 * @return アニメーション
 */
export function startActive(model: ShinBraverModel): Animate {
  return tween(model.active, (t) =>
    t.to(
      {
        opacity: 1,
      },
      500
    )
  );
}
