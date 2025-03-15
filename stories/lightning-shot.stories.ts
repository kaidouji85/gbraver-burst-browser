import {
  enemyLightningShot,
  playerLightningShot,
} from "../src/js/game-object/shot/lightning-shot";
import { tdGameObjectStory } from "./stub/td-game-object-stub";

export default {
  title: "lightning-shot",
};

/** プレイヤー電撃ショット */
export const player = tdGameObjectStory((params) => {
  const shot = playerLightningShot(params);
  return { objects: [shot.getObject3D()] };
});

/** 敵電撃ショット */
export const enemy = tdGameObjectStory((params) => {
  const shot = enemyLightningShot(params);
  return { objects: [shot.getObject3D()] };
});
