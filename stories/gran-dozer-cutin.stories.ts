import { delay } from "../src/js/animation/delay";
import {
  enemyGranDozerCutIn,
  playerGranDozerCutIn,
} from "../src/js/game-object/cut-in/gran-dozer";
import { GranDozerCutIn } from "../src/js/game-object/cut-in/gran-dozer/gran-dozer-cut-in";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "gran-dozer-cut-in",
};

/**
 * カットインのストーリー
 * @param cutIn カットイン
 */
const story = (cutIn: GranDozerCutIn) => {
  delay(1000)
    .chain(cutIn.show())
    .chain(delay(1000))
    .chain(cutIn.hidden())
    .loop();
};

/** プレイヤーカットイン */
export const playerCutIn = hudGameObjectStory((params) => {
  const cutIn = playerGranDozerCutIn(params);
  story(cutIn);
  return [cutIn.getObject3D()];
});

/** 敵カットイン */
export const enemyCutIn = hudGameObjectStory((params) => {
  const cutIn = enemyGranDozerCutIn(params);
  story(cutIn);
  return [cutIn.getObject3D()];
});
