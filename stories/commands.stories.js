import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {BatterySelector} from "../src/js/game-object/battery-selector";

export default {
  title: 'commands',
};

export const batterySelector = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const selector = new BatterySelector({
      resources: resources,
      listener: listener,
      maxBattery: 5,
      onBatteryChange: (battery: number) => {
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