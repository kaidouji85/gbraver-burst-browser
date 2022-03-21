// @flow
import {loseIndicator, winIndicator} from "../src/js/game-object/result-indicator";
import {HUDGameObjectStub} from "./stub/hud-game-object-stub";

export default {
  title: 'result-indicator',
};

export const win = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({resources, gameObjectAction}) => {
    const indicator = winIndicator(resources, gameObjectAction);
    return [indicator.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const lose = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({resources, gameObjectAction}) => {
    const indicator = loseIndicator(resources, gameObjectAction);
    return [indicator.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}