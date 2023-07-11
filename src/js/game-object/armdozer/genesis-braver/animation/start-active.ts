import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_ATTACKER_Z } from "../../position";
import { GenesisBraverModel } from "../model/genesis-braver-model";

/**
 * アクティブ状態を開始する
 * @param model モデル
 * @return アニメーション
 */
export function startActive(model: GenesisBraverModel): Animate {
  return process(() => {
    model.position.z = ARMDOZER_SPRITE_ATTACKER_Z;
  }).chain(
    tween(model.active, (t) =>
      t.to(
        {
          opacity: 1,
        },
        200,
      ),
    ),
  );
}
