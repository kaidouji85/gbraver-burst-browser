// @flow

import {TDGameObjectStub} from "./td-game-object-stub";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../src/js/action/game-object-action";
import {PlayerShinBraver} from "../src/js/game-object/armdozer/shin-braver";
import type {Resources} from "../src/js/resource";

export default {
  title: 'armdozer-sprite',
};

export const ShinBraver = () => {
  const stub = new TDGameObjectStub((resources: Resources, listener: Observable<GameObjectAction>) => {
    const sprite = PlayerShinBraver(resources, listener);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}