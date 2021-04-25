// @flow

import {delay} from "../src/js/animation/delay";
import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {enemyBatteryEnchantment, playerBatteryEnchantment} from "../src/js/game-object/battery-enchantment";

export default {
  title: 'battery-enchantment',
};

export const player = (): HTMLElement => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const continuousAttack = playerBatteryEnchantment(resources, listener);
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
    const continuousAttack = enemyBatteryEnchantment(resources, listener);
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