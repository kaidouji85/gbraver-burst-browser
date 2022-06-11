// @flow

import {delay} from "../src/js/animation/delay";
import {enemyShinyaCutIn, playerShinyaCutIn} from "../src/js/game-object/cut-in/shinya";
import {HUDGameObjectStub} from "./stub/hud-game-object-stub";

export default {
  title: 'shinya',
};

export const player = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({resources, gameObjectAction}) => {
    const pilot = playerShinyaCutIn(resources, gameObjectAction);
    pilot.show()
      .chain(delay(2000))
      .chain(pilot.hidden())
      .chain(delay(2000))
      .loop();
    return [pilot.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const enemy = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({resources, gameObjectAction}) => {
    const pilot = enemyShinyaCutIn(resources, gameObjectAction);
    pilot.show()
      .chain(delay(2000))
      .chain(pilot.hidden())
      .chain(delay(2000))
      .loop();
    return [pilot.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}