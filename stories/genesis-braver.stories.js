// @flow

import { GenesisBraver } from "../src/js/game-object/armdozer/genesis-braver/genesis-braver";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "genesis-braver",
};

export const playerStand = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = new GenesisBraver(resources, gameObjectAction);
    return { objects: [sprite.getObject3D()] };
  });
  stub.start();
  return stub.domElement();
};
