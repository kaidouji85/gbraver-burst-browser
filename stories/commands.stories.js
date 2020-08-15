import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {BatterySelector} from "../src/js/game-object/battery-selector";
import {BurstButton} from "../src/js/game-object/burst-button/burst-button";
import {PilotButton} from "../src/js/game-object/pilot-button";
import {all} from "../src/js/animation/all";

export default {
  title: 'commands',
};

export const commands = () => {
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
    const burstButton = new BurstButton({
      resources: resources,
      listener: listener,
      onPush: () => {
        // NOP
      },
    });
    const pilotButton = new PilotButton(resources, listener);

    all(
      batterySelector.open(1, 5, 'Attack'),
      burstButton.open(true),
      pilotButton.open(true)
    ).play();

    return [
      batterySelector.getObject3D(),
      burstButton.getObject3D(),
      pilotButton.getObject3D(),
    ];
  });
  stub.start();
  return stub.domElement();
}

