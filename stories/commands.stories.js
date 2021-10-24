// @flow

import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {BatterySelector} from "../src/js/game-object/battery-selector";
import {all} from "../src/js/animation/all";
import {shinBraverBurstButton} from "../src/js/game-object/burst-button";
import {shinyaPilotButton} from "../src/js/game-object/pilot-button";

export default {
  title: 'commands',
};

export const commands = (): HTMLElement => {
  const stub = new HUDGameObjectStub((resources, gameObjectAction) => {
    const batterySelector = new BatterySelector({
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
    const burstButton = shinBraverBurstButton(resources, gameObjectAction);
    const pilotButton = shinyaPilotButton(resources, gameObjectAction);

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
