// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {playerBatteryCorrect} from "../src/js/game-object/battery-correct";

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