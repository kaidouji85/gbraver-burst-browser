import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_STANDARD_Z } from "../../position";
import type { ShinBraverModel } from "../model/shin-braver-model";

/**
 * アクティブ状態を終了する
 * @param model モデル
 * @return アニメーション
 */
export function endActive(model: ShinBraverModel): Animate {
  return process(() => {
    model.position.z = ARMDOZER_SPRITE_STANDARD_Z;
  }).chain(
    tween(model.active, (t) =>
      t.to(
        {
          opacity: 0,
        },
        500,
      ),
    ),
  );
}
