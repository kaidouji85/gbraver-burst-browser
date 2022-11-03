// @flow
import { TimeScaleButton } from "../src/js/game-object/time-scale-button/time-scale-button";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "time-scale-button",
};

export const timeScaleButton = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
    const timeScaleButton = new TimeScaleButton(resources, gameObjectAction);
    timeScaleButton.toggleNotifier().subscribe((timeScale) => {
      console.log("push", timeScale);
    });
    timeScaleButton.open(1).play();
    return [timeScaleButton.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};
