import { playerActiveArmdozerPointer } from "../src/js/game-object/active-armdozer-pointer";
import { ActiveArmdozerPointer } from "../src/js/game-object/active-armdozer-pointer/active-armdozer-pointer";
import { Resources } from "../src/js/resource";
import { TDGameObjectStub } from "./stub/td-game-object-stub";
import { Observable } from "rxjs";
import { GameObjectAction } from "../src/js/game-object/action/game-object-action";

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
 * @return ストーリー
 */
const activeArmdozerPointerStory =
  (generator: ActiveArmdozerPointerGenerator) => () => {
    const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
      const activeArmdozerPointer = generator(resources, gameObjectAction);
      return {
        objects: [activeArmdozerPointer.getObject3D()],
      };
    });
    stub.start();
    return stub.domElement();
  };

/** プレイヤー側 アクティブアームドーザポインタ */
export const playerPointer = activeArmdozerPointerStory(
  playerActiveArmdozerPointer,
);
