import { StoryFn } from "@storybook/html";

import { delay } from "../src/js/animation/delay";
import {
  enemyLightningDozerCutIn,
  playerLightningDozerCutIn,
} from "../src/js/game-object/cut-in/lightning-dozer";
import { LightningDozerCutIn } from "../src/js/game-object/cut-in/lightning-dozer/lightning-dozer-cutin";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "lightning-dozer-cutin",
};

/**
 * ライトニングドーザ カットイン ループアニメーション
 * @param cutIn カットイン
 */
function loopAnimation(cutIn: LightningDozerCutIn): void {
  const animation = cutIn
    .show()
    .chain(delay(2000))
    .chain(cutIn.hidden())
    .chain(delay(1000));
  animation.loop();
}

/** ライトニングドーザ カットイン プレイヤー側 */
export const player: StoryFn = hudGameObjectStory((params) => {
  const cutIn = playerLightningDozerCutIn(params);
  loopAnimation(cutIn);
  return [cutIn.getObject3D()];
});

/** ライトニングドーザ カットイン 敵側 */
export const Enemy: StoryFn = hudGameObjectStory((params) => {
  const cutIn = enemyLightningDozerCutIn(params);
  loopAnimation(cutIn);
  return [cutIn.getObject3D()];
});
