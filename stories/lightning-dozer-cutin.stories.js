// @flow

import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {enemyLightningiDozerCutIn, playerLightningDozerCutIn} from "../src/js/game-object/cut-in/lightning-dozer";
import {delay} from "../src/js/animation/delay";
import {LightningDozerCutIn} from "../src/js/game-object/cut-in/lightning-dozer/lightning-dozer-cutin";

export default {
  title: 'lightning-dozer-cutin',
};

/**
 * ライトニングドーザ カットイン ループアニメーション
 *
 * @param cutIn カットイン
 */
function loopAnimation(cutIn: LightningDozerCutIn): void {
  const animation = cutIn.show()
    .chain(delay(2000))
    .chain(cutIn.hidden())
    .chain(delay(1000));
  animation.loop();
}

export const Player = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const cutIn = playerLightningDozerCutIn(resources, listener);
    loopAnimation(cutIn);
    return [cutIn.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const Enemy = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const cutIn = enemyLightningiDozerCutIn(resources, listener);
    loopAnimation(cutIn);
    return [cutIn.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}