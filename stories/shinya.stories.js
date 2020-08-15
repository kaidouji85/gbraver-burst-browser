// @flow

import {Shinya} from "../src/js/game-object/pilot/shinya/shinya";
import {HUDGameObjectStub} from "./stub/hud-game-object-stub";

export default {
  title: 'shinya',
};

export const shinya = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const pilot = new Shinya(resources);
    return [pilot.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}
