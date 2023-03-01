import { playerGenesisBraverCutIn } from "../src/js/game-object/cut-in/genesis-braver";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub"

export default {
  title: "genesis-braver-cut-in",
};

/** プレイヤーカットイン */
export const playerCutIn = () => {
  const stub = new HUDGameObjectStub(({resources}) => {
    const cutin = playerGenesisBraverCutIn(resources);
    return [cutin.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}