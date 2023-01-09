import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import type { LightningBarrierModel } from "../model/lightning-barrier-model";

/**
 * バリアを消す
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: LightningBarrierModel): Animate {
  return tween(model, (t) =>
    t.to(
      {
        opacity: 0,
      },
      1000
    )
  );
}
