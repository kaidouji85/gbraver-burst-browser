import { Observable } from "rxjs";
import { Resources } from "../src/js/resource";
import { GameObjectAction } from "../src/js/game-object/action/game-object-action";
import { DamageHalved } from "../src/js/game-object/damage-halved/damage-halved";
import { TDGameObjectStub } from "./stub/td-game-object-stub";
import { delay } from "../src/js/animation/delay";
import { enemyDamageHalved, playerDamageHalved } from "../src/js/game-object/damage-halved";

export default {
  title: "damage-halved"
};

/**
 * ダメージ半減インジケータのストーリー
 * @param generator ダメージ半減インジケータ生成関数
 * @param fn ダメージ半減インジケータ操作関数
 * @return story
 */
const damageHalvedStory = (
  generator: (resources: Resources, gameObjectAction: Observable<GameObjectAction>) => DamageHalved,
  fn: (damageHavled: DamageHalved) => void,
) => () => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const damageHalved = generator(resources, gameObjectAction);
    fn(damageHalved);
    return {
      objects: [damageHalved.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};

/**
 * ポップアップ
 * @param damageHalved ダメージ半減インジケータ
 */
const popUp = (damageHalved: DamageHalved) => {
  delay(1000)
    .chain(damageHalved.popUp())
    .loop();
};

/** プレイヤー ダメージ半減インジケータ ポップアップ */
export const playerPopUp = damageHalvedStory(playerDamageHalved, popUp);

/** 敵 ダメージ半減インジケータ ポップアップ */
export const enemyPopUp = damageHalvedStory(enemyDamageHalved, popUp);
