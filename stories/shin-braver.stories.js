// @flow

import { delay } from "../src/js/animation/delay";
import { PlayerShinBraver } from "../src/js/game-object/armdozer/shin-braver";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "shin-braver",
};

export const activeStand = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerShinBraver(resources, gameObjectAction);
    sprite.startActive().play();
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};

export const straightPunch = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerShinBraver(resources, gameObjectAction);
    delay(1000)
      .chain(sprite.charge())
      .chain(delay(1000))
      .chain(sprite.straightPunch())
      .chain(delay(1000))
      .chain(sprite.punchToStand())
      .loop();
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
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

export const activeKnockBack = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerShinBraver(resources, gameObjectAction);
    sprite.startActive().play();
    const animation = sprite
      .knockBack()
      .chain(delay(2000))
      .chain(sprite.knockBackToStand())
      .chain(delay(2000));
    animation.loop();
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};

export const activeGuard = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerShinBraver(resources, gameObjectAction);
    sprite.startActive().play();
    const animation = sprite
      .guard()
      .chain(delay(2000))
      .chain(sprite.guardToStand())
      .chain(delay(2000));
    animation.loop();
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};

export const activeAvoid = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerShinBraver(resources, gameObjectAction);
    sprite.startActive().play();
    const animation = sprite
      .avoid()
      .chain(delay(2000))
      .chain(sprite.avoidToStand())
      .chain(delay(2000));
    animation.loop();
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};

export const down = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerShinBraver(resources, gameObjectAction);
    delay(1000).chain(sprite.down()).chain(delay(1000)).loop();
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};
