// @flow

import { delay } from "../src/js/animation/delay";
import { PlayerNeoLandozer } from "../src/js/game-object/armdozer/neo-landozer";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "neo-landozer",
};

export const stand = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerNeoLandozer(resources, gameObjectAction);
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};

export const activeStand = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerNeoLandozer(resources, gameObjectAction);
    sprite.startActive().play();
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};

export const activeAvoid = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerNeoLandozer(resources, gameObjectAction);
    sprite.startActive().play();
    delay(1000)
      .chain(sprite.avoid())
      .chain(delay(1000))
      .chain(sprite.avoidToStand())
      .loop();
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};
