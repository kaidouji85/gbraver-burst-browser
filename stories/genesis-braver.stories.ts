import { delay } from "../src/js/animation/delay";
import { EnemyGenesisBraver, PlayerGenesisBraver } from "../src/js/game-object/armdozer/genesis-braver";
import { GenesisBraver } from "../src/js/game-object/armdozer/genesis-braver/genesis-braver";
import { TDGameObjectStub } from "./stub/td-game-object-stub";
export default {
  title: "genesis-braver"
};
export const playerStand = (): HTMLElement => {
  const stub = new TDGameObjectStub(({
    resources,
    gameObjectAction
  }) => {
    const sprite = PlayerGenesisBraver(resources, gameObjectAction);
    return {
      objects: [sprite.getObject3D()]
    };
  });
  stub.start();
  return stub.domElement();
};
export const enemyStand = (): HTMLElement => {
  const stub = new TDGameObjectStub(({
    resources,
    gameObjectAction
  }) => {
    const sprite = EnemyGenesisBraver(resources, gameObjectAction);
    return {
      objects: [sprite.getObject3D()]
    };
  });
  stub.start();
  return stub.domElement();
};

const straightPunch = (sprite: GenesisBraver) => {
  return delay(1000).chain(sprite.charge()).chain(delay(1000)).chain(sprite.straightPunch()).chain(delay(1000)).chain(sprite.spToStand()).chain(delay(1000));
};

export const playerStraightPunch = (): HTMLElement => {
  const stub = new TDGameObjectStub(({
    resources,
    gameObjectAction
  }) => {
    const sprite = PlayerGenesisBraver(resources, gameObjectAction);
    straightPunch(sprite).loop();
    return {
      objects: [sprite.getObject3D()]
    };
  });
  stub.start();
  return stub.domElement();
};
export const enemyStraightPunch = (): HTMLElement => {
  const stub = new TDGameObjectStub(({
    resources,
    gameObjectAction
  }) => {
    const sprite = EnemyGenesisBraver(resources, gameObjectAction);
    straightPunch(sprite).loop();
    return {
      objects: [sprite.getObject3D()]
    };
  });
  stub.start();
  return stub.domElement();
};