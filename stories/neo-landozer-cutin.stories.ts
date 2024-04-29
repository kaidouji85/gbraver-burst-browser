import { StoryFn } from "@storybook/html";

import { Animate } from "../src/js/animation/animate";
import { delay } from "../src/js/animation/delay";
import {
  enemyNeoLandozerCutIn,
  playerNeoLandozerCutIn,
} from "../src/js/game-object/cut-in/neo-landozer";
import { NeoLandozerCutIn } from "../src/js/game-object/cut-in/neo-landozer/neo-landozer-cutin";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "neo-landozer-cutin",
};

/**
 * ネオランドーザ カットイン アニメ
 * @param cutIn カットイン
 */
function cutInAnimation(cutIn: NeoLandozerCutIn): Animate {
  return cutIn
    .show()
    .chain(delay(2000))
    .chain(cutIn.hidden())
    .chain(delay(2000));
}

/** ネオランドーザ カットイン プレイヤー側 */
export const player: StoryFn = hudGameObjectStory((params) => {
  const cutIn = playerNeoLandozerCutIn(params);
  cutInAnimation(cutIn).loop();
  return [cutIn.getObject3D()];
});

/** ネオランドーザ カットイン 敵側 */
export const enemy: StoryFn = hudGameObjectStory((params) => {
  const cutIn = enemyNeoLandozerCutIn(params);
  cutInAnimation(cutIn).loop();
  return [cutIn.getObject3D()];
});
