import { delay } from "../src/js/animation/delay";
import {
  DamageIndicatorCreatprParams,
  enemyDamageIndicator,
  playerDamageIndicator,
} from "../src/js/game-object/damage-indicator";
import { DamageIndicator } from "../src/js/game-object/damage-indicator/damage-indicator";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "damage-indicator",
};

/**
 * ダメージインジケータのストーリー
 * @param generator ダメージインジケータ生成関数
 * @param fn ダメージインジケータ操作関数
 * @return story
 */
const damageIndicatorStory =
  (
    generator: (params: DamageIndicatorCreatprParams) => DamageIndicator,
    fn: (damageIndicator: DamageIndicator) => void,
  ) =>
  () => {
    const stub = new TDGameObjectStub((params) => {
      const damageIndicator = generator(params);
      fn(damageIndicator);
      return {
        objects: [damageIndicator.getObject3D()],
      };
    });
    stub.start();
    return stub.domElement();
  };

/**
 * ポップアップ
 * @param damageIndicator ダメージインジケータ
 */
const popUp = (damageIndicator: DamageIndicator) => {
  delay(1000).chain(damageIndicator.popUp(1000)).loop();
};

/** プレイヤー ダメージインジケータ ポップアップ */
export const playerPopUp = damageIndicatorStory(playerDamageIndicator, popUp);

/** 敵 ダメージインジケータ ポップアップ */
export const enemyPopUp = damageIndicatorStory(enemyDamageIndicator, popUp);
