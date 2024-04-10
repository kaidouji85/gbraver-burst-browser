import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { LightningBarrierModel } from "../model/lightning-barrier-model";
import { LightningBarrierSounds } from "../sounds/lightning-barrier-sounds";

/**
 * バリアを表示する
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function show(
  model: LightningBarrierModel,
  sounds: LightningBarrierSounds,
): Animate {
  return onStart(() => {
    sounds.lightningBarrier.sound.play();
  }).chain(
    tween(model, (t) =>
      t.to(
        {
          opacity: 1,
        },
        1000,
      ),
    ),
  );
}
