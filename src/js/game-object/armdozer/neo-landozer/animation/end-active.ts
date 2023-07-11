import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import type { NeoLandozerModel } from "../model/neo-landozer-model";

/**
 * アクティブ状態を終了する
 * @param model モデル
 * @return アニメーション
 */
export function endActive(model: NeoLandozerModel): Animate {
  return tween(model.active, (t) =>
    t.to(
      {
        opacity: 0,
      },
      200,
    ),
  );
}
