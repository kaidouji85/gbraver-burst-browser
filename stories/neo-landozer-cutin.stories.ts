import { Animate } from "../src/js/animation/animate";
import { delay } from "../src/js/animation/delay";
import {
  enemyNeoLandozerCutIn,
  playerNeoLandozerCutIn,
} from "../src/js/game-object/cut-in/neo-landozer";
import { NeoLandozerCutIn } from "../src/js/game-object/cut-in/neo-landozer/neo-landozer-cutin";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "neo-landozer-cutin",
};

function cutInAnimation(cutIn: NeoLandozerCutIn): Animate {
  return cutIn
    .show()
    .chain(delay(2000))
    .chain(cutIn.hidden())
    .chain(delay(2000));
}

export const Player = (): HTMLElement => {
  const stub = new HUDGameObjectStub((params) => {
    const cutIn = playerNeoLandozerCutIn(params);
    cutInAnimation(cutIn).loop();
    return [cutIn.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};

export const Enemy = (): HTMLElement => {
  const stub = new HUDGameObjectStub((params) => {
    const cutIn = enemyNeoLandozerCutIn(params);
    cutInAnimation(cutIn).loop();
    return [cutIn.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};
