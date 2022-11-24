// @flow

import {
  enemyGenesisBraver,
  playerGenesisBraver,
} from "../src/js/game-object/armdozer/genesis-braver";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "genesis-braver",
};

export const playerStand = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = playerGenesisBraver(resources, gameObjectAction);
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};

export const enemyStand = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = enemyGenesisBraver(resources, gameObjectAction);
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};
