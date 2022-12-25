// @flow

import { delay } from "../src/js/animation/delay";
import {
  EnemyGenesisBraver,
  PlayerGenesisBraver,
} from "../src/js/game-object/armdozer/genesis-braver";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "genesis-braver",
};

export const playerStand = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerGenesisBraver(resources, gameObjectAction);
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};

export const playerStraightPunch = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerGenesisBraver(resources, gameObjectAction);
    delay(1000)
      .chain(sprite.charge())
      .chain(delay(1000))
      .chain(sprite.straightPunch())
      .loop();
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};

export const enemyStand = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = EnemyGenesisBraver(resources, gameObjectAction);
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};
