import { delay } from "../src/js/animation/delay";
import {
  ContinuousAttackCreatorParams,
  enemyContinuousAttack,
  playerContinuousAttack,
} from "../src/js/game-object/continuous-attack";
import { ContinuousAttackIndicator } from "../src/js/game-object/continuous-attack/continuous-attack-indicator";
import { tdGameObjectStory } from "./stub/td-game-object-stub";

export default {
  title: "continuous-attack",
};

/**
 * 連続攻撃インジケータのストーリー
 * @param generator 連続攻撃インジケータ生成関数
 * @param fn 連続攻撃インジケータ操作関数
 * @returns story
 */
const continuousAttackStory = (
  generator: (
    params: ContinuousAttackCreatorParams,
  ) => ContinuousAttackIndicator,
  fn: (continuousAttack: ContinuousAttackIndicator) => void,
) =>
  tdGameObjectStory((params) => {
    const continuousAttack = generator(params);
    fn(continuousAttack);
    return {
      objects: [continuousAttack.getObject3D()],
    };
  });

/**
 * ポップアップ
 * @param continuousAttack 連続攻撃インジケータ
 */
const popUp = (continuousAttack: ContinuousAttackIndicator) => {
  delay(1000).chain(continuousAttack.popUp()).loop();
};

/** プレイヤー 連続攻撃インジケータ ポップアップ */
export const playerPopUp = continuousAttackStory(
  playerContinuousAttack,
  popUp,
);

/** 敵 連続攻撃インジケータ ポップアップ */
export const enemyPopUp = continuousAttackStory(
  enemyContinuousAttack,
  popUp,
);
