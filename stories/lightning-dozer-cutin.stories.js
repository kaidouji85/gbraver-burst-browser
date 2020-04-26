// @flow

import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {LightningDozerCutIn} from "../src/js/game-object/cut-in/lightning-dozer/lightning-dozer-cutin";

export default {
  title: 'lightning-dozer-cutin',
};

export const Player = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const cutIn = new LightningDozerCutIn(resources);
    return [cutIn.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}