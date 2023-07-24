import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { GenesisBraverCutInModel } from "../model/genesis-braver-cutin-model";

/**
 * カットインを非表示にする
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: GenesisBraverCutInModel): Animate {
  return tween(model, (t) =>
    t.to(
      {
        opacity: 0,
        scale: 1.1,
      },
      300,
    ),
  );
}
