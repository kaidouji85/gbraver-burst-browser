// @flow

import {delay} from "../src/js/animation/delay";
import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {enemyPowerUp, playerPowerUp} from "../src/js/game-object/pop-up/power-up";

export default {
  title: 'power-up',
};

export const player = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const continuousAttack = playerPowerUp(resources, listener);
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
    const continuousAttack = enemyPowerUp(resources, listener);
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