import { Observable } from "rxjs";

import { delay } from "../src/js/animation/delay";
import { GameObjectAction } from "../src/js/game-object/action/game-object-action";
import {
  enemyDamageIndicator,
  playerDamageIndicator,
} from "../src/js/game-object/damage-indicator";
import { DamageIndicator } from "../src/js/game-object/damage-indicator/damage-indicator";
import { Resources } from "../src/js/resource";
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
    generator: (
      resources: Resources,
      gameObjectAction: Observable<GameObjectAction>
    ) => DamageIndicator,
    fn: (damageIndicator: DamageIndicator) => void
  ) =>
  () => {
    const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
      const damageIndicator = generator(resources, gameObjectAction);
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
