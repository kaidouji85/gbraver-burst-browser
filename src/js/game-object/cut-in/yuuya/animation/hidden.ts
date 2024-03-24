import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { YuuyaModel } from "../model/yuuya-model";

/** アニメ時間 */
const duration = 200;

/**
 * カットインを非表示にする
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: YuuyaModel): Animate {
  return onStart(() => {
    model.opacity = 1;
  }).chain(
    all(
      tween(model, (t) =>
        t.to(
          {
            opacity: 0,
          },
          duration,
        ),
      ),
      tween(model.position, (t) =>
        t.to(
          {
            x: "-25",
          },
          duration,
        ),
      ),
    ),
  );
}
