import { delay } from "../src/js/animation/delay";
import {
  enemyTsubasaCutIn,
  playerTsubasaCutIn,
} from "../src/js/game-object/cut-in/tsubasa";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "tsubasa-cutin",
};

/** ツバサ カットイン プレイヤー側 */
export const player = hudGameObjectStory((params) => {
  const pilot = playerTsubasaCutIn(params);
  pilot
    .show()
    .chain(delay(2000))
    .chain(pilot.hidden())
    .chain(delay(2000))
    .loop();
  return [pilot.getObject3D()];
});

/** ツバサ カットイン 敵側 */
export const enemy = hudGameObjectStory((params) => {
  const pilot = enemyTsubasaCutIn(params);
  pilot
    .show()
    .chain(delay(2000))
    .chain(pilot.hidden())
    .chain(delay(2000))
    .loop();
  return [pilot.getObject3D()];
});
