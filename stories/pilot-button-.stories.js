// @flow

import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {PilotButton} from "../src/js/game-object/pilot-button";
import {delay} from "../src/js/animation/delay";

export default {
  title: 'pilot-button',
};

export const pilotButton = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const button = new PilotButton(resources, listener);
    button.notifier().pushButton.subscribe(() => {
      console.log('push button!!');
      const animation = button.decide()
        .chain(delay(1000))
        .chain(button.open(false));
      animation.play();
    });
    button.open(true).play();
    return [button.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}