// @flow

import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {enemyShinyaCutIn, playerShinyaCutIn} from "../src/js/game-object/cut-in/shinya";

export default {
  title: 'shinya',
};

export const player = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const pilot = playerShinyaCutIn(resources, listener);
    return [pilot.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const enemy = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const pilot = enemyShinyaCutIn(resources, listener);
    return [pilot.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}