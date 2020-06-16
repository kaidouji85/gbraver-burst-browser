// @flow

import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {enemyWingDozerCutIn, playerWingDozerCutIn} from "../src/js/game-object/cut-in/wing-dozer";

export default {
  title: 'wing-dozer-cutin',
};

export const Player = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const cutIn = playerWingDozerCutIn(resources, listener);
    return [cutIn.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const Enemy = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const cutIn = enemyWingDozerCutIn(resources, listener);
    return [cutIn.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}