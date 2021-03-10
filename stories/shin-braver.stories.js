// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {delay} from "../src/js/animation/delay";
import {PlayerShinBraver} from "../src/js/game-object/armdozer/shin-braver";
import {toStream} from "../src/js";

export default {
  title: 'shin-braver',
};

export const guts = (): HTMLElement => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = PlayerShinBraver(resources, toStream(listener));
    const animation  = sprite.guts()
      .chain(delay(2000))
      .chain(sprite.gutsToStand())
      .chain(delay(2000))
    animation.loop();
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}
