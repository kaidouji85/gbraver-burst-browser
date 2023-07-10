import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import type { NeoLandozerModel } from "../model/neo-landozer-model";
import {process} from "../../../../animation/process";
import {ARMDOZER_SPRITE_STANDARD_Z} from "../../position";

/**
 * アクティブ状態を終了する
 * @param model モデル
 * @return アニメーション
 */
export function endActive(model: NeoLandozerModel): Animate {
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
    )
  );
}
