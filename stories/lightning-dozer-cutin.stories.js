// @flow

import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {enemyLightningiDozerCutIn, playerLightningDozerCutIn} from "../src/js/game-object/cut-in/lightning-dozer";

export default {
  title: 'lightning-dozer-cutin',
};

export const Player = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const cutIn = playerLightningDozerCutIn(resources, listener);
    return [cutIn.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const Enemy = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const cutIn = enemyLightningiDozerCutIn(resources, listener);
    return [cutIn.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}