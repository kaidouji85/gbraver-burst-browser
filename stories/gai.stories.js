// @flow

import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {delay} from "../src/js/animation/delay";
import {enemyGaiCutIn, playerGaiCutIn} from "../src/js/game-object/cut-in/gai";

export default {
  title: 'gai',
};

export const player = (): HTMLElement => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const pilot = playerGaiCutIn(resources, listener);
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
    const pilot = enemyGaiCutIn(resources, listener);
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