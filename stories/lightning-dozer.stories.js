// @flow

import { delay } from "../src/js/animation/delay";
import { PlayerLightningDozer } from "../src/js/game-object/armdozer/lightning-dozer";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "lightning-dozer",
};

export const armHammer = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerLightningDozer(resources, gameObjectAction);
    const animation = sprite
      .charge()
      .chain(delay(1000))
      .chain(sprite.armHammer())
      .chain(delay(2000))
      .chain(sprite.hmToStand())
      .chain(delay(2000));
    animation.loop();
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};

export const activeStand = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerLightningDozer(resources, gameObjectAction);
    sprite.startActive().play();
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};
