// @flow
import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {BatterySelector} from "../src/js/game-object/battery-selector";

export default {
  title: 'battery-selector',
};

export const batterySelector = (): HTMLElement => {
  const stub = new HUDGameObjectStub((resources, gameObjectAction) => {
    const selector = new BatterySelector({
      resources: resources,
      gameObjectAction: gameObjectAction,
      maxBattery: 5,
      onBatteryChange: () => {
        // NOP
      },
      onOkButtonPush: () => {
        // NOP
      },
    });
    selector.open(1, 5, 'Attack').play();
    return [selector.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}