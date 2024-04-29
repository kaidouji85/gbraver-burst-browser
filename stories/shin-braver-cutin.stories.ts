import { StoryFn } from "@storybook/html";

import { Animate } from "../src/js/animation/animate";
import { delay } from "../src/js/animation/delay";
import {
  enemyShinBraverCutIn,
  playerShinBraverCutIn,
} from "../src/js/game-object/cut-in/shin-braver";
import { ShinBraverCutIn } from "../src/js/game-object/cut-in/shin-braver/shin-braver-cutin";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "shin-braver-cutin",
};

/**
 * シンブレイバー カットイン アニメーション
 * @param cutIn カットイン
 * @return アニメーション
 */
function cutInAnimation(cutIn: ShinBraverCutIn): Animate {
  return cutIn
    .show()
    .chain(delay(2000))
    .chain(cutIn.hidden())
    .chain(delay(2000));
}

/** シンブレイバー カットイン プレイヤー側 */
export const player: StoryFn = hudGameObjectStory((params) => {
  const cutIn = playerShinBraverCutIn(params);
  cutInAnimation(cutIn).loop();
  return [cutIn.getObject3D()];
});

/** シンブレイバー カットイン 敵側 */
export const enemy: StoryFn = hudGameObjectStory((params) => {
  const cutIn = enemyShinBraverCutIn(params);
  cutInAnimation(cutIn).loop();
  return [cutIn.getObject3D()];
});
