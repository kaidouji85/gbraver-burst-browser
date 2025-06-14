import { Animate } from "../src/js/animation/animate";
import { delay } from "../src/js/animation/delay";
import {
  enemyWingDozerCutIn,
  playerWingDozerCutIn,
} from "../src/js/game-object/cut-in/wing-dozer";
import { WingDozerCutIn } from "../src/js/game-object/cut-in/wing-dozer/wing-dozer-cutin";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "wing-dozer-cutin",
};

/**
 * ウィングドーザ カットイン
 * @param cutIn カットイン
 * @return アニメーション
 */
function cutInAnimation(cutIn: WingDozerCutIn): Animate {
  return cutIn
    .show()
    .chain(delay(2000))
    .chain(cutIn.hidden())
    .chain(delay(2000));
}

/** ウィングドーザ カットイン プレイヤー側 */
export const player = hudGameObjectStory((params) => {
  const cutIn = playerWingDozerCutIn(params);
  cutInAnimation(cutIn).loop();
  return [cutIn.getObject3D()];
});

/** ウィングドーザ カットイン 敵側 */
export const enemy = hudGameObjectStory((params) => {
  const cutIn = enemyWingDozerCutIn(params);
  cutInAnimation(cutIn).loop();
  return [cutIn.getObject3D()];
});
