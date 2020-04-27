// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {PlayerShinBraver} from "../src/js/game-object/armdozer/shin-braver";
import {PlayerNeoLandozer} from "../src/js/game-object/armdozer/neo-landozer";
import {PlayerLightningDozer} from "../src/js/game-object/armdozer/lightning-dozer";

export default {
  title: 'armdozers',
};

export const shinBraver = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = PlayerShinBraver(resources, listener);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const neoLandozer = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = PlayerNeoLandozer(resources, listener);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const lightningDozer = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = PlayerLightningDozer(resources, listener);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}
