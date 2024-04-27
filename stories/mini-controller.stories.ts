import { delay } from "../src/js/animation/delay";
import { MiniController } from "../src/js/game-dom/mini-controller";
import { ButtonConfig } from "../src/js/game-dom/mini-controller/button-config";
import { domStub } from "./stub/dom-stub";

export default {
  title: "mini-controller",
};

const miniControllerStory = (config: ButtonConfig) =>
  domStub((params) => {
    const controller = new MiniController(params);
    const decide = () =>
      controller
        .decided()
        .chain(delay(200))
        .chain(controller.hidden())
        .chain(delay(2000))
        .chain(controller.show())
        .play();
    controller.batteryPushNotifier().subscribe((battery) => {
      console.log(`battery ${battery}`);
      decide();
    });
    controller.burstPushNotifier().subscribe(() => {
      console.log("burst");
      decide();
    });
    controller.pilotPushNotifier().subscribe(() => {
      console.log("pilot");
      decide();
    });
    controller.engage(config);
    controller.show().play();
    return controller.getRootHTMLElement();
  });

export const battery5Full = miniControllerStory({
  battery: 5,
  maxBattery: 5,
  canBurst: true,
  canPilotSkill: true,
});

export const battery5 = miniControllerStory({
  battery: 3,
  maxBattery: 5,
  canBurst: true,
  canPilotSkill: true,
});

export const battery4Full = miniControllerStory({
  battery: 4,
  maxBattery: 4,
  canBurst: true,
  canPilotSkill: true,
});

export const battery4 = miniControllerStory({
  battery: 2,
  maxBattery: 4,
  canBurst: true,
  canPilotSkill: true,
});

export const battery8Full = miniControllerStory({
  battery: 8,
  maxBattery: 8,
  canBurst: true,
  canPilotSkill: true,
});

export const battery8 = miniControllerStory({
  battery: 3,
  maxBattery: 8,
  canBurst: true,
  canPilotSkill: true,
});

export const disabledBurst = miniControllerStory({
  battery: 2,
  maxBattery: 5,
  canBurst: false,
  canPilotSkill: true,
});

export const disabledPilot = miniControllerStory({
  battery: 3,
  maxBattery: 5,
  canBurst: true,
  canPilotSkill: false,
});

export const disabledAll = miniControllerStory({
  battery: 0,
  maxBattery: 5,
  canBurst: false,
  canPilotSkill: false,
});

export const showHidden = domStub((params) => {
  const controller = new MiniController(params);
  controller.engage({
    battery: 5,
    maxBattery: 5,
    canBurst: true,
    canPilotSkill: true,
  });
  controller
    .show()
    .chain(delay(2000))
    .chain(controller.decided())
    .chain(delay(200))
    .chain(controller.hidden())
    .chain(delay(2000))
    .loop();
  return controller.getRootHTMLElement();
});
