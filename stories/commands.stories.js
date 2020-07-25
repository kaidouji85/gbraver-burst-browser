import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {BatterySelector} from "../src/js/game-object/battery-selector";
import {BurstButton} from "../src/js/game-object/burst-button/burst-button";
import type {Resources} from "../src/js/resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../src/js/action/game-object-action";
import {PilotButton} from "../src/js/game-object/pilot-button";

export default {
  title: 'commands',
};

export const all = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const batterySelector = new BatterySelector({
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
    batterySelector.open(1, 5, 'Attack').play();

    const burstButton = new BurstButton({
      resources: resources,
      listener: listener,
      onPush: () => {
        // NOP
      },
    });
    burstButton.open(true).play();

    const pilotButton = new PilotButton(resources, listener);

    return [
      batterySelector.getObject3D(),
      burstButton.getObject3D(),
      pilotButton.getObject3D(),
    ];
  });
  stub.start();
  return stub.domElement();
}

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