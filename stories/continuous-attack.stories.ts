import { delay } from "../src/js/animation/delay";
import {
  enemyContinuousAttack,
  GenerateContinuousAttackIndicatorParams,
  playerContinuousAttack,
} from "../src/js/game-object/continuous-attack";
import { ContinuousAttackIndicator } from "../src/js/game-object/continuous-attack/continuous-attack-indicator";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "continuous-attack",
};

/**
 * 連続攻撃インジケータのストーリー
 * @param generator 連続攻撃インジケータ生成関数
 * @param fn 連続攻撃インジケータ操作関数
 * @return story
 */
const continuousAttackStory =
  (
    generator: (
      params: GenerateContinuousAttackIndicatorParams,
    ) => ContinuousAttackIndicator,
    fn: (continuousAttack: ContinuousAttackIndicator) => void,
  ) =>
  () => {
    const stub = new TDGameObjectStub((params) => {
      const continuousAttack = generator(params);
      fn(continuousAttack);
      return {
        objects: [continuousAttack.getObject3D()],
      };
    });
    stub.start();
    return stub.domElement();
  };

/**
 * ポップアップ
 * @param continuousAttack 連続攻撃インジケータ
 */
const popUp = (continuousAttack: ContinuousAttackIndicator) => {
  delay(1000).chain(continuousAttack.popUp()).loop();
};

/** プレイヤー 連続攻撃インジケータ ポップアップ */
export const playerPopUp = continuousAttackStory(playerContinuousAttack, popUp);

/** 敵 連続攻撃インジケータ ポップアップ */
export const enemyPopUp = continuousAttackStory(enemyContinuousAttack, popUp);
