// @flow

import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {enemyWingDozerCutIn, playerWingDozerCutIn} from "../src/js/game-object/cut-in/wing-dozer";
import {delay} from "../src/js/animation/delay";
import {Animate} from "../src/js/animation/animate";
import {WingDozerCutIn} from "../src/js/game-object/cut-in/wing-dozer/wing-dozer-cutin";
import {toStream} from "../src/js";

export default {
  title: 'wing-dozer-cutin',
};

function cutInAnimation(cutIn: WingDozerCutIn): Animate {
  return cutIn.show()
    .chain(delay(2000))
    .chain(cutIn.hidden())
    .chain(delay(2000));
}

export const Player = (): HTMLElement => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const cutIn = playerWingDozerCutIn(resources, toStream(listener));
    cutInAnimation(cutIn).loop();
    return [cutIn.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const Enemy = (): HTMLElement => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const cutIn = enemyWingDozerCutIn(resources, toStream(listener));
    cutInAnimation(cutIn).loop();
    return [cutIn.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}