// @flow

import {enemyContinuousAttack, playerContinuousAttack} from "../src/js/game-object/pop-up/continuous-attack";
import {delay} from "../src/js/animation/delay";
import {TDGameObjectStub} from "./stub/td-game-object-stub";

export default {
  title: 'continuous-attack',
};

export const player = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const continuousAttack = playerContinuousAttack(resources, listener);
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
    const continuousAttack = enemyContinuousAttack(resources, listener);
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