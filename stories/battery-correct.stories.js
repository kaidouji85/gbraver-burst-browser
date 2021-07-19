// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {enemyBatteryCorrect, playerBatteryCorrect} from "../src/js/game-object/battery-correct";

export default {
  title: 'battery-correct'
};

export const player = (): HTMLElement=> {
  const stub = new TDGameObjectStub((resources) => {
    const batteryCorrect = playerBatteryCorrect(resources);
    return [batteryCorrect.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const enemy = (): HTMLElement=> {
  const stub = new TDGameObjectStub((resources) => {
    const batteryCorrect = enemyBatteryCorrect(resources);
    return [batteryCorrect.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}