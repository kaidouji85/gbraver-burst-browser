// @flow
import {loseIndicator, winIndicator} from "../src/js/game-object/result-indicator";
import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {delay} from '../src/js/animation/delay';

export default {
  title: 'result-indicator',
};

export const win = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({resources, gameObjectAction}) => {
    const indicator = winIndicator(resources, gameObjectAction);
    delay(1000)
      .chain(indicator.slideIn())
      .chain(delay(1000))
      .chain(indicator.moveToEdge())
      .loop();
    return [indicator.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const lose = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({resources, gameObjectAction}) => {
    const indicator = loseIndicator(resources, gameObjectAction);
    delay(1000)
      .chain(indicator.slideIn())
      .chain(delay(1000))
      .chain(indicator.moveToEdge())
      .loop();
    return [indicator.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}