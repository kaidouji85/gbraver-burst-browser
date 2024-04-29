import { StoryFn } from "@storybook/html";

import { delay } from "../src/js/animation/delay";
import {
  enemyShockWave,
  playerShockWave,
  ShockWaveCreatorParams,
} from "../src/js/game-object/hitmark/shock-wave";
import { ShockWave } from "../src/js/game-object/hitmark/shock-wave/shock-wave";
import { tdGameObjectStory } from "./stub/td-game-object-stub";

export default {
  title: "shock-wave",
};

/**
 * 衝撃波ストーリー
 * @param generator 衝撃波生成オブジェクト
 * @param fn 衝撃波を操作する関数
 * @returns story
 */
const shockWaveStory = (
  generator: (params: ShockWaveCreatorParams) => ShockWave,
  fn: (shockWave: ShockWave) => void,
) =>
  tdGameObjectStory((params) => {
    const shockWave = generator(params);
    fn(shockWave);
    return {
      objects: [shockWave.getObject3D()],
    };
  });

/**
 * ポップアップ
 * @param shockWave 衝撃波
 */
const popUp = (shockWave: ShockWave) => {
  delay(1000).chain(shockWave.popUp()).chain(delay(1000)).loop();
};

/** プレイヤー衝撃波 ポップアップ */
export const player: StoryFn = shockWaveStory(playerShockWave, popUp);

/** 敵衝撃波 ポップアップ */
export const enemy: StoryFn = shockWaveStory(enemyShockWave, popUp);
