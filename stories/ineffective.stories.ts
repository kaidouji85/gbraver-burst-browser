import { StoryFn } from "@storybook/html";

import { delay } from "../src/js/animation/delay";
import {
  enemyIneffective,
  IneffectiveCreatorOptions,
  playerIneffective,
} from "../src/js/game-object/ineffective";
import { Ineffective } from "../src/js/game-object/ineffective/ineffective";
import { tdGameObjectStory } from "./stub/td-game-object-stub";

export default {
  title: "ineffective",
};

/**
 * 効果無効のストーリー
 * @param generator 効果無効の生成関数
 * @param fn 効果無効の操作関数
 * @returns story
 */
const ineffectiveStory = (
  generator: (options: IneffectiveCreatorOptions) => Ineffective,
  fn: (ineffective: Ineffective) => void,
) =>
  tdGameObjectStory((params) => {
    const ineffective = generator(params);
    fn(ineffective);
    return {
      objects: [ineffective.getObject3D()],
    };
  });

/**
 * ポップアップ
 * @param ineffective 攻撃アップ
 */
const popUp = (ineffective: Ineffective) => {
  delay(1000).chain(ineffective.popUp()).loop();
};

/** プレイヤー 攻撃アップ ポップアップ */
export const playerPopUp: StoryFn = ineffectiveStory(playerIneffective, popUp);

/** 敵 攻撃アップ ポップアップ */
export const enemyPopUp: StoryFn = ineffectiveStory(enemyIneffective, popUp);
