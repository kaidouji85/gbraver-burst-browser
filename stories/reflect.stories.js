// @flow

import {delay} from "../src/js/animation/delay";
import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {enemyReflect, playerReflect} from "../src/js/game-object/pop-up/reflect";

export default {
  title: 'reflect',
};

export const player = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const continuousAttack = playerReflect(resources, listener);
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

export const enemy = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const continuousAttack = enemyReflect(resources, listener);
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