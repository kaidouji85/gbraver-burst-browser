import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import type { LightningDozerModel } from "../model/lightning-dozer-model";
import {process} from "../../../../animation/process";
import {ARMDOZER_SPRITE_ATTACKER_Z} from "../../position";

/**
 * アクティブ状態を開始する
 * @param model モデル
 * @return アニメーション
 */
export function startActive(model: LightningDozerModel): Animate {
  return process(() => {
    model.position.z = ARMDOZER_SPRITE_ATTACKER_Z;
  }).chain(tween(model.active, (t) =>
    t.to(
      {
        opacity: 1,
      },
      500,
    ),
  ));
}
