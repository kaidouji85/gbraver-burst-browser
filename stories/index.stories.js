// @flow

import {TDGameObjectStub} from "./td-game-object-stub";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../src/js/action/game-object-action";
import {PlayerShinBraver} from "../src/js/game-object/armdozer/shin-braver";
import type {Resources} from "../src/js/resource";
import {PlayerNeoLandozer} from "../src/js/game-object/armdozer/neo-landozer";

export default {
  title: 'armdozer-sprite',
};

export const ShinBraver = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = PlayerShinBraver(resources, listener);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const NeoLandozer = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = PlayerNeoLandozer(resources, listener);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}
