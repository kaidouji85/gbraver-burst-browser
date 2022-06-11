// @flow

import {PlayerNeoLandozer} from "../src/js/game-object/armdozer/neo-landozer";
import {PlayerShinBraver} from "../src/js/game-object/armdozer/shin-braver";
import {TDGameObjectStub} from "./stub/td-game-object-stub";

export default {
  title: 'armdozers',
};

export const shinBraver = (): HTMLElement => {
  const stub = new TDGameObjectStub(({resources, gameObjectAction}) => {
    const sprite = PlayerShinBraver(resources, gameObjectAction);
    return {objects: [sprite.getObject3D()]};
  });
  stub.start();
  return stub.domElement();
}

export const neoLandozer = (): HTMLElement => {
  const stub = new TDGameObjectStub(({resources, gameObjectAction}) => {
    const sprite = PlayerNeoLandozer(resources, gameObjectAction);
    return {objects: [sprite.getObject3D()]};
  });
  stub.start();
  return stub.domElement();
}
