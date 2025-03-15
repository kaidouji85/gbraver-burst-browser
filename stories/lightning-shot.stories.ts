import { tdGameObjectStory } from "./stub/td-game-object-stub";
import {LightningShot} from "../src/js/game-object/shot/lightning-shot";

export default {
  title: "lightning-shot",
};

/** 電撃ショット */
export const lightningShot = tdGameObjectStory((params) => {
  const shot = new LightningShot(params);
  return { objects: [shot.getObject3D()] };
})