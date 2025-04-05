import { delay } from "../src/js/animation/delay";
import {
  enemyLightningShot,
  playerLightningShot,
} from "../src/js/game-object/shot/lightning-shot";
import { LightningShot } from "../src/js/game-object/shot/lightning-shot/lightning-shot";
import { tdGameObjectStory } from "./stub/td-game-object-stub";

export default {
  title: "lightning-shot",
};

/**
 * 電撃ショットのアニメーションを表示する
 * @param shot 電撃ショット
 */
const animation = (shot: LightningShot) => {
  return shot.shot().chain(delay(2000)).loop();
};

/** プレイヤー電撃ショット */
export const player = tdGameObjectStory((params) => {
  const shot = playerLightningShot(params);
  animation(shot);
  return { objects: [shot.getObject3D()] };
});

/** 敵電撃ショット */
export const enemy = tdGameObjectStory((params) => {
  const shot = enemyLightningShot(params);
  animation(shot);
  return { objects: [shot.getObject3D()] };
});
