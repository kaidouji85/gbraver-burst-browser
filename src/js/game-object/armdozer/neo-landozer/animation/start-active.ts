import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import type { NeoLandozerModel } from "../model/neo-landozer-model";

/**
 * アクティブ状態を開始する
 * @param model モデル
 * @return アニメーション
 */
export function startActive(model: NeoLandozerModel): Animate {
  return tween(model.active, (t) =>
    t.to(
      {
        opacity: 1,
      },
      500
    )
  );
}
