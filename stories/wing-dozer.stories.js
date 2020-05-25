// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {EnemyWingDozer, PlayerWingDozer} from "../src/js/game-object/armdozer/wing-dozer";

export default {
  title: 'wing-dozer',
};

export const stand = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = PlayerWingDozer(resources, listener);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const enemy = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = EnemyWingDozer(resources, listener);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}