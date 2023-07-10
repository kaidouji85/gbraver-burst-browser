import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import type { NeoLandozerModel } from "../model/neo-landozer-model";
import {process} from "../../../../animation/process";
import {ARMDOZER_SPRITE_ACTIVE_Z} from "../../position";

/**
 * アクティブ状態を開始する
 * @param model モデル
 * @return アニメーション
 */
export function startActive(model: NeoLandozerModel): Animate {
  return process(() => {
    model.position.z = ARMDOZER_SPRITE_ACTIVE_Z;
  }).chain(tween(model.active, (t) =>
    t.to(
      {
        opacity: 1,
      },
      500,
    ),
  ));
}
