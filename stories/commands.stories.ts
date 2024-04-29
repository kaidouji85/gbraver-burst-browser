import { StoryFn } from "@storybook/html";

import { all } from "../src/js/animation/all";
import { BatterySelector } from "../src/js/game-object/battery-selector";
import { shinBraverBurstButton } from "../src/js/game-object/burst-button";
import { shinyaPilotButton } from "../src/js/game-object/pilot-button";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "commands",
};

/** コントローラーをすべて表示する */
export const commands: StoryFn = hudGameObjectStory((params) => {
  const batterySelector = new BatterySelector(params);
  const burstButton = shinBraverBurstButton(params);
  const pilotButton = shinyaPilotButton(params);
  all(
    batterySelector.open({
      initialValue: 1,
      maxBattery: 5,
      enableMaxBattery: 5,
      label: "Attack",
    }),
    burstButton.open(true),
    pilotButton.open(true),
  ).play();
  return [
    batterySelector.getObject3D(),
    burstButton.getObject3D(),
    pilotButton.getObject3D(),
  ];
});
