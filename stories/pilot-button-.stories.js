// @flow

import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {PilotButton} from "../src/js/game-object/pilot-button";

export default {
  title: 'pilot-button',
};

export const pilotButton = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const button = new PilotButton(resources, listener);
    button.notifier().pushButton.subscribe(() => {
      console.log('push button!!');
    });
    button.open(true).play();
    return [button.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}