import { playerLightningShot } from "../src/js/game-object/shot/lightning-shot";
import { tdGameObjectStory } from "./stub/td-game-object-stub";

export default {
  title: "lightning-shot",
};

/** 電撃ショット */
export const player = tdGameObjectStory((params) => {
  const shot = playerLightningShot(params);
  return { objects: [shot.getObject3D()] };
});
