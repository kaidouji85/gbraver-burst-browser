import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { ShinBraverModel } from "../model/shin-braver-model";
import {ARMDOZER_SPRITE_ATTACKER_Z} from "../../position";

/**
 * アクティブ状態を開始する
 * @param model モデル
 * @return アニメーション
 */
export function startActive(model: ShinBraverModel): Animate {
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
