import { delay } from "../src/js/animation/delay";
import {
  enemyRaitoCutIn,
  playerRaitoCutIn,
} from "../src/js/game-object/cut-in/raito";
import { RaitoCutIn } from "../src/js/game-object/cut-in/raito/raito";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "raito-cutin",
};

/**
 * ライト カットイン
 * @param pilot カットイン
 * @return アニメーション
 */
const cutinAnimation = (pilot: RaitoCutIn) => {
  pilot
    .show()
    .chain(delay(2000))
    .chain(pilot.hidden())
    .chain(delay(2000))
    .loop();
};

/** ライト カットイン プレイヤー側 */
export const player = hudGameObjectStory((params) => {
  const pilot = playerRaitoCutIn(params);
  cutinAnimation(pilot);
  return [pilot.getObject3D()];
});

/** ライト カットイン 敵側 */
export const enemy = hudGameObjectStory((params) => {
  const pilot = enemyRaitoCutIn(params);
  cutinAnimation(pilot);
  return [pilot.getObject3D()];
});
