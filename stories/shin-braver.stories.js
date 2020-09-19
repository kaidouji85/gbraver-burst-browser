// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {delay} from "../src/js/animation/delay";
import {PlayerShinBraver} from "../src/js/game-object/armdozer/shin-braver";

export default {
  title: 'shin-braver',
};

export const turnStart = (): HTMLElement => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = PlayerShinBraver(resources, listener);
    const animation  = sprite.turnStart()
      .chain(delay(2000))
      .chain(sprite.turnStartToStand())
      .chain(delay(2000))
    animation.loop();
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}
