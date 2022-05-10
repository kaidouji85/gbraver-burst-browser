// @flow
import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {TimeScaleButton} from "../src/js/game-object/time-scale-button/time-scale-button";

export default {
  title: 'time-scale-button',
};

export const timeScaleButton = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({resources}) => {
    const timeScaleButton = new TimeScaleButton(resources);
    return [timeScaleButton.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}