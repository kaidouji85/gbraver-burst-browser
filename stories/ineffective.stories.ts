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
  delay(1000)
    .chain(ineffective.show())
    .chain(delay(1000))
    .chain(ineffective.hidden())
    .loop();
};

/** プレイヤー 効果無効 ポップアップ */
export const player: StoryFn = ineffectiveStory(playerIneffective, popUp);

/** 敵 効果無効 ポップアップ */
export const enemy: StoryFn = ineffectiveStory(enemyIneffective, popUp);
