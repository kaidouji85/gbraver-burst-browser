// @flow

import {delay} from "../src/js/animation/delay";
import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {enemyPowerUp, playerPowerUp} from "../src/js/game-object/power-up";

export default {
  title: 'power-up',
};

export const player = (): HTMLElement => {
  const stub = new TDGameObjectStub(({resources, gameObjectAction}) => {
    const continuousAttack = playerPowerUp(resources, gameObjectAction);
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
  const stub = new TDGameObjectStub(({resources, gameObjectAction}) => {
    const continuousAttack = enemyPowerUp(resources, gameObjectAction);
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