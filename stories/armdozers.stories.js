// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {PlayerShinBraver} from "../src/js/game-object/armdozer/shin-braver";
import {PlayerNeoLandozer} from "../src/js/game-object/armdozer/neo-landozer";
import {toStream} from "../src/js";

export default {
  title: 'armdozers',
};

export const shinBraver = (): HTMLElement => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = PlayerShinBraver(resources, toStream(listener));
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const neoLandozer = (): HTMLElement => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = PlayerNeoLandozer(resources, listener);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}
