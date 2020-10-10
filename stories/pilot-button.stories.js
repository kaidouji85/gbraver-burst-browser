// @flow

import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {PilotButton} from "../src/js/game-object/pilot-button";
import {delay} from "../src/js/animation/delay";
import {PilotIds} from "gbraver-burst-core/lib/master/pilots";
import type {PilotId} from "gbraver-burst-core/lib/player/pilot";

export default {
  title: 'pilot-button',
};

function pilotButtonStub(pilotId: PilotId): HUDGameObjectStub {
  return new HUDGameObjectStub((resources, listener) => {
    const button = new PilotButton(resources, pilotId, listener);
    button.notifier().pushButton.subscribe(() => {
      console.log('push button!!');
      const animation = button.decide()
        .chain(delay(1000))
        .chain(button.close())
        .chain(delay(1000))
        .chain(button.open(false));
      animation.play();
    });
    button.open(true).play();
    return [button.getObject3D()];
  });
}

export const shinya = (): HTMLElement => {
  const stub = pilotButtonStub(PilotIds.SHINYA);
  stub.start();
  return stub.domElement();
}

export const gai = (): HTMLElement => {
  const stub = pilotButtonStub(PilotIds.GAI);
  stub.start();
  return stub.domElement();
}
