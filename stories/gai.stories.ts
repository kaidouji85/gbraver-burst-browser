import { StoryFn } from "@storybook/html";

import { delay } from "../src/js/animation/delay";
import {
  enemyGaiCutIn,
  playerGaiCutIn,
} from "../src/js/game-object/cut-in/gai";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "gai-cutin",
};

/** ガイ カットイン プレイヤー側 */
export const player: StoryFn = hudGameObjectStory((params) => {
  const pilot = playerGaiCutIn(params);
  pilot
    .show()
    .chain(delay(2000))
    .chain(pilot.hidden())
    .chain(delay(2000))
    .loop();
  return [pilot.getObject3D()];
});

/** ガイ カットイン 敵側 */
export const enemy: StoryFn = hudGameObjectStory((params) => {
  const pilot = enemyGaiCutIn(params);
  pilot
    .show()
    .chain(delay(2000))
    .chain(pilot.hidden())
    .chain(delay(2000))
    .loop();
  return [pilot.getObject3D()];
});
