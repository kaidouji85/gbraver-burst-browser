import { delay } from "../src/js/animation/delay";
import {
  enemyLightningiDozerCutIn,
  playerLightningDozerCutIn,
} from "../src/js/game-object/cut-in/lightning-dozer";
import { LightningDozerCutIn } from "../src/js/game-object/cut-in/lightning-dozer/lightning-dozer-cutin";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "lightning-dozer-cutin",
};

/**
 * ライトニングドーザ カットイン ループアニメーション
 *
 * @param cutIn カットイン
 */
function loopAnimation(cutIn: LightningDozerCutIn): void {
  const animation = cutIn
    .show()
    .chain(delay(2000))
    .chain(cutIn.hidden())
    .chain(delay(1000));
  animation.loop();
}

export const Player = (): HTMLElement => {
  const stub = new HUDGameObjectStub((params) => {
    const cutIn = playerLightningDozerCutIn(params);
    loopAnimation(cutIn);
    return [cutIn.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};

export const Enemy = (): HTMLElement => {
  const stub = new HUDGameObjectStub((params) => {
    const cutIn = enemyLightningiDozerCutIn(params);
    loopAnimation(cutIn);
    return [cutIn.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};
