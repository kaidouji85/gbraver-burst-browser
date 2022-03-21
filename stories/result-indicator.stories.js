// @flow
import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {loseIndicator, winIndicator} from "../src/js/game-object/result-indicator";

export default {
  title: 'result-indicator',
};

export const win = (): HTMLElement => {
  const stub = new TDGameObjectStub(({resources, gameObjectAction}) => {
    const indicator = winIndicator(resources, gameObjectAction);
    return [indicator.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const lose = (): HTMLElement => {
  const stub = new TDGameObjectStub(({resources, gameObjectAction}) => {
    const indicator = loseIndicator(resources, gameObjectAction);
    return [indicator.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}