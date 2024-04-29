import { StoryFn } from "@storybook/html";

import { delay } from "../src/js/animation/delay";
import {
  enemyPowerUp,
  playerPowerUp,
  PowerUpCreatorParams,
} from "../src/js/game-object/power-up";
import { PowerUp } from "../src/js/game-object/power-up/power-up";
import { tdGameObjectStory } from "./stub/td-game-object-stub";

export default {
  title: "power-up",
};

/**
 * 攻撃アップのストーリー
 * @param generator 攻撃アップ生成関数
 * @param fn 攻撃アップ操作関数
 * @returns story
 */
const powerUpStory = (
  generator: (params: PowerUpCreatorParams) => PowerUp,
  fn: (powerUp: PowerUp) => void,
) =>
  tdGameObjectStory((params) => {
    const powerUp = generator(params);
    fn(powerUp);
    return {
      objects: [powerUp.getObject3D()],
    };
  });

/**
 * ポップアップ
 * @param powerUp 攻撃アップ
 */
const popUp = (powerUp: PowerUp) => {
  delay(1000).chain(powerUp.popUp()).loop();
};

/** プレイヤー 攻撃アップ ポップアップ */
export const playerPopUp: StoryFn = powerUpStory(playerPowerUp, popUp);

/** 敵 攻撃アップ ポップアップ */
export const enemyPopUp: StoryFn = powerUpStory(enemyPowerUp, popUp);
