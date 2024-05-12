import { StoryFn } from "@storybook/html";

import { delay } from "../src/js/animation/delay";
import {
  enemyBatteryCorrect,
  playerBatteryCorrect,
} from "../src/js/game-object/battery-correct";
import { tdGameObjectStory } from "./stub/td-game-object-stub";

export default {
  title: "battery-correct",
};

/** バッテリー補正 プレイヤー側 */
export const player: StoryFn = tdGameObjectStory((params) => {
  const batteryCorrect = playerBatteryCorrect(params);
  batteryCorrect
    .popUp(1)
    .chain(delay(1000))
    .chain(batteryCorrect.popUp(-1))
    .chain(delay(1000))
    .loop();
  return {
    objects: [batteryCorrect.getObject3D()],
  };
});

/** バッテリー補正 敵側 */
export const enemy: StoryFn = tdGameObjectStory((params) => {
  const batteryCorrect = enemyBatteryCorrect(params);
  batteryCorrect
    .popUp(1)
    .chain(delay(1000))
    .chain(batteryCorrect.popUp(-1))
    .chain(delay(1000))
    .loop();
  return {
    objects: [batteryCorrect.getObject3D()],
  };
});
