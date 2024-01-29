import { Observable } from "rxjs";

import { all } from "../src/js/animation/all";
import { delay } from "../src/js/animation/delay";
import { GameObjectAction } from "../src/js/game-object/action/game-object-action";
import { activeArmdozerPointer } from "../src/js/game-object/active-armdozer-pointer";
import { ActiveArmdozerPointer } from "../src/js/game-object/active-armdozer-pointer/active-armdozer-pointer";
import { ArmdozerSprite } from "../src/js/game-object/armdozer/armdozer-sprite";
import {
  EnemyShinBraver,
  PlayerShinBraver,
} from "../src/js/game-object/armdozer/shin-braver";
import { Resources } from "../src/js/resource";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "active-armdozer-pointer",
};

/**
 * アクティブアームドーザポインタ生成関数
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成したアクティブアームドーザポインタ
 */
type ActiveArmdozerPointerGenerator = (
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
) => ActiveArmdozerPointer;

/**
 * アームドーザ生成関数
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成したアームドーザ
 */
type ArmdozerGenerator = (
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
) => ArmdozerSprite;

/**
 * アクティブアームドーザポインタストーリー
 * @param pointerGenerator アクティブアームドーザポインタ生成関数
 * @param armdozerGenerator アームドーザ生成関数
 * @param pointerFn アクティブアームドーザポインタに対する処理
 * @return ストーリー
 */
const activeArmdozerPointerStory =
  (
    pointerGenerator: ActiveArmdozerPointerGenerator,
    armdozerGenerator: ArmdozerGenerator,
    fn: (pointer: ActiveArmdozerPointer, armdozer: ArmdozerSprite) => void,
  ) =>
  () => {
    const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
      const pointer = pointerGenerator(resources, gameObjectAction);
      const armdozer = armdozerGenerator(resources, gameObjectAction);
      armdozer.addObject3D(pointer.getObject3D());
      fn(pointer, armdozer);
      return {
        objects: [armdozer.getObject3D()],
      };
    });
    stub.start();
    return stub.domElement();
  };

/**
 * ポインタの表示、非表示
 * @param pointer アクティブアームドーザポインタ
 * @param armdozer アームドーザ
 */
const display = (pointer: ActiveArmdozerPointer, armdozer: ArmdozerSprite) => {
  all(pointer.show(), armdozer.startActive())
    .chain(delay(3000))
    .chain(all(pointer.hidden(), armdozer.endActive()))
    .chain(delay(3000))
    .loop();
};

/** プレイヤー側 シンブレイバー */
export const playerShinBraverPointer = activeArmdozerPointerStory(
  activeArmdozerPointer,
  PlayerShinBraver,
  display,
);

/** 敵側 シンブレイバー */
export const enemyShinBraverPointer = activeArmdozerPointerStory(
  activeArmdozerPointer,
  EnemyShinBraver,
  display,
);