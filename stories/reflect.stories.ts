import { Observable } from "rxjs";

import { delay } from "../src/js/animation/delay";
import { GameObjectAction } from "../src/js/game-object/action/game-object-action";
import {
  enemyReflectIndicator,
  playerReflectIndicator,
} from "../src/js/game-object/reflect-indicator";
import { ReflectIndicator } from "../src/js/game-object/reflect-indicator/reflect-indicator";
import { Resources } from "../src/js/resource";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "reflect",
};

/**
 * ダメージ反射インジケータのストーリー
 * @param generator ダメージ反射インジケータ生成関数
 * @param fn ダメージ反射インジケータ操作関数
 * @returns story
 */
const reflectIndicatorStory =
  (
    generator: (
      resources: Resources,
      gameObjectAction: Observable<GameObjectAction>,
    ) => ReflectIndicator,
    fn: (reflect: ReflectIndicator) => void,
  ) =>
  () => {
    const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
      const reflect = generator(resources, gameObjectAction);
      fn(reflect);
      return {
        objects: [reflect.getObject3D()],
      };
    });
    stub.start();
    return stub.domElement();
  };

/**
 * ポップアップ
 * @param reflect ダメージ反射インジケータ
 */
const popUp = (reflect: ReflectIndicator) => {
  delay(1000).chain(reflect.popUp()).loop();
};

/** プレイヤー ダメージ反射インジケータ ポップアップ */
export const playerPopUp = reflectIndicatorStory(playerReflectIndicator, popUp);

/** 敵 ダメージ反射インジケータ ポップアップ */
export const enemyPopUp = reflectIndicatorStory(enemyReflectIndicator, popUp);
