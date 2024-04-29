import { delay } from "../src/js/animation/delay";
import {
  enemyShinyaCutIn,
  playerShinyaCutIn,
} from "../src/js/game-object/cut-in/shinya";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "shinya-cutin",
};

/** シンヤ カットイン プレイヤー側 */
export const player = hudGameObjectStory((params) => {
  const pilot = playerShinyaCutIn(params);
  pilot
    .show()
    .chain(delay(2000))
    .chain(pilot.hidden())
    .chain(delay(2000))
    .loop();
  return [pilot.getObject3D()];
});

/** シンヤ カットイン 敵側 */
export const enemy = hudGameObjectStory((params) => {
  const pilot = enemyShinyaCutIn(params);
  pilot
    .show()
    .chain(delay(2000))
    .chain(pilot.hidden())
    .chain(delay(2000))
    .loop();
  return [pilot.getObject3D()];
});
