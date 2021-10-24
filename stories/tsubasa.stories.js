// @flow

import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {delay} from "../src/js/animation/delay";
import {enemyTsubasaCutIn, playerTsubasaCutIn} from "../src/js/game-object/cut-in/tsubasa";

export default {
  title: 'tsubasa',
};

export const player = (): HTMLElement => {
  const stub = new HUDGameObjectStub((resources, gameObjectAction) => {
    const pilot = playerTsubasaCutIn(resources, gameObjectAction);
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
  const stub = new HUDGameObjectStub((resources, gameObjectAction) => {
    const pilot = enemyTsubasaCutIn(resources, gameObjectAction);
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