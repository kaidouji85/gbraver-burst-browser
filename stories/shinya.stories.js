// @flow

import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {enemyShinya, playerShinya} from "../src/js/game-object/pilot/shinya";

export default {
  title: 'shinya',
};

export const player = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const pilot = playerShinya(resources, listener);
    return [pilot.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const enemy = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const pilot = enemyShinya(resources, listener);
    return [pilot.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}