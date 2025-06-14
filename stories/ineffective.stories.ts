import { delay } from "../src/js/animation/delay";
import {
  EffectClearCreatorOptions,
  enemyEffectClear,
  playerEffectClear,
} from "../src/js/game-object/effect-clear";
import { EffectClear } from "../src/js/game-object/effect-clear/effectClear";
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
  generator: (options: EffectClearCreatorOptions) => EffectClear,
  fn: (ineffective: EffectClear) => void,
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
const popUp = (ineffective: EffectClear) => {
  delay(1000)
    .chain(ineffective.show())
    .chain(delay(1000))
    .chain(ineffective.hidden())
    .loop();
};

/** プレイヤー 効果無効 ポップアップ */
export const player = ineffectiveStory(playerEffectClear, popUp);

/** 敵 効果無効 ポップアップ */
export const enemy = ineffectiveStory(enemyEffectClear, popUp);
