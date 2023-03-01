import { GenesisBraverCutIn } from "../src/js/game-object/cut-in/genesis-braver/genesis-braver-cutin";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub"

export default {
  title: "genesis-braver-cut-in",
};

/** プレイヤーカットイン */
export const playerCutIn = () => {
  const stub = new HUDGameObjectStub(({resources}) => {
    const cutin = new GenesisBraverCutIn(resources);
    return [cutin.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}