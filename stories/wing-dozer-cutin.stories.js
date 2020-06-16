// @flow

import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {enemyLightningiDozerCutIn, playerLightningDozerCutIn} from "../src/js/game-object/cut-in/lightning-dozer";
import {delay} from "../src/js/animation/delay";
import {LightningDozerCutIn} from "../src/js/game-object/cut-in/lightning-dozer/lightning-dozer-cutin";
import {WingDozerCutin} from "../src/js/game-object/cut-in/wing-dozer/wing-dozer-cutin";

export default {
  title: 'wing-dozer-cutin',
};

export const Player = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const cutIn = new WingDozerCutin(resources);
    return [cutIn.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}