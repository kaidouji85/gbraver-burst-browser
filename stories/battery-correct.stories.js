// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {enemyBatteryCorrect, playerBatteryCorrect} from "../src/js/game-object/battery-correct";

export default {
  title: 'battery-correct'
};

export const player = (): HTMLElement=> {
  const stub = new TDGameObjectStub((resources, listener) => {
    const batteryCorrect = playerBatteryCorrect(resources, listener);
    return [batteryCorrect.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const enemy = (): HTMLElement=> {
  const stub = new TDGameObjectStub((resources, listener) => {
    const batteryCorrect = enemyBatteryCorrect(resources, listener);
    return [batteryCorrect.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}