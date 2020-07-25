// @flow

import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {PilotButton} from "../src/js/game-object/pilot-button";

export default {
  title: 'pilot-button',
};

export const batterySelector = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const button = new PilotButton(resources);
    return [button.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}