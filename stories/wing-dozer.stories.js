// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {enemyWingDozer, playerWingDozer} from "../src/js/game-object/armdozer/wing-dozer";

export default {
  title: 'wing-dozer',
};

export const stand = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = playerWingDozer(resources, listener);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const enemy = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = enemyWingDozer(resources, listener);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}