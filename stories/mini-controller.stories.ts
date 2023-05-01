import { MiniController } from "../src/js/game-dom/mini-controller";
import { ButtonConfig } from "../src/js/game-dom/mini-controller/button-config";
import { waitTime } from "../src/js/wait/wait-time";
import { domStub } from "./stub/dom-stub";

export default {
  title: "mini-controller",
};

const miniControllerStory = (config: ButtonConfig) =>
  domStub((resources) => {
    const controller = new MiniController(resources);
    controller.batteryPushNotifier().subscribe((battery) => {
      console.log(`battery ${battery}`);
    });
    controller.burstPushNotifier().subscribe(() => {
      console.log("burst");
    });
    controller.pilotPushNotifier().subscribe(() => {
      console.log("pilot");
    });
    controller.show(config);
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

export const showHidden = domStub((resources) => {
  const controller = new MiniController(resources);
  (async () => {
    await controller.show({
      battery: 5,
      maxBattery: 5,
      canBurst: true,
      canPilotSkill: true,
    });
    await waitTime(2000);
    await controller.decided();
    await waitTime(200);
    await controller.hidden();
  })();
  return controller.getRootHTMLElement();
});
