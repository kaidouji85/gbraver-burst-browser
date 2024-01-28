import { TDGameObjectStub } from "./stub/td-game-object-stub";
import { playerActiveArmdozerPointer } from "../src/js/game-object/active-armdozer-pointer";

export default {
  title: "active-armdozer-pointer",
};

/** プレイヤー側 アクティブアームドーザポインタ */
export const playerPointer = () => {
  const stub = new TDGameObjectStub(({ resources }) => {
    const activeArmdozerPointer = playerActiveArmdozerPointer(resources);
    return {
      objects: [activeArmdozerPointer.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};
