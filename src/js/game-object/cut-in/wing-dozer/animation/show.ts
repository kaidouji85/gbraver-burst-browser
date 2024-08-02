import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { tween } from "../../../../animation/tween";
import { WingDozerCutInAnimationProps } from "./animation-props";

/**
 * カットインを表示する
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function show(props: WingDozerCutInAnimationProps): Animate {
  const { model } = props;
  return all(
    tween(model.animation, (t) =>
      t.to({ frame: 0 }, 0).onStart(() => {
        model.animation.type = "BURST_UP";
      }),
    )
      .chain(
        tween(model.animation, (t) =>
          t.to(
            {
              frame: 1,
            },
            300,
          ),
        ),
      )
      .chain(delay(500))
      .chain(
        tween(model.animation, (t) =>
          t.to({ frame: 0 }, 0).onStart(() => {
            model.animation.type = "BURST_DOWN";
          }),
        ),
      )
      .chain(
        tween(model.animation, (t) =>
          t.to(
            {
              frame: 1,
            },
            300,
          ),
        ),
      ),
    tween(model, (t) => t.to({ opacity: 0 }, 0)).chain(
      tween(model, (t) =>
        t.to(
          {
            opacity: 1,
          },
          600,
        ),
      ),
    ),
    tween(model, (t) => t.to({ scale: 0.9 }, 0)).chain(
      tween(model, (t) =>
        t.to(
          {
            scale: 1,
          },
          300,
        ),
      ),
    ),
  );
}
