import {Observable} from "rxjs";

import { delay } from "../src/js/animation/delay";
import { GameObjectAction } from "../src/js/game-object/action/game-object-action";
import {enemyActiveArmdozerPointer, playerActiveArmdozerPointer} from "../src/js/game-object/active-armdozer-pointer";
import { ActiveArmdozerPointer } from "../src/js/game-object/active-armdozer-pointer/active-armdozer-pointer";
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
 * アクティブアームドーザポインタストーリー
 * @param generator アクティブアームドーザポインタ生成関数
 * @param fn アクティブアームドーザポインタに対する処理
 * @return ストーリー
 */
const activeArmdozerPointerStory =
  (
    generator: ActiveArmdozerPointerGenerator,
    fn: (activeArmdozerPointer: ActiveArmdozerPointer) => void,
  ) =>
  () => {
    const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
      const activeArmdozerPointer = generator(resources, gameObjectAction);
      fn(activeArmdozerPointer);
      return {
        objects: [activeArmdozerPointer.getObject3D()],
      };
    });
    stub.start();
    return stub.domElement();
  };

/**
 * ポインタの表示、非表示
 * @param activeArmdozerPointer
 */
const display = (activeArmdozerPointer: ActiveArmdozerPointer) => {
  activeArmdozerPointer.setPosition(100, 100);
  activeArmdozerPointer.show()
    .chain(delay(3000))
    .chain(activeArmdozerPointer.hidden())
    .chain(delay(3000))
    .loop();
};

/** プレイヤー側 アクティブアームドーザポインタ */
export const playerPointer = activeArmdozerPointerStory(
  playerActiveArmdozerPointer,
  display,
);

export const enemyPointer = activeArmdozerPointerStory(
  enemyActiveArmdozerPointer,
  display,
);