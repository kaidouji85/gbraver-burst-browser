import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { LightningModel } from "../model/lightning-model";
import { LightningSounds } from "../sounds/lightning-sounds";

/**
 * エフェクトを一瞬だけ表示する
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function popUp(model: LightningModel, sounds: LightningSounds): Animate {
  return onStart(() => {
    model.animation.frame = 0;
    model.opacity = 1;
    sounds.lightning.play();
  }).chain(
    all(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 1,
          },
          700,
        ),
      ),
      tween(model, (t) =>
        t.to(
          {
            opacity: 0.5,
          },
          600,
        ),
      ).chain(
        tween(model, (t) =>
          t.to(
            {
              opacity: 0,
            },
            100,
          ),
        ),
      ),
    ),
  );
}
