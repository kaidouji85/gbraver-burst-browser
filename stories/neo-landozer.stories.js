// @flow

import { delay } from "../src/js/animation/delay";
import { PlayerNeoLandozer } from "../src/js/game-object/armdozer/neo-landozer";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "neo-landozer",
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

export const activeGuard = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerNeoLandozer(resources, gameObjectAction);
    sprite.startActive().play();
    delay(1000)
      .chain(sprite.guard())
      .chain(delay(1000))
      .chain(sprite.guardToStand())
      .loop();
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};

export const activeKnockBack = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerNeoLandozer(resources, gameObjectAction);
    sprite.startActive().play();
    delay(1000)
      .chain(sprite.knockBack())
      .chain(delay(1000))
      .chain(sprite.knockBackToStand())
      .loop();
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};

export const activeGuts = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerNeoLandozer(resources, gameObjectAction);
    sprite.startActive().play();
    delay(1000)
      .chain(sprite.guts())
      .chain(delay(1000))
      .chain(sprite.gutsToStand())
      .loop();
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};

export const armHammer = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerNeoLandozer(resources, gameObjectAction);
    delay(1000)
      .chain(sprite.charge())
      .chain(delay(1000))
      .chain(sprite.armHammer())
      .chain(delay(1000))
      .chain(sprite.hmToStand())
      .loop();
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};
