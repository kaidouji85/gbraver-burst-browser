// @flow

import {delay} from "../src/js/animation/delay";
import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {enemyDamageIndicator, playerDamageIndicator} from "../src/js/game-object/damage-indicator";

export default {
  title: 'damage-indicator',
};

export const player = (): HTMLElement => {
  const stub = new TDGameObjectStub((resources, gameObjectAction) => {
    const continuousAttack = playerDamageIndicator(resources, gameObjectAction);
    delay(1000)
      .chain(continuousAttack.popUp(1000))
      .loop();
    return [
      continuousAttack.getObject3D()
    ];
  });
  stub.start();
  return stub.domElement();
}

export const enemy = (): HTMLElement => {
  const stub = new TDGameObjectStub((resources, gameObjectAction) => {
    const continuousAttack = enemyDamageIndicator(resources, gameObjectAction);
    delay(1000)
      .chain(continuousAttack.popUp(1000))
      .loop();
    return [
      continuousAttack.getObject3D()
    ];
  });
  stub.start();
  return stub.domElement();
}