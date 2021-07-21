// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {enemyBatteryCorrect, playerBatteryCorrect} from "../src/js/game-object/battery-correct";
import {delay} from "../src/js/animation/delay";

export default {
  title: 'battery-correct'
};

export const player = (): HTMLElement=> {
  const stub = new TDGameObjectStub((resources, listener) => {
    const batteryCorrect = playerBatteryCorrect(resources, listener);
    batteryCorrect.popUp(1)
      .chain(delay(1000))
      .loop();
    return [batteryCorrect.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const enemy = (): HTMLElement=> {
  const stub = new TDGameObjectStub((resources, listener) => {
    const batteryCorrect = enemyBatteryCorrect(resources, listener);
    batteryCorrect.popUp(1)
      .chain(delay(1000))
      .loop();
    return [batteryCorrect.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}