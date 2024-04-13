import { delay } from "../src/js/animation/delay";
import {
  enemyBatteryCorrect,
  playerBatteryCorrect,
} from "../src/js/game-object/battery-correct";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "battery-correct",
};

export const player = (): HTMLElement => {
  const stub = new TDGameObjectStub((params) => {
    const batteryCorrect = playerBatteryCorrect(params);
    batteryCorrect
      .popUp(1)
      .chain(delay(1000))
      .chain(batteryCorrect.popUp(-1))
      .chain(delay(1000))
      .loop();
    return {
      objects: [batteryCorrect.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};

export const enemy = (): HTMLElement => {
  const stub = new TDGameObjectStub((params) => {
    const batteryCorrect = enemyBatteryCorrect(params);
    batteryCorrect
      .popUp(1)
      .chain(delay(1000))
      .chain(batteryCorrect.popUp(-1))
      .chain(delay(1000))
      .loop();
    return {
      objects: [batteryCorrect.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};
