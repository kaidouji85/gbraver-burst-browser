import { playerActiveArmdozerPointer } from "../src/js/game-object/active-armdozer-pointer";
import { ActiveArmdozerPointer } from "../src/js/game-object/active-armdozer-pointer/active-armdozer-pointer";
import { Resources } from "../src/js/resource";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "active-armdozer-pointer",
};

/**
 * アクティブアームドーザポインタストーリー
 * @param generator アクティブアームドーザポインタ生成関数
 * @return ストーリー
 */
const activeArmdozerPointerStory =
  (generator: (resources: Resources) => ActiveArmdozerPointer) => () => {
    const stub = new TDGameObjectStub(({ resources }) => {
      const activeArmdozerPointer = generator(resources);
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
