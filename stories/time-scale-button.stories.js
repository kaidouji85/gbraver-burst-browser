// @flow
import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {TimeScaleButton} from "../src/js/game-object/time-scale-button/time-scale-button";

export default {
  title: 'time-scale-button',
};

export const timeScaleButton = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({resources, gameObjectAction}) => {
    const timeScaleButton = new TimeScaleButton(resources, gameObjectAction);
    timeScaleButton.pushNotifier().subscribe(action => {
      console.log('push', action);
      timeScaleButton.toggle(action.nextTimeScale).play();
    });
    timeScaleButton.open(1).play();
    return [timeScaleButton.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}