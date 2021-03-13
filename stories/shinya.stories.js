// @flow

import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {enemyShinyaCutIn, playerShinyaCutIn} from "../src/js/game-object/cut-in/shinya";
import {delay} from "../src/js/animation/delay";

export default {
  title: 'shinya',
};

export const player = (): HTMLElement => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const pilot = playerShinyaCutIn(resources, listener);
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
  const stub = new HUDGameObjectStub((resources, listener) => {
    const pilot = enemyShinyaCutIn(resources, listener);
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