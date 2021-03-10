// @flow

import {enemyContinuousAttack, playerContinuousAttack} from "../src/js/game-object/continuous-attack";
import {delay} from "../src/js/animation/delay";
import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {toStream} from "../src/js";

export default {
  title: 'continuous-attack',
};

export const player = (): HTMLElement => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const continuousAttack = playerContinuousAttack(resources, toStream(listener));
    delay(1000)
      .chain(continuousAttack.popUp())
      .loop();
    return [
      continuousAttack.getObject3D()
    ];
  });
  stub.start();
  return stub.domElement();
}

export const enemy = (): HTMLElement => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const continuousAttack = enemyContinuousAttack(resources, toStream(listener));
    delay(1000)
      .chain(continuousAttack.popUp())
      .loop();
    return [
      continuousAttack.getObject3D()
    ];
  });
  stub.start();
  return stub.domElement();
}