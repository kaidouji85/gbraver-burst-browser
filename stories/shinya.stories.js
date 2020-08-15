// @flow

import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {playerShinya} from "../src/js/game-object/pilot/shinya";

export default {
  title: 'shinya',
};

export const player = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const pilot = playerShinya(resources);
    return [pilot.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}
