import { delay } from "../src/js/animation/delay";
import { LightningBarrierGameEffect } from "../src/js/game-object/barrier/lightning/lightning-barrier";
import { tdGameObjectStory } from "./stub/td-game-object-stub";

export default {
  title: "lightning-barrier",
};

/**
 * 電撃バリアストーリー
 * @param fn 電撃バリア操作関数
 * @returns story
 */
const lightningBarrierStory = (
  fn: (lightningBarrier: LightningBarrierGameEffect) => void,
) =>
  tdGameObjectStory((params) => {
    const barrier = new LightningBarrierGameEffect(params);
    fn(barrier);
    return {
      objects: [barrier.getObject3D()],
    };
  });

/** 表示->非表示 */
export const showHidden = lightningBarrierStory(
  (barrier: LightningBarrierGameEffect) => {
    delay(1000)
      .chain(barrier.show())
      .chain(delay(2000))
      .chain(barrier.hidden())
      .loop();
  },
);
