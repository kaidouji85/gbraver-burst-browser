import { Animate } from "../src/js/animation/animate";
import { delay } from "../src/js/animation/delay";
import {
  enemyWingDozerCutIn,
  playerWingDozerCutIn,
} from "../src/js/game-object/cut-in/wing-dozer";
import { WingDozerCutIn } from "../src/js/game-object/cut-in/wing-dozer/wing-dozer-cutin";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "wing-dozer-cutin",
};

function cutInAnimation(cutIn: WingDozerCutIn): Animate {
  return cutIn
    .show()
    .chain(delay(2000))
    .chain(cutIn.hidden())
    .chain(delay(2000));
}

export const Player = (): HTMLElement => {
  const stub = new HUDGameObjectStub((params) => {
    const cutIn = playerWingDozerCutIn(params);
    cutInAnimation(cutIn).loop();
    return [cutIn.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};

export const Enemy = (): HTMLElement => {
  const stub = new HUDGameObjectStub((params) => {
    const cutIn = enemyWingDozerCutIn(params);
    cutInAnimation(cutIn).loop();
    return [cutIn.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};
