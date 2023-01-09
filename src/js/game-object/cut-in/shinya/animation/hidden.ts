import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { ShinyaModel } from "../model/shinya-model";

/**
 * カットインを非表示にする
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: ShinyaModel): Animate {
  return process(() => {
    model.opacity = 1;
  }).chain(
    all(
      tween(model, (t) =>
        t.to(
          {
            opacity: 0,
          },
          300
        )
      ),
      tween(model.position, (t) =>
        t.to(
          {
            x: "+100",
          },
          300
        )
      )
    )
  );
}
