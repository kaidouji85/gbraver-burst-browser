// @flow

import { delay } from "../src/js/animation/delay";
import { PlayerShinBraver } from "../src/js/game-object/armdozer/shin-braver";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "shin-braver",
};

export const guts = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerShinBraver(resources, gameObjectAction);
    const animation = sprite
      .guts()
      .chain(delay(2000))
      .chain(sprite.gutsToStand())
      .chain(delay(2000));
    animation.loop();
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};

export const activeBurst = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerShinBraver(resources, gameObjectAction);
    sprite.startActive().play();
    const animation = sprite
      .burst()
      .chain(delay(2000))
      .chain(sprite.burstToStand())
      .chain(delay(2000));
    animation.loop();
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};
