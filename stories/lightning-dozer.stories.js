// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {PlayerLightningDozer} from "../src/js/game-object/armdozer/lightning-dozer";
import {delay} from "../src/js/animation/delay";

export default {
  title: 'lightning-dozer',
};

export const armHammer = (): HTMLElement => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = PlayerLightningDozer(resources, listener);
    const animation  = sprite.charge()
      .chain(delay(1000))
      .chain(sprite.armHammer())
      .chain(delay(2000))
      .chain(sprite.hmToStand())
      .chain(delay(2000));
    animation.loop();
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}
