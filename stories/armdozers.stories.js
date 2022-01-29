// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {PlayerShinBraver} from "../src/js/game-object/armdozer/shin-braver";
import {PlayerNeoLandozer} from "../src/js/game-object/armdozer/neo-landozer";

export default {
  title: 'armdozers',
};

export const shinBraver = (): HTMLElement => {
  const stub = new TDGameObjectStub(({resources, gameObjectAction}) => {
    const sprite = PlayerShinBraver(resources, gameObjectAction);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const neoLandozer = (): HTMLElement => {
  const stub = new TDGameObjectStub(({resources, gameObjectAction}) => {
    const sprite = PlayerNeoLandozer(resources, gameObjectAction);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}
