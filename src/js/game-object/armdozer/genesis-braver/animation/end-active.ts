import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import {GenesisBraverModel} from "../model/genesis-braver-model";

/**
 * アクティブ状態を終了する
 * @param model モデル
 * @return アニメーション
 */
export function endActive(model: GenesisBraverModel): Animate {
  return tween(model.active, (t) =>
    t.to(
      {
        opacity: 0,
      },
      500
    )
  );
}
