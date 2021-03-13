// @flow

import {delay} from "../src/js/animation/delay";
import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {enemyReflectIndicator, playerReflectIndicator} from "../src/js/game-object/reflect-indicator";
import {toStream} from "../src/js";

export default {
  title: 'reflect',
};

export const player = (): HTMLElement => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const continuousAttack = playerReflectIndicator(resources, toStream(listener));
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
    const continuousAttack = enemyReflectIndicator(resources, toStream(listener));
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